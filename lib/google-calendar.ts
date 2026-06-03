import { google } from "googleapis";
import { parseTimeSlot, toISODateTime } from "./calendar";
import type { Booking } from "@/types";
import { CALENDAR_CONFIG, TIME_SLOTS } from "./constants";

export function getGoogleCalendarAuth() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google Calendar credentials not configured");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return oauth2Client;
}

// Add booking to Google Calendar
export async function addToGoogleCalendar(booking: Booking): Promise<string> {
  try {
    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const { start, end } = parseTimeSlot(booking.time);

    // Parse the date parts
    const dateParts = booking.date.split("-"); // YYYY-MM-DD
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; //zero based
    const day = parseInt(dateParts[2]);

    // Parse time parts
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    const startDate = new Date(year, month, day, startHours, startMinutes, 0);
    const endDate = new Date(year, month, day, endHours, endMinutes, 0);

    const formatLocalISO = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const startDateTime = formatLocalISO(startDate);
    const endDateTime = formatLocalISO(endDate);

    const event = {
      summary: `🪟 PANORA - ${booking.customerName}`,
      description: `
KLANT INFORMATIE:
━━━━━━━━━━━━━━━
Naam: ${booking.customerName}
Email: ${booking.customerEmail}
Telefoon: ${booking.customerPhone}
Adres: ${booking.customerAddress}${booking.customerPostalCode ? `, ${booking.customerPostalCode}` : ""}${booking.customerCity ? ` ${booking.customerCity}` : ""}

SERVICE DETAILS:
━━━━━━━━━━━━━━━
Type woning: ${booking.propertyType}
Totaal aantal ramen: ${booking.totalWindows}
- Alleen buiten: ${booking.exteriorWindows}
- Binnen & buiten: ${booking.interiorExteriorWindows}

Extra's:
${booking.hardToReach ? "✓ Moeilijk bereikbaar (+15%)" : ""}
${booking.firstTimeInLong ? "✓ Eerste keer in lange tijd (+€20)" : ""}
${booking.cleanFrames ? "✓ Kozijnen reinigen (+€25)" : ""}

${booking.customerNotes ? `Opmerkingen:\n${booking.customerNotes}\n` : ""}
RICHTPRIJS: €${booking.calculatedPrice} (incl. BTW)
━━━━━━━━━━━━━━━
Boeking ID: ${booking.id}
Bron: Website
      `.trim(),
      location: booking.customerAddress,
      start: {
        dateTime: startDateTime,
        timeZone: CALENDAR_CONFIG.timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: CALENDAR_CONFIG.timeZone,
      },
      colorId: "7",
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 60 }, // 1 hour before
        ],
      },
      // Add custom properties
      extendedProperties: {
        private: {
          bookingId: booking.id,
          customerEmail: booking.customerEmail,
          customerPhone: booking.customerPhone,
          price: booking.calculatedPrice.toString(),
          source: "website",
        },
      },
    };

    // Gebruik de laatste calendar ID uit GOOGLE_CALENDAR_IDS als bestemming voor nieuwe events
    // (meestal de Panora agenda)
    const calendarIds = process.env.GOOGLE_CALENDAR_IDS
      ? process.env.GOOGLE_CALENDAR_IDS.split(",").map((id) => id.trim())
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];
    const targetCalendarId = calendarIds[calendarIds.length - 1]; // Laatste ID = Panora agenda

    const response = await calendar.events.insert({
      calendarId: targetCalendarId,
      requestBody: event,
      sendUpdates: "none", // Don't send email notifications from Google
    });

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Added to Google Calendar:", response.data.id);
    }
    return response.data.id || "";
  } catch (error) {
    console.error("❌ Error adding event to Google Calendar:", error);
    throw error;
  }
}

