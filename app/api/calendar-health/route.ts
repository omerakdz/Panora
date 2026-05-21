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
export async function GET(request: Request) {
  const healthCheck = {
    configured: false,
    credentials: {
      clientId: false,
      clientSecret: false,
      refreshToken: false,
    },
    calendars: [] as Array<{
      id: string;
      accessible: boolean;
      error?: string;
      name?: string;
      eventCount?: number;
    }>,
    overallStatus: "error" as "ok" | "error" | "partial",
    message: "",
    timestamp: new Date().toISOString(),
  };

  try {
    // 1. Check credentials
    healthCheck.credentials.clientId = !!process.env.GOOGLE_CLIENT_ID;
    healthCheck.credentials.clientSecret = !!process.env.GOOGLE_CLIENT_SECRET;
    healthCheck.credentials.refreshToken = !!process.env.GOOGLE_REFRESH_TOKEN;
    healthCheck.configured = isGoogleCalendarConfigured();

    if (!healthCheck.configured) {
      healthCheck.message =
        "Google Calendar is niet geconfigureerd. Voeg GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET en GOOGLE_REFRESH_TOKEN toe aan .env";
      return NextResponse.json(healthCheck, { status: 503 });
    }

    // 2. Test API connection
    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    // 3. Check configured calendars
    const calendarIds = process.env.GOOGLE_CALENDAR_IDS
      ? process.env.GOOGLE_CALENDAR_IDS.split(",").map((id) => id.trim())
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (const calendarId of calendarIds) {
      try {
        // Test toegang tot calendar
        const calendarInfo = await calendar.calendars.get({
          calendarId: calendarId,
        });

        // Test events ophalen (laatste 7 dagen)
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const events = await calendar.events.list({
          calendarId: calendarId,
          timeMin: sevenDaysAgo.toISOString(),
          timeMax: tomorrow.toISOString(),
          maxResults: 100,
          singleEvents: true,
        });

        healthCheck.calendars.push({
          id: calendarId,
          accessible: true,
          name: calendarInfo.data.summary || calendarId,
          eventCount: events.data.items?.length || 0,
        });
      } catch (error) {
        healthCheck.calendars.push({
          id: calendarId,
          accessible: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // 4. Determine overall status
    const allAccessible = healthCheck.calendars.every((cal) => cal.accessible);
    const someAccessible = healthCheck.calendars.some((cal) => cal.accessible);

    if (allAccessible) {
      healthCheck.overallStatus = "ok";
      healthCheck.message = `Google Calendar is correct geconfigureerd en ${healthCheck.calendars.length} calendar(s) zijn toegankelijk.`;
    } else if (someAccessible) {
      healthCheck.overallStatus = "partial";
      healthCheck.message = `Google Calendar is geconfigureerd, maar sommige calendars zijn niet toegankelijk.`;
    } else {
      healthCheck.overallStatus = "error";
      healthCheck.message = `Google Calendar is geconfigureerd, maar geen enkele calendar is toegankelijk. Check de GOOGLE_CALENDAR_IDS en API permissions.`;
    }

    const statusCode = healthCheck.overallStatus === "ok" ? 200 : 503;
    return NextResponse.json(healthCheck, { status: statusCode });
  } catch (error) {
    healthCheck.overallStatus = "error";
    healthCheck.message = `Fout bij het testen van Google Calendar: ${error instanceof Error ? error.message : String(error)}`;

    return NextResponse.json(healthCheck, { status: 500 });
  }
}
