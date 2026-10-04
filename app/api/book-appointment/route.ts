import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Booking } from "@/types";
import {
  addToGoogleCalendar,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar";
import {
  rateLimit,
  getClientIp,
  createRateLimitResponse,
} from "@/lib/rate-limit";
import {
  sanitizeBookingData,
  isValidEmail,
  isValidPhone,
} from "@/lib/sanitize";
import { sendBookingEmails } from "@/lib/booking-emails";
import { calculatePrice } from "@/lib/pricing";
import { getDateStr } from "@/lib/constants";

export async function POST(request: Request) {
  // Rate limiting: 5 bookings per hour per IP
  const ip = getClientIp(request);
  const rateLimitResult = rateLimit(ip, {
    id: "api:booking",
    limit: 5,
    window: 60 * 60 * 1000, // 1 hour
  });

  if (!rateLimitResult) {
    console.warn("⚠️ Rate limit exceeded for booking");
    return createRateLimitResponse(Date.now() + 60 * 60 * 1000);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("🔵 Book appointment API called");
  }

  try {
    const rawData = await request.json();

    // Sanitize all user input
    const data = sanitizeBookingData(rawData);

    // No sensitive data logging in production

    // Validation
    if (
      !data.customerName ||
      !data.customerEmail ||
      !data.customerPhone ||
      !data.customerAddress ||
      !data.selectedDate ||
      !data.selectedTime
    ) {
      console.error("❌ Missing required fields:", {
        hasName: !!data.customerName,
        hasEmail: !!data.customerEmail,
        hasPhone: !!data.customerPhone,
        hasAddress: !!data.customerAddress,
        hasDate: !!data.selectedDate,
        hasTime: !!data.selectedTime,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Email validation
    if (!isValidEmail(data.customerEmail)) {
      console.error("❌ Invalid email format");
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Phone validation
    if (!isValidPhone(data.customerPhone)) {
      console.error("❌ Invalid phone format");
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 },
      );
    }

    // SECURITY: Validate window counts
    if (
      typeof data.totalWindows !== "number" ||
      typeof data.exteriorWindows !== "number" ||
      typeof data.interiorExteriorWindows !== "number" ||
      data.totalWindows < 1 ||
      data.totalWindows > 200 ||
      data.exteriorWindows < 0 ||
      data.interiorExteriorWindows < 0
    ) {
      console.error("❌ Invalid window counts:", {
        total: data.totalWindows,
        exterior: data.exteriorWindows,
        interiorExterior: data.interiorExteriorWindows,
      });
      return NextResponse.json(
        { error: "Invalid window count data" },
        { status: 400 },
      );
    }

    // SECURITY: Validate window count logic
    if (
      data.exteriorWindows + data.interiorExteriorWindows !==
      data.totalWindows
    ) {
      console.error("❌ Window count mismatch:", {
        total: data.totalWindows,
        exterior: data.exteriorWindows,
        interiorExterior: data.interiorExteriorWindows,
        sum: data.exteriorWindows + data.interiorExteriorWindows,
      });
      return NextResponse.json(
        { error: "Window count validation failed" },
        { status: 400 },
      );
    }

    // SECURITY: Recalculate price server-side and validate
    const serverCalculatedPrice = calculatePrice({
      propertyType: data.propertyType,
      totalWindows: data.totalWindows,
      exteriorWindows: data.exteriorWindows,
      interiorExteriorWindows: data.interiorExteriorWindows,
      hardToReach: data.hardToReach || false,
      firstTimeInLong: data.firstTimeInLong || false,
      cleanFrames: data.cleanFrames || false,
    });

    // Check for price manipulation (allow 0.01 difference for rounding)
    const priceDifference = Math.abs(
      serverCalculatedPrice - (data.calculatedPrice || 0),
    );
    if (priceDifference > 0.01) {
      console.error("🚨 SECURITY: Price manipulation detected!", {
        clientSentPrice: data.calculatedPrice,
        correctServerPrice: serverCalculatedPrice,
        difference: priceDifference,
        bookingData: {
          propertyType: data.propertyType,
          totalWindows: data.totalWindows,
          exteriorWindows: data.exteriorWindows,
          interiorExteriorWindows: data.interiorExteriorWindows,
          hardToReach: data.hardToReach,
          firstTimeInLong: data.firstTimeInLong,
          cleanFrames: data.cleanFrames,
        },
      });
      return NextResponse.json(
        {
          error: "Price validation failed. Please recalculate and try again.",
          correctPrice: serverCalculatedPrice,
        },
        { status: 400 },
      );
    }

    // Use server-calculated price (not client-sent price)
    const validatedPrice = serverCalculatedPrice;

    // Additional minimum price check
    const minimumPrice = 2.5; // At least 1 exterior window
    if (validatedPrice < minimumPrice) {
      console.error("❌ Price below minimum:", {
        calculatedPrice: validatedPrice,
        minimumPrice,
      });
      return NextResponse.json(
        { error: "Invalid pricing calculation" },
        { status: 400 },
      );
    }

    const bookingDate = getDateStr(new Date(data.selectedDate));

    // Check slot availability in Supabase
    const { data: existingBookings, error: checkError } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("selected_date", bookingDate)
      .eq("selected_time", data.selectedTime);

    if (checkError) {
      console.error("❌ Error checking availability:", checkError);
      return NextResponse.json(
        { error: "Failed to check availability" },
        { status: 500 },
      );
    }

    if (existingBookings && existingBookings.length > 0) {
      console.error("❌ Slot not available (database booking exists)");
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 },
      );
    }

    // IMPORTANT: Also check Google Calendar for conflicts
    if (isGoogleCalendarConfigured()) {
      try {
        const { getGoogleCalendarBookingsForDate } =
          await import("@/lib/google-calendar");
        const blockedSlots =
          await getGoogleCalendarBookingsForDate(bookingDate);

        if (blockedSlots.includes(data.selectedTime)) {
          console.error("❌ Slot not available (Google Calendar conflict)");
          return NextResponse.json(
            { error: "This time slot is no longer available" },
            { status: 409 },
          );
        }
      } catch (error) {
        console.warn(
          "⚠️ Could not verify Google Calendar availability:",
          error,
        );
        // Continue anyway - better to allow booking than to block unnecessarily
      }
    }

    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const bookingRecord = {
      id: bookingId,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      customer_address: data.customerAddress,
      customer_city: data.customerCity || "",
      customer_postal_code: data.customerPostalCode || "",
      customer_notes: data.customerNotes || "",
      selected_date: bookingDate,
      selected_time: data.selectedTime,
      property_type: data.propertyType || "",
      total_windows: data.totalWindows || 0,
      exterior_windows: data.exteriorWindows || 0,
      interior_exterior_windows: data.interiorExteriorWindows || 0,
      hard_to_reach: data.hardToReach || false,
      first_time_in_long: data.firstTimeInLong || false,
      clean_frames: data.cleanFrames || false,
      calculated_price: validatedPrice, // Use server-validated price
      status: "pending",
    };

    const { data: savedBooking, error: insertError } = await supabaseAdmin
      .from("bookings")
      .insert([bookingRecord])
      .select()
      .single();

    if (insertError) {
      console.error("❌ Failed to save booking:", insertError);
      return NextResponse.json(
        { error: "Failed to save booking - slot may be taken" },
        { status: 500 },
      );
    }

    // Convert to Booking type for Google Calendar
    const booking: Booking = {
      id: bookingId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      customerCity: data.customerCity || "",
      customerPostalCode: data.customerPostalCode || "",
      date: bookingDate,
      time: data.selectedTime,
      propertyType: data.propertyType || "",
      totalWindows: data.totalWindows || 0,
      exteriorWindows: data.exteriorWindows || 0,
      interiorExteriorWindows: data.interiorExteriorWindows || 0,
      hardToReach: data.hardToReach || false,
      firstTimeInLong: data.firstTimeInLong || false,
      cleanFrames: data.cleanFrames || false,
      calculatedPrice: validatedPrice, // Use server-validated price
      customerNotes: data.customerNotes || "",
      createdAt: new Date().toISOString(),
    };

    // Try to add to Google Calendar if configured
    if (isGoogleCalendarConfigured()) {
      try {
        await addToGoogleCalendar(booking);
      } catch (error) {
        console.warn("⚠️ Failed to add to Google Calendar:", error);
      }
    }

    try {
      await sendBookingEmails({
        ...data,
        selectedDate: new Date(bookingDate),
      });
    } catch (error) {
      console.error("⚠️ Failed to send emails (booking still saved):", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed",
        bookingId: bookingId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ CRITICAL ERROR in book-appointment:", error);

    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 },
    );
  }
}
