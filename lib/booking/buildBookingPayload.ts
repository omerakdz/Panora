import { CalculatorData } from "@/types";

export const buildBookingPayload = (data: CalculatorData) => {
  // Parse address into street and house number
  const addressParts = data.customerAddress.trim().split(/\s+/);
  const huisnummer = addressParts[addressParts.length - 1];
  const straat = addressParts.slice(0, -1).join(" ");

  // API expects Dutch field names and this exact structure
  const bookingPayload = {
    klantNaam: data.customerName,
    klantEmail: data.customerEmail || "",
    telefoon: data.customerPhone || "",
    straat,
    huisnummer,
    postcode: data.customerPostalCode,
    stad: data.customerCity,
    typeWoning: data.propertyType,
    aantalBuiten: data.exteriorWindows,
    aantalBinnenBuiten: data.interiorExteriorWindows,
    totaalRamen: data.totalWindows,
    prijs: String(data.calculatedPrice),
    opmerkingen: data.customerNotes || "",
    start: data.selectedSlotStart,
    eind: data.selectedSlotEnd,
    bron: "Website",
    // Optional fields from slot selection
    ...(data.klantPinLatitude && { latitude: data.klantPinLatitude }),
    ...(data.klantPinLongitude && { longitude: data.klantPinLongitude }),
    ...(data.klantPinPrecisie && { pin_precision: data.klantPinPrecisie }),
    // Extra options
    ...(data.hardToReach && { moeilijkBereikbaar: data.hardToReach }),
    ...(data.firstTimeInLong && { eersteLangeTijd: data.firstTimeInLong }),
    ...(data.cleanFrames && { ramenReinigen: data.cleanFrames }),
  };
  return bookingPayload;
};