// Haal alle events op voor een datum en match met TIME_SLOTS
export async function getGoogleCalendarBookingsForDate(
  date: string,
): Promise<string[]> {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log(`🔍 Checking Google Calendar for date: ${date}`);
    }
    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    // Parse datum correct in Europe/Brussels timezone om timezone problemen te voorkomen
    // Dit zorgt ervoor dat we altijd de juiste dag ophalen, ongeacht de server timezone
    const [year, month, day] = date.split("-").map(Number);

    // Maak ISO timestamp strings voor Europe/Brussels timezone
    // Format: YYYY-MM-DDTHH:MM:SS+02:00 (CEST) of +01:00 (CET)
    const startOfDayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00`;
    const endOfDayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T23:59:59`;

    // Parse met Brussels timezone offset
    const startOfDay = new Date(`${startOfDayStr}+02:00`); // CEST (zomer) - API handelt winter/zomer automatisch
    const endOfDay = new Date(`${endOfDayStr}+02:00`);

    // Check meerdere calendars indien geconfigureerd
    const calendarIds = process.env.GOOGLE_CALENDAR_IDS
      ? process.env.GOOGLE_CALENDAR_IDS.split(",").map((id) => id.trim())
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];

    const allEvents: any[] = [];

    // Haal events op van ALLE geconfigureerde calendars
    for (const calendarId of calendarIds) {
      try {
        const response = await calendar.events.list({
          calendarId: calendarId,
          timeMin: startOfDay.toISOString(),
          timeMax: endOfDay.toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        });

        const events = response.data.items || [];
        allEvents.push(...events);
      } catch (error) {
        console.error(
          "❌ Error fetching calendar events:",
          error instanceof Error ? error.message : error,
        );
        throw error; // Re-throw to make the error visible
      }
    }

    const bookedSlots: string[] = [];

    allEvents.forEach((event) => {
      if (!event.start?.dateTime || !event.end?.dateTime) {
        return;
      }

      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);

      const startTime = `${eventStart.getHours().toString().padStart(2, "0")}:${eventStart.getMinutes().toString().padStart(2, "0")}`;
      const endTime = `${eventEnd.getHours().toString().padStart(2, "0")}:${eventEnd.getMinutes().toString().padStart(2, "0")}`;
      const eventTimeSlot = `${startTime} - ${endTime}`;

      // Check of het event EXACT matcht met een van onze TIME_SLOTS (= klantafspraak)
      const exactMatch = TIME_SLOTS.find((slot) => slot === eventTimeSlot);

      if (exactMatch) {
        if (!bookedSlots.includes(exactMatch)) {
          bookedSlots.push(exactMatch);
        }
      } else {
        // Als het NIET exact matcht, check of het overlapt met TIME_SLOTS (= werkuren/busy time)
        let blockedCount = 0;
        TIME_SLOTS.forEach((slot) => {
          const { start, end } = parseTimeSlot(slot);
          const [startHours, startMinutes] = start.split(":").map(Number);
          const [endHours, endMinutes] = end.split(":").map(Number);

          // Parse datum correct in Europe/Brussels timezone
          const [year, month, day] = date.split("-").map(Number);
          const slotStartStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(startHours).padStart(2, "0")}:${String(startMinutes).padStart(2, "0")}:00+02:00`;
          const slotEndStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}:00+02:00`;

          const slotStart = new Date(slotStartStr);
          const slotEnd = new Date(slotEndStr);

          // Check of het event overlapt met deze timeslot OF reistijd nodig is
          // Blokkeer de slot als:
          // 1. Event overlapt met slot (zelfs als ze elkaar alleen raken)
          // 2. Event eindigt binnen 30 min voor slot begint (reistijd nodig NA event)
          // 3. Event begint binnen 30 min na slot eindigt (reistijd nodig VOOR event)

          // Bereken reistijd buffers (30 minuten)
          const slotStartMinus30 = new Date(
            slotStart.getTime() - 30 * 60 * 1000,
          );
          const slotEndPlus30 = new Date(slotEnd.getTime() + 30 * 60 * 1000);

          // Overlap of raken: event eindigt op of na slot start EN event begint op of voor slot eind
          const hasOverlapOrTouch =
            eventStart <= slotEnd && eventEnd >= slotStart;

          // Reistijd nodig na event: event eindigt binnen 30 min voor slot
          const needsTravelTimeAfter =
            eventEnd > slotStartMinus30 && eventEnd < slotStart;

          // Reistijd nodig voor event: event begint binnen 30 min na slot
          const needsTravelTimeBefore =
            eventStart > slotEnd && eventStart < slotEndPlus30;

          if (
            hasOverlapOrTouch ||
            needsTravelTimeAfter ||
            needsTravelTimeBefore
          ) {
            if (!bookedSlots.includes(slot)) {
              bookedSlots.push(slot);
              blockedCount++;
            }
          }
        });
      }
    });

    return bookedSlots;
  } catch (error) {
    console.error("❌ Error fetching Google Calendar bookings:", error);
    console.error(
      "   This means work shifts and manual bookings will NOT block availability!",
    );
    throw error; // Re-throw to make the error visible in the API
  }
}

export async function deleteFromGoogleCalendar(
  eventId: string,
): Promise<boolean> {
  try {
    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    // Gebruik de laatste calendar ID uit GOOGLE_CALENDAR_IDS als bestemming
    const calendarIds = process.env.GOOGLE_CALENDAR_IDS
      ? process.env.GOOGLE_CALENDAR_IDS.split(",").map((id) => id.trim())
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];
    const targetCalendarId = calendarIds[calendarIds.length - 1];

    await calendar.events.delete({
      calendarId: targetCalendarId,
      eventId: eventId,
      sendUpdates: "none",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Event deleted from Google Calendar");
    }
    return true;
  } catch (error) {
    console.error("❌ Error deleting event from Google Calendar:", error);
    return false;
  }
}

export function isGoogleCalendarConfigured(): boolean {
  const configured = !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );

  if (!configured) {
    console.warn("⚠️ Google Calendar is NOT properly configured!");
    console.warn("   Missing environment variables:");
    if (!process.env.GOOGLE_CLIENT_ID) console.warn("   - GOOGLE_CLIENT_ID");
    if (!process.env.GOOGLE_CLIENT_SECRET)
      console.warn("   - GOOGLE_CLIENT_SECRET");
    if (!process.env.GOOGLE_REFRESH_TOKEN)
      console.warn("   - GOOGLE_REFRESH_TOKEN");
    console.warn(
      "\n   Work shifts and manual bookings will NOT block availability!",
    );
    console.warn(
      "   Please configure Google Calendar credentials to enable full synchronization.\n",
    );
  }

  return configured;
}
