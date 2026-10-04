import { NextResponse } from "next/server";
import { getAvailableTimeSlots, isDateAvailable } from "@/lib/calendar";
import { getBookedSlotsForDate } from "@/lib/bookings";
import { getDateStr } from "@/lib/constants";
import {
  getGoogleCalendarBookingsForDate,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 },
      );
    }

    const date = new Date(dateParam);

    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }

    if (!isDateAvailable(date)) {
      return NextResponse.json(
        {
          date: dateParam,
          available: false,
          slots: [],
          bookedSlots: [],
          totalSlots: 6,
        },
        { status: 200 },
      );
    }

    // 1. Haal bookings uit Supabase (website bookings)
    const bookedSlotsFromDB = await getBookedSlotsForDate(dateParam);

    // 2. Haal ALLE events uit Google Calendar
    let bookedSlotsFromCalendar: string[] = [];

    if (isGoogleCalendarConfigured()) {
      try {
        bookedSlotsFromCalendar =
          await getGoogleCalendarBookingsForDate(dateParam);
      } catch {
        console.error("❌ Google Calendar synchronization failed");
      }
    }

    // 3. Combineer beide bronnen (verwijder duplicaten)
    const allBookedSlots = Array.from(
      new Set([...bookedSlotsFromDB, ...bookedSlotsFromCalendar]),
    );

    // 4. Bereken beschikbare slots
    const availableSlots = getAvailableTimeSlots(date, allBookedSlots);

    return NextResponse.json(
      {
        date: dateParam,
        available: availableSlots.length > 0,
        slots: availableSlots,
        bookedSlots: allBookedSlots,
        totalSlots: 6,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("❌ Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 },
    );
  }
}

// Get availability for multiple dates (for calendar view)
export async function POST(request: Request) {
  try {
    const { startDate, endDate } = await request.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 },
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }

    const availability: Record<
      string,
      { available: boolean; slotsCount: number }
    > = {};

    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dateStr = getDateStr(currentDate);
      const dateAvailable = isDateAvailable(currentDate);

      if (dateAvailable) {
        // Haal bookings uit Supabase
        const bookedSlotsFromDB = await getBookedSlotsForDate(dateStr);

        // Haal ALLE events uit Google Calendar
        let bookedSlotsFromCalendar: string[] = [];
        if (isGoogleCalendarConfigured()) {
          try {
            bookedSlotsFromCalendar =
              await getGoogleCalendarBookingsForDate(dateStr);
          } catch {
            console.warn(
              `⚠️ Could not fetch Google Calendar events for ${dateStr}`,
            );
          }
        }

        // Combineer beide bronnen (verwijder duplicaten)
        const allBookedSlots = Array.from(
          new Set([...bookedSlotsFromDB, ...bookedSlotsFromCalendar]),
        );

        const availableSlots = getAvailableTimeSlots(
          currentDate,
          allBookedSlots,
        );

        availability[dateStr] = {
          available: availableSlots.length > 0,
          slotsCount: availableSlots.length,
        };
      } else {
        availability[dateStr] = {
          available: false,
          slotsCount: 0,
        };
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json(
      {
        startDate,
        endDate,
        availability,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error getting availability range:", error);
    return NextResponse.json(
      { error: "Failed to get availability" },
      { status: 500 },
    );
  }
}
