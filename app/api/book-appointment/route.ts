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

export async function POST(request: Request) {
  // Rate limiting: 5 bookings per hour per IP
  const ip = getClientIp(request);
  const rateLimitResult = rateLimit(ip, {
    id: "api:booking",
    limit: 5,
    window: 60 * 60 * 1000, // 1 hour
  });

  if (!rateLimitResult) {
    console.warn("⚠️ Rate limit exceeded for booking from IP:", ip);
    return createRateLimitResponse(Date.now() + 60 * 60 * 1000);
  }

  console.log("🔵 Book appointment API called");

  try {
    const rawData = await request.json();

    // Sanitize all user input
    const data = sanitizeBookingData(rawData);

    console.log("📝 Booking data received:", {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      date: data.selectedDate,
      time: data.selectedTime,
    });

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
      console.error("❌ Invalid email format:", data.customerEmail);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Phone validation
    if (!isValidPhone(data.customerPhone)) {
      console.error("❌ Invalid phone format:", data.customerPhone);
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 },
      );
    }

    const bookingDate = new Date(data.selectedDate).toISOString().split("T")[0];
    console.log(
      "📅 Checking slot availability for:",
      bookingDate,
      data.selectedTime,
    );

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
      console.error("❌ Slot not available");
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 },
      );
    }

    console.log("✅ Slot is available, creating booking...");

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
      calculated_price: data.calculatedPrice || 0,
      status: "pending",
    };

    console.log("💾 Saving booking to Supabase...");

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

    console.log("✅ Booking saved successfully");

    // Convert to Booking type for Google Calendar
    const booking: Booking = {
      id: bookingId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      date: bookingDate,
      time: data.selectedTime,
      propertyType: data.propertyType || "",
      totalWindows: data.totalWindows || 0,
      exteriorWindows: data.exteriorWindows || 0,
      interiorExteriorWindows: data.interiorExteriorWindows || 0,
      hardToReach: data.hardToReach || false,
      firstTimeInLong: data.firstTimeInLong || false,
      cleanFrames: data.cleanFrames || false,
      calculatedPrice: data.calculatedPrice || 0,
      customerNotes: data.customerNotes || "",
      createdAt: new Date().toISOString(),
    };

    // Try to add to Google Calendar if configured
    let googleCalendarEventId: string | undefined;
    if (isGoogleCalendarConfigured()) {
      try {
        console.log("📅 Adding to Google Calendar...");
        googleCalendarEventId = await addToGoogleCalendar(booking);
        console.log("✅ Added to Google Calendar:", googleCalendarEventId);
      } catch (error) {
        console.warn("⚠️ Failed to add to Google Calendar:", error);
      }
    }

    // Send emails
    try {
      const baseUrl = request.headers.get("origin") || "http://localhost:3000";
      const emailUrl = `${baseUrl}/api/send-email`;

      console.log("📧 Sending emails via:", emailUrl);

      const emailResponse = await fetch(emailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          selectedDate: bookingDate,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("⚠️ Email API returned error:", {
          status: emailResponse.status,
          error: errorText,
        });
      } else {
        console.log("✅ Emails sent successfully");
      }
    } catch (error) {
      console.error("⚠️ Failed to send emails (booking still saved):", error);
    }

    console.log("✅ Booking process completed successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed",
        bookingId: bookingId,
        googleCalendarEventId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ CRITICAL ERROR in book-appointment:", error);
    console.error("Error type:", error?.constructor?.name);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : error,
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );

    return NextResponse.json(
      {
        error: "Failed to process booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
