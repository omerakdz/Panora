"use client";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { SlotData } from "@/types";

interface TimeSlotPickerProps {
    selectedDate: Date | undefined;
    availableSlots: SlotData[];
    loadingTimeSlots: boolean;
    isRecommendedDay: boolean;
    selectedTime: string;
    onSelectSlot: (slot: SlotData) => void;
    onRefresh: () => void;
    refreshing: boolean;
}

const TimeSlotPicker = ({ selectedDate, availableSlots, loadingTimeSlots, isRecommendedDay, selectedTime, onSelectSlot, onRefresh, refreshing }: TimeSlotPickerProps) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <h4 className="font-semibold text-[#044D8E] text-sm md:text-base">
                    {selectedDate
                        ? `Tijden ${selectedDate.toLocaleDateString("nl-BE", { day: 'numeric', month: 'short' })}`
                        : "Selecteer datum"}
                </h4>
                {refreshing && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onRefresh}
                        disabled={refreshing}
                        className="text-[#044D8E] h-8 w-8 p-0"
                    >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    </Button>
                )}
            </div>

            {/* FIX 2: Loading state alleen voor tijden panel */}
            {loadingTimeSlots ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                    <Loader2 className="w-8 h-8 text-[#1792D0] animate-spin" />
                    <p className="text-[#044D8E] text-sm">Beschikbare tijden laden...</p>
                </div>
            ) : (
                <>
                    {/* Recommended day message */}
                    {selectedDate && isRecommendedDay && (
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-3 mb-4 text-center">
                            <p className="text-emerald-800 font-semibold text-sm md:text-base">
                                Deze dag zijn wij in jouw buurt!
                            </p>
                        </div>
                    )}

                    {selectedDate && availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {availableSlots.map((slot) => {
                                const isRecommended = slot.recommended ||
                                    slot.badge === "Aanbevolen" ||
                                    slot.badge === "Past goed in de route";
                                const isSelected = selectedTime === slot.tijd;

                                return (
                                    <Button
                                        key={slot.start}
                                        onClick={() => onSelectSlot(slot)}
                                        variant={isSelected ? "default" : "outline"}
                                        className={`text-sm md:text-base py-2 md:py-3 cursor-pointer ${isRecommended
                                            ? isSelected
                                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                                : "bg-emerald-50 border-[#9FCAE3] hover:bg-emerald-100 text-emerald-800 font-semibold"
                                            : isSelected
                                                ? "bg-[#044D8E] hover:bg-[#0F61AC]"
                                                : "border-[#9FCAE3] hover:border-[#044D8E] text-[#044D8E]"
                                            }`}
                                    >
                                        {slot.tijd}
                                        {isRecommended && !isSelected && (
                                            <span className="ml-1"></span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    ) : selectedDate ? (
                        <div className="text-center py-4 md:py-6 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-orange-800 font-semibold text-sm md:text-base">
                                Geen beschikbare tijden voor deze datum
                            </p>
                        </div>
                    ) : (
                        <p className="text-[#0F61AC] text-xs md:text-sm">
                            Selecteer een datum om beschikbare tijden te zien.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default TimeSlotPicker;