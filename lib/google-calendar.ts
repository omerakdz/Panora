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
Adres: ${booking.customerAddress}

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

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      requestBody: event,
      sendUpdates: "none", // Don't send email notifications from Google
    });

    console.log("✅ Event added to Google Calendar:", response.data.htmlLink);
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
    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    // Parse datum correct om timezone problemen te voorkomen
    const [year, month, day] = date.split("-").map(Number);
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

    console.log(`📅 Fetching calendar events for ${date}...`);
    console.log(
      `   Range: ${startOfDay.toLocaleString("nl-BE")} - ${endOfDay.toLocaleString("nl-BE")}`,
    );

    // Check meerdere calendars indien geconfigureerd
    // GOOGLE_CALENDAR_IDS = comma-separated list van calendar IDs
    // Bijvoorbeeld: "primary,panora_calendar_id,work_calendar_id"
    const calendarIds = process.env.GOOGLE_CALENDAR_IDS
      ? process.env.GOOGLE_CALENDAR_IDS.split(",").map((id) => id.trim())
      : [process.env.GOOGLE_CALENDAR_ID || "primary"];

    console.log(`   Checking ${calendarIds.length} calendar(s):`, calendarIds);

    const allEvents: any[] = [];

    // Haal events op van ALLE geconfigureerde calendars
    for (const calendarId of calendarIds) {
      try {
        console.log(`   📆 Fetching from calendar: ${calendarId}`);
        const response = await calendar.events.list({
          calendarId: calendarId,
          timeMin: startOfDay.toISOString(),
          timeMax: endOfDay.toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        });

        const events = response.data.items || [];
        console.log(`      Found ${events.length} event(s)`);
        allEvents.push(...events);
      } catch (error) {
        console.error(`      ⚠️ Error fetching from ${calendarId}:`, error);
        // Continue met de volgende calendar
      }
    }

    console.log(
      `📊 Found ${allEvents.length} total events across all calendars`,
    );

    const bookedSlots: string[] = [];

    allEvents.forEach((event) => {
      if (!event.start?.dateTime || !event.end?.dateTime) {
        console.log(`  ⚠️ Event "${event.summary}" has no dateTime, skipping`);
        return;
      }

      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);

      console.log(`  📍 Checking event: "${event.summary}"`);
      console.log(
        `     Time: ${eventStart.toLocaleString("nl-BE")} - ${eventEnd.toLocaleString("nl-BE")}`,
      );

      const startTime = `${eventStart.getHours().toString().padStart(2, "0")}:${eventStart.getMinutes().toString().padStart(2, "0")}`;
      const endTime = `${eventEnd.getHours().toString().padStart(2, "0")}:${eventEnd.getMinutes().toString().padStart(2, "0")}`;
      const eventTimeSlot = `${startTime} - ${endTime}`;

      // Check of het event EXACT matcht met een van onze TIME_SLOTS (= klantafspraak)
      const exactMatch = TIME_SLOTS.find((slot) => slot === eventTimeSlot);

      if (exactMatch) {
        console.log(
          `  ✓ Event is een klantafspraak (exact match: ${eventTimeSlot})`,
        );
        if (!bookedSlots.includes(exactMatch)) {
          bookedSlots.push(exactMatch);
        }
      } else {
        // Als het NIET exact matcht, check of het overlapt met TIME_SLOTS (= werkuren/busy time)
        console.log(
          `  👤 Event is geen klantafspraak, check overlaps met alle slots...`,
        );

        TIME_SLOTS.forEach((slot) => {
          const { start, end } = parseTimeSlot(slot);
          const [startHours, startMinutes] = start.split(":").map(Number);
          const [endHours, endMinutes] = end.split(":").map(Number);

          // Parse datum correct om timezone problemen te voorkomen
          const [year, month, day] = date.split("-").map(Number);
          const slotStart = new Date(
            year,
            month - 1,
            day,
            startHours,
            startMinutes,
            0,
            0,
          );
          const slotEnd = new Date(
            year,
            month - 1,
            day,
            endHours,
            endMinutes,
            0,
            0,
          );

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
              let reason = "overlapt/raakt";
              if (!hasOverlapOrTouch && needsTravelTimeAfter)
                reason = "reistijd na event nodig";
              if (!hasOverlapOrTouch && needsTravelTimeBefore)
                reason = "reistijd voor event nodig";

              console.log(
                `    🔒 Blocking slot ${slot} (${reason}: "${event.summary}")`,
              );
              console.log(
                `       Event: ${eventStart.toLocaleString("nl-BE")} - ${eventEnd.toLocaleString("nl-BE")}`,
              );
              console.log(
                `       Slot:  ${slotStart.toLocaleString("nl-BE")} - ${slotEnd.toLocaleString("nl-BE")}`,
              );
              bookedSlots.push(slot);
            }
          }
        });
      }
    });

    console.log(`\n✅ Google Calendar check complete for ${date}`);
    console.log(`   Total blocked slots: ${bookedSlots.length}`);
    if (bookedSlots.length > 0) {
      console.log(`   Blocked: ${bookedSlots.join(", ")}`);
    }

    return bookedSlots;
  } catch (error) {
    console.error("❌ Error fetching Google Calendar bookings:", error);
    return [];
  }
}

export async function deleteFromGoogleCalendar(
  eventId: string,
): Promise<boolean> {
  try {
    const auth = getGoogleCalendarAuth();
    const calendar = google.calendar({ version: "v3", auth });

    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      eventId: eventId,
      sendUpdates: "none",
    });

    console.log("✅ Event deleted from Google Calendar");
    return true;
  } catch (error) {
    console.error("❌ Error deleting event from Google Calendar:", error);
    return false;
  }
}

export function isGoogleCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}
