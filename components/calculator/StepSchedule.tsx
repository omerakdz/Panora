"use client";

import { CalculatorData } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { nl } from "date-fns/locale";
import { isDateAvailable } from "@/lib/calendar";
import { RefreshCw } from "lucide-react";

interface StepScheduleProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepSchedule({ data, updateData }: StepScheduleProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        data.selectedDate || undefined
    );
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch available time slots
    const fetchAvailability = async (date: Date) => {
        setLoading(true);
        try {
            // FIX: Gebruik UTC datum om timezone problemen te voorkomen
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            console.log('🔍 Fetching availability for:', dateStr, 'from date object:', date);

            const timestamp = new Date().getTime();
            const response = await fetch(`/api/availability?date=${dateStr}&t=${timestamp}`, {
                cache: 'no-store'
            });

            if (response.ok) {
                const result = await response.json();
                console.log('📅 API Response:', result);
                setAvailableSlots(result.slots || []);
            } else {
                console.error('Failed to fetch availability');
                setAvailableSlots([]);
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch when date changes
    useEffect(() => {
        if (!selectedDate) {
            setAvailableSlots([]);
            return;
        }

        fetchAvailability(selectedDate);
    }, [selectedDate]);

    // Auto-refresh when window gets focus
    useEffect(() => {
        const handleFocus = () => {
            if (selectedDate) {
                console.log('🔄 Window focused - refreshing slots');
                fetchAvailability(selectedDate);
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [selectedDate]);

    const handleDateSelect = (date: Date | undefined) => {
        console.log('📅 Date selected:', date);
        setSelectedDate(date);
        updateData({ selectedDate: date || null, selectedTime: "" });
    };

    const handleTimeSelect = (time: string) => {
        console.log('⏰ Time selected:', time);
        updateData({ selectedTime: time });
    };

    const handleRefresh = () => {
        if (selectedDate) {
            console.log('🔄 Manual refresh requested');
            fetchAvailability(selectedDate);
        }
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4 md:mb-6">
                Selecteer een datum en tijdslot voor je afspraak
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Calendar */}
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => !isDateAvailable(date)}
                        locale={nl}
                        className="rounded-lg border border-[#9FCAE3] scale-90 md:scale-100"
                    />
                </div>

                {/* Time Slots */}
                <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h4 className="font-semibold text-[#044D8E] text-sm md:text-base">
                            {selectedDate
                                ? `Tijden ${selectedDate.toLocaleDateString("nl-BE", { day: 'numeric', month: 'short' })}`
                                : "Selecteer datum"}
                        </h4>
                        {selectedDate && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={loading}
                                className="text-[#044D8E] h-8 w-8 p-0"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#044D8E]"></div>
                            <p className="text-[#0F61AC] text-sm mt-2">Tijdsloten laden...</p>
                        </div>
                    ) : selectedDate && availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                            {availableSlots.map((slot) => (
                                <Button
                                    key={slot}
                                    onClick={() => handleTimeSelect(slot)}
                                    variant={data.selectedTime === slot ? "default" : "outline"}
                                    className={`text-sm md:text-base py-2 md:py-3 ${data.selectedTime === slot
                                            ? "bg-[#044D8E] hover:bg-[#0F61AC]"
                                            : "border-[#9FCAE3] hover:border-[#044D8E] text-[#044D8E]"
                                        }`}
                                >
                                    {slot}
                                </Button>
                            ))}
                        </div>
                    ) : selectedDate ? (
                        <div className="text-center py-4 md:py-6 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-orange-800 font-semibold text-sm md:text-base">
                                Geen beschikbare tijden voor deze datum
                            </p>
                            <p className="text-orange-600 text-xs md:text-sm mt-2">
                                Alle tijdsloten zijn reeds geboekt
                            </p>
                        </div>
                    ) : (
                        <p className="text-[#0F61AC] text-xs md:text-sm">
                            Selecteer een datum om beschikbare tijden te zien.
                        </p>
                    )}


                </div>
            </div>

            {data.selectedDate && data.selectedTime && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 text-center">
                    <p className="text-green-800 text-sm md:text-base">
                        ✓ Je hebt gekozen voor{" "}
                        <strong>
                            {data.selectedDate.toLocaleDateString("nl-BE")} om {data.selectedTime}
                        </strong>
                    </p>
                </div>
            )}
        </div>
    );
}
