import type { CalculatorData, EmailData } from "@/types";
import { CONTACT, getPropertyTypeLabel } from "@/lib/constants";

export function generateCustomerEmailHTML(data: EmailData): string {
  const date = new Date(data.selectedDate);
  const formattedDate = date.toLocaleDateString("nl-BE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const serviceType =
    data.interiorExteriorWindows > 0 && data.exteriorWindows > 0
      ? "Complete Glasreiniging (gemengd)"
      : data.interiorExteriorWindows > 0
        ? "Complete Glasreiniging"
        : "Buiten Glasreiniging";

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging Afspraak - PANORA</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #044D8E 0%, #1792D0 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">PANORA</h1>
              <p style="margin: 10px 0 0; color: #9FCAE3; font-size: 16px;">Professionele Ramenwasdienst</p>
            </td>
          </tr>
          
          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 30px 20px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: #d4edda; border-radius: 50%; margin: 0 auto 20px; display: inline-flex; align-items: center; justify-content: center;">
                <span style="color: #28a745; font-size: 50px; line-height: 1; display: block; text-align: center;">✓</span>
              </div>
              <h2 style="margin: 0 0 10px; color: #044D8E; font-size: 28px;">Bevestigd!</h2>
              <p style="margin: 0; color: #0F61AC; font-size: 16px;">Beste ${data.customerName},</p>
              <p style="margin: 10px 0 0; color: #0F61AC; font-size: 16px;">Je afspraak staat ingepland. We kijken ernaar uit om jouw ramen te laten stralen!</p>
            </td>
          </tr>
          
          <!-- Appointment Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 5px;">📅 Datum</strong>
                    <span style="color: #0F61AC; font-size: 16px;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 5px;">🕐 Tijdstip</strong>
                    <span style="color: #0F61AC; font-size: 16px;">${data.selectedTime}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 5px;">📍 Adres</strong>
                    <span style="color: #0F61AC; font-size: 16px;">${data.customerAddress}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 5px;">🏠 Type Woning</strong>
                    <span style="color: #0F61AC; font-size: 16px;">${getPropertyTypeLabel(data.propertyType)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 5px;">🧹 Service</strong>
                    <span style="color: #0F61AC; font-size: 14px;">
                      ${serviceType}<br>
                      Totaal aantal ramen: ${data.totalWindows}
                      ${data.exteriorWindows > 0 ? `<br>• Alleen buiten: ${data.exteriorWindows} ramen` : ""}
                      ${data.interiorExteriorWindows > 0 ? `<br>• Binnen & buiten: ${data.interiorExteriorWindows} ramen` : ""}
                      ${data.hardToReach ? "<br>• Moeilijk bereikbaar" : ""}
                      ${data.firstTimeInLong ? "<br>• Eerste keer in lange tijd" : ""}
                      ${data.cleanFrames ? "<br>• Kozijnen reinigen" : ""}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 5px;">💰 Richtprijs (incl. BTW)</strong>
                    <span style="color: #1792D0; font-size: 24px; font-weight: bold;">€${data.calculatedPrice.toFixed(2)}</span>
                    <br>
                    <span style="color: #6c757d; font-size: 12px;">Exacte prijs wordt bevestigd na inspectie</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What's Next -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h3 style="color: #044D8E; margin: 0 0 15px;">Wat gebeurt er nu?</h3>
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #1792D0;">1.</strong> <span style="color: #0F61AC;">We komen op de afgesproken tijd langs</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #1792D0;">2.</strong> <span style="color: #0F61AC;">We zorgen voor een streeploos resultaat met onze osmose-techniek</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #1792D0;">3.</strong> <span style="color: #0F61AC;">Je ontvangt foto's van het resultaat en de factuur</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <p style="color: #0F61AC; margin: 0 0 20px;">Wijziging nodig of vragen?</p>
              <a href="tel:${CONTACT.phone}" style="display: inline-block; padding: 15px 30px; background-color: #044D8E; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 10px 10px 0;">Bel ons</a>
              <a href="https://wa.me/${CONTACT.whatsapp}" style="display: inline-block; padding: 15px 30px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0 0 10px 0;">WhatsApp</a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #044D8E; font-weight: bold; font-size: 18px;">PANORA</p>
              <p style="margin: 0 0 5px; color: #6c757d; font-size: 14px;">Professionele ramenwasdienst in Gent</p>
              <p style="margin: 0 0 5px; color: #6c757d; font-size: 14px;">
                <a href="tel:${CONTACT.phone}" style="color: #1792D0; text-decoration: none;">${CONTACT.phoneDisplay}</a>
              </p>
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <a href="mailto:${CONTACT.email}" style="color: #1792D0; text-decoration: none;">${CONTACT.email}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateInternalEmailHTML(data: EmailData): string {
  const date = new Date(data.selectedDate);
  const formattedDate = date.toLocaleDateString("nl-BE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const serviceType =
    data.interiorExteriorWindows > 0 && data.exteriorWindows > 0
      ? "Complete Glasreiniging (gemengd)"
      : data.interiorExteriorWindows > 0
        ? "Complete Glasreiniging"
        : "Buiten Glasreiniging";

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe Boeking - PANORA</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #044D8E 0%, #1792D0 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🔔 Nieuwe Boeking!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; color: #044D8E; font-size: 22px;">Klantgegevens</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Naam:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <span style="color: #0F61AC;">${data.customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Email:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <a href="mailto:${data.customerEmail}" style="color: #1792D0; text-decoration: none;">${data.customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Telefoon:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <a href="tel:${data.customerPhone}" style="color: #1792D0; text-decoration: none;">${data.customerPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Adres:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <span style="color: #0F61AC;">${data.customerAddress}</span>
                  </td>
                </tr>
              </table>
              
              <h2 style="margin: 30px 0 20px; color: #044D8E; font-size: 22px;">Afspraakdetails</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Datum:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <span style="color: #0F61AC; font-weight: bold;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Tijdstip:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <span style="color: #0F61AC; font-weight: bold;">${data.selectedTime}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                    <strong style="color: #044D8E;">Type Woning:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                    <span style="color: #0F61AC;">${getPropertyTypeLabel(data.propertyType)}</span>
                  </td>
                </tr>
              </table>
              
              <h2 style="margin: 30px 0 20px; color: #044D8E; font-size: 22px;">Service Details</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 10px;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 10px;">Service Type:</strong>
                    <span style="color: #0F61AC;">${serviceType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 10px;">Ramen:</strong>
                    <ul style="margin: 0; padding-left: 20px; color: #0F61AC;">
                      <li>Totaal aantal ramen: ${data.totalWindows}</li>
                      ${data.exteriorWindows > 0 ? `<li>Alleen buiten: ${data.exteriorWindows} ramen</li>` : ""}
                      ${data.interiorExteriorWindows > 0 ? `<li>Binnen & buiten: ${data.interiorExteriorWindows} ramen</li>` : ""}
                    </ul>
                  </td>
                </tr>
                ${
                  data.hardToReach || data.firstTimeInLong || data.cleanFrames
                    ? `
                <tr>
                  <td style="padding: 10px;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 10px;">Extra's:</strong>
                    <ul style="margin: 0; padding-left: 20px; color: #0F61AC;">
                      ${data.hardToReach ? "<li>Moeilijk bereikbaar (+15%)</li>" : ""}
                      ${data.firstTimeInLong ? "<li>Eerste keer in lange tijd (+€20)</li>" : ""}
                      ${data.cleanFrames ? "<li>Kozijnen reinigen (+€25)</li>" : ""}
                    </ul>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.customerNotes
                    ? `
                <tr>
                  <td style="padding: 10px;">
                    <strong style="color: #044D8E; display: block; margin-bottom: 10px;">Opmerkingen:</strong>
                    <p style="margin: 0; color: #0F61AC; font-style: italic;">${data.customerNotes}</p>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
              
              <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #044D8E 0%, #1792D0 100%); border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 10px; color: #9FCAE3; font-size: 14px;">Berekende Richtprijs (incl. BTW)</p>
                <p style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold;">€${data.calculatedPrice.toFixed(2)}</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6c757d; font-size: 12px;">Boeking ontvangen via PANORA website - ${new Date().toLocaleString("nl-BE")}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateCustomerEmailText(data: EmailData): string {
  const date = new Date(data.selectedDate);
  const formattedDate = date.toLocaleDateString("nl-BE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
BEVESTIGING AFSPRAAK - PANORA

Beste ${data.customerName},

Je afspraak staat ingepland. We kijken ernaar uit om jouw ramen te laten stralen!

AFSPRAAKDETAILS:
━━━━━━━━━━━━━━━━
Datum: ${formattedDate}
Tijdstip: ${data.selectedTime}
Adres: ${data.customerAddress}

Richtprijs (incl. BTW): €${data.calculatedPrice.toFixed(2)}
(Exacte prijs wordt bevestigd na inspectie)

WAT GEBEURT ER NU?
━━━━━━━━━━━━━━━━
1. We komen op de afgesproken tijd langs
2. We zorgen voor een streeploos resultaat met onze osmose-techniek
3. Je ontvangt foto's van het resultaat en de factuur

Wijziging nodig of vragen?
Bel ons: ${CONTACT.phoneDisplay}
WhatsApp: ${CONTACT.phoneDisplay}
Email: ${CONTACT.email}

Met vriendelijke groet,
Team PANORA
Professionele ramenwasdienst in Gent
  `;
}

export function generateInternalEmailText(data: EmailData): string {
  const date = new Date(data.selectedDate);
  const formattedDate = date.toLocaleDateString("nl-BE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
NIEUWE BOEKING - PANORA

KLANTGEGEVENS:
━━━━━━━━━━━━━━━━
Naam: ${data.customerName}
Email: ${data.customerEmail}
Telefoon: ${data.customerPhone}
Adres: ${data.customerAddress}

AFSPRAAK:
━━━━━━━━━━━━━━━━
Datum: ${formattedDate}
Tijd: ${data.selectedTime}

SERVICE:
━━━━━━━━━━━━━━━━
Totaal ramen: ${data.totalWindows}
Alleen buiten: ${data.exteriorWindows}
Binnen & buiten: ${data.interiorExteriorWindows}
${data.hardToReach ? "✓ Moeilijk bereikbaar (+15%)\n" : ""}${data.firstTimeInLong ? "✓ Eerste keer lange tijd (+€20)\n" : ""}${data.cleanFrames ? "✓ Kozijnen reinigen (+€25)\n" : ""}
${data.customerNotes ? `\nOPMERKINGEN:\n${data.customerNotes}\n` : ""}
RICHTPRIJS: €${data.calculatedPrice.toFixed(2)} (incl. BTW)

Boeking ontvangen: ${new Date().toLocaleString("nl-BE")}
  `;
}
