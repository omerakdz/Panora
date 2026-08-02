"use client";

import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalculatorData } from "@/types";

interface AppointmentSummaryProps {
    data: CalculatorData;
}

const AppointmentSummary = ({ data }: AppointmentSummaryProps) => {
    const selectedDayLabel = data.selectedDate
        ? format(data.selectedDate, "EEEE d MMMM", { locale: nl })
        : "";

    const selectedMomentLabel = data.selectedSlotTitel
        ? selectedDayLabel && !data.selectedSlotTitel.toLowerCase().includes(selectedDayLabel.toLowerCase())
            ? `${selectedDayLabel} om ${data.selectedSlotTitel}`
            : data.selectedSlotTitel
        : data.selectedDate && data.selectedTime
            ? `${selectedDayLabel} om ${data.selectedTime}`
            : "";

    if (!selectedMomentLabel) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-[#044D8E] text-sm font-semibold">Gekozen afspraakmoment</p>
            <p className="text-[#0F61AC] text-sm capitalize">{selectedMomentLabel}</p>
        </div>
    );
};

export default AppointmentSummary;