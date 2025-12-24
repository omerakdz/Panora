import { NextResponse } from "next/server";
import { addBooking, isSlotAvailable } from "@/lib/bookings";
import { Booking } from "@/types";
import { addToGoogleCalendar, isGoogleCalendarConfigured } from "@/lib/google-calendar";

export async function POST(request: Request) {
  console.log("🔵 Book appointment API called");
  
  try {
    const data = await request.json();
    
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
        { status: 400 }
      );
    }

    const bookingDate = new Date(data.selectedDate).toISOString().split('T')[0];
    console.log("📅 Checking slot availability for:", bookingDate, data.selectedTime);

    if (!isSlotAvailable(bookingDate, data.selectedTime)) {
      console.error("❌ Slot not available");
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    console.log("✅ Slot is available, creating booking...");

    const booking: Booking = {
      id: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      date: bookingDate,
      time: data.selectedTime,
      propertyType: data.propertyType || '',
      totalWindows: data.totalWindows || 0,
      exteriorWindows: data.exteriorWindows || 0,
      interiorExteriorWindows: data.interiorExteriorWindows || 0,
      hardToReach: data.hardToReach || false,
      firstTimeInLong: data.firstTimeInLong || false,
      cleanFrames: data.cleanFrames || false,
      calculatedPrice: data.calculatedPrice || 0,
      customerNotes: data.customerNotes || '',
      createdAt: new Date().toISOString(),
    };

    console.log("💾 Saving booking to file...");
    const saved = addBooking(booking);
    
    if (!saved) {
      console.error("❌ Failed to save booking");
      return NextResponse.json(
        { error: "Failed to save booking - slot may be taken" },
        { status: 500 }
      );
    }

    console.log("✅ Booking saved successfully");

    // Try to add to Google Calendar if configured
    let googleCalendarEventId: string | undefined;
    if (isGoogleCalendarConfigured()) {
      try {
        console.log("📅 Adding to Google Calendar...");
        googleCalendarEventId = await addToGoogleCalendar(booking);
        booking.googleCalendarEventId = googleCalendarEventId;
        console.log('✅ Added to Google Calendar:', googleCalendarEventId);
      } catch (error) {
        console.warn('⚠️ Failed to add to Google Calendar:', error);
      }
    }

    // Send emails
    try {
      const baseUrl = request.headers.get('origin') || 'http://localhost:3000';
      const emailUrl = `${baseUrl}/api/send-email`;
      
      console.log('📧 Sending emails via:', emailUrl);
      
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
        console.error('⚠️ Email API returned error:', {
          status: emailResponse.status,
          error: errorText
        });
      } else {
        console.log('✅ Emails sent successfully');
      }
    } catch (error) {
      console.error('⚠️ Failed to send emails (booking still saved):', error);
    }

    console.log("✅ Booking process completed successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed",
        bookingId: booking.id,
        googleCalendarEventId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ CRITICAL ERROR in book-appointment:", error);
    console.error("Error type:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack');
    
    return NextResponse.json(
      { 
        error: "Failed to process booking",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
