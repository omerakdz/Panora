import type { CalculatorData } from "@/types";

export function validateBookingForm(
  data: CalculatorData,
  privacyAccepted: boolean,
  setFieldErrors: (errors: { [key: string]: string }) => void,
) {
  const errors: { [key: string]: string } = {};

  if (!data.customerName.trim()) {
    errors.customerName = "Vul je volledige naam in";
  }

  if (!data.customerPhone.trim() && !data.customerEmail.trim()) {
    errors.contact = "Vul minimaal een telefoonnummer of e-mailadres in";
  }

  if (!data.customerAddress.trim()) {
    errors.customerAddress = "Vul je straat en huisnummer in";
  }

  if (!data.customerPostalCode.trim()) {
    errors.customerPostalCode = "Vul je postcode in";
  }

  if (!data.customerCity.trim()) {
    errors.customerCity = "Vul je stad in";
  }

  if (!privacyAccepted) {
    errors.privacy =
      "Je moet akkoord gaan met het privacybeleid om te kunnen boeken";
  }

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);
    return false;
  }

  setFieldErrors({});
  return true;
}
