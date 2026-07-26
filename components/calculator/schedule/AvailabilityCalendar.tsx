"use client";
import { Calendar } from "@/components/ui/calendar";
import { nl } from "date-fns/locale";

interface AvailabilityCalendarProps {
    selectedDate: Date | undefined;
    onSelect: (date: Date | undefined) => void;
    currentMonth: Date;
    onMonthChange: (date: Date) => void;
    isDisabled: (date: Date) => boolean;
    modifiers: Record<string, (date: Date) => boolean>;
    modifiersClassNames: Record<string, string>;
    loadingMonth: boolean;
}

const AvailabilityCalendar = ({ selectedDate, onSelect, currentMonth, onMonthChange, isDisabled, modifiers, modifiersClassNames, loadingMonth }: AvailabilityCalendarProps) => {
    return (
        <div className="flex flex-col items-center">
            {loadingMonth && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <div className="w-4 h-4 border-2 border-[#1792D0] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[#0F61AC] text-xs">Beschikbaarheid laden...</span>
                </div>
            )}
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onSelect}
                month={currentMonth}
                onMonthChange={onMonthChange}
                disabled={isDisabled}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                locale={nl}
                className="rounded-lg border border-[#9FCAE3] scale-90 md:scale-100"
            />
            {/* Legenda */}
            <div className="mt-4 space-y-2 text-xs md:text-sm text-left w-full max-w-[280px]">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-400 border-2 border-emerald-500 rounded"></div>
                    <span className="text-slate-700"><strong>Groen</strong> = wij zijn in je buurt</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-50 border border-blue-200 rounded"></div>
                    <span className="text-slate-700"><strong>Blauw</strong> = standaard beschikbaar</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-100 border border-slate-300 rounded opacity-50"></div>
                    <span className="text-slate-700"><strong>Grijs</strong> = volgeboekt / niet beschikbaar</span>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityCalendar;