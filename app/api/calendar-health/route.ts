import { NextResponse } from "next/server";
import {
  isGoogleCalendarConfigured,
  getGoogleCalendarAuth,
} from "@/lib/google-calendar";
import { google } from "googleapis";

/**
 * Health check endpoint voor Google Calendar configuratie
 *
 * Deze endpoint test of:
 * 1. De Google Calendar credentials correct zijn geconfigureerd
 * 2. De API connectie werkt
 * 3. De geconfigureerde calendars toegankelijk zijn
 *
 * Gebruik: GET /api/calendar-health
 */
export async function GET() {
  try {
    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        { status: "unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const calendarIds = process.env.GOOGLE_CALENDAR_IDS
      ? process.env.GOOGLE_CALENDAR_IDS.split(",").map((id) => id.trim())
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];
    let allAccessible = true;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (const calendarId of calendarIds) {
      try {
        await calendar.calendars.get({ calendarId });

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        await calendar.events.list({
          calendarId,
          timeMin: sevenDaysAgo.toISOString(),
          timeMax: tomorrow.toISOString(),
          maxResults: 100,
          singleEvents: true,
        });
      } catch {
        allAccessible = false;
      }
    }

    const status = allAccessible ? "ok" : "unavailable";
    return NextResponse.json(
      { status },
      {
        status: allAccessible ? 200 : 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return NextResponse.json(
      { status: "unavailable" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
