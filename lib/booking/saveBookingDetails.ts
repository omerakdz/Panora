import { CalculatorData } from "@/types";
import { format } from "date-fns";
import { getSelectedMomentLabel } from "./selectedMomentLabel";

export const saveBookingDetails = async (
  confirmationMessage: string,
  data: CalculatorData,
) => {
  const bookingDetails = {
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    customerAddress: data.customerAddress,
    customerCity: data.customerCity,
    customerPostalCode: data.customerPostalCode,
    selectedDate: data.selectedDate
      ? format(data.selectedDate, "yyyy-MM-dd")
      : "",
    selectedTime: data.selectedTime || "",
    selectedSlotTitel: getSelectedMomentLabel(data),
    calculatedPrice: data.calculatedPrice,
    propertyType: data.propertyType,
    totalWindows: data.totalWindows,
    exteriorWindows: data.exteriorWindows,
    interiorExteriorWindows: data.interiorExteriorWindows,
    hardToReach: data.hardToReach,
    firstTimeInLong: data.firstTimeInLong,
    cleanFrames: data.cleanFrames,
    confirmationMessage: confirmationMessage,
  };
  sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
};
