import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalculatorData } from "@/types";

export function getSelectedMomentLabel(data: CalculatorData): string {
  const selectedDayLabel = data.selectedDate
    ? format(data.selectedDate, "EEEE d MMMM", { locale: nl })
    : "";

  if (data.selectedSlotTitel) {
    return selectedDayLabel &&
      !data.selectedSlotTitel
        .toLowerCase()
        .includes(selectedDayLabel.toLowerCase())
      ? `${selectedDayLabel} om ${data.selectedSlotTitel}`
      : data.selectedSlotTitel;
  }

  if (data.selectedDate && data.selectedTime) {
    return `${selectedDayLabel} om ${data.selectedTime}`;
  }

  return "";
}
