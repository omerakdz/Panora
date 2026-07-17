"use client";

import { CalculatorData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { nl } from "date-fns/locale";
import { isDateAvailable } from "@/lib/calendar";
import { Loader2, MapPin, RefreshCw } from "lucide-react";

interface SlotData {
    start: string;
    end: string;
    titel: string;
    tijd: string;
    badge: string;
    uitleg: string;
    recommended: boolean;
}

interface AvailabilityResponse {
    adres_geverifieerd: boolean;
    slots: SlotData[];
    meer_slots?: SlotData[];
    fallback?: SlotData[];
    top_pick?: SlotData;
    klant_pin?: {
        latitude: string;
        longitude: string;
        precisie: string;
    };
    boodschap?: string;
    code?: string;
    adres_suggestie?: {
        display_name: string;
    };
    meer_beschikbaar?: boolean;
}

interface StepScheduleProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepSchedule({ data, updateData }: StepScheduleProps) {
    const [loading, setLoading] = useState(false);
    const [loadingTimeSlots, setLoadingTimeSlots] = useState(false); // FIX 2: aparte loading state voor tijden
    const [availabilityData, setAvailabilityData] = useState<AvailabilityResponse | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableSlots, setAvailableSlots] = useState<SlotData[]>([]);
    const [isRecommendedDay, setIsRecommendedDay] = useState(false);
    const [error, setError] = useState<string>("");
    const [needsAddressConfirmation, setNeedsAddressConfirmation] = useState(false);
    const [suggestedAddress, setSuggestedAddress] = useState<string>("");
    const [showAddressForm, setShowAddressForm] = useState(true);
    const [addressSubmitted, setAddressSubmitted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [recommendedDates, setRecommendedDates] = useState<Set<string>>(new Set());

    // Check if address is already filled
    useEffect(() => {
        if (data.customerAddress && data.customerPostalCode && data.customerCity && !addressSubmitted) {
            setShowAddressForm(false);
            fetchAvailability(false);
            setAddressSubmitted(true);
        }
    }, []);

    // When date is selected, filter slots for that day
    useEffect(() => {
        if (!selectedDate) {
            setAvailableSlots([]);
            setIsRecommendedDay(false);
            return;
        }

        if (!availabilityData) return;

        const dateStr = selectedDate.toISOString().split('T')[0];

        // Get all slots (primary + more + fallback)
        const allSlots = [
            ...(availabilityData.slots || []),
            ...(availabilityData.meer_slots || []),
            ...(availabilityData.fallback || [])
        ];

        // Filter slots for this day
        const slotsForDay = allSlots.filter(slot => {
            const slotDate = new Date(slot.start).toISOString().split('T')[0];
            return slotDate === dateStr;
        });

        // If no slots from n8n for this day, fetch from Google Calendar API
        if (slotsForDay.length === 0) {
            fetchGoogleCalendarSlots(selectedDate);
        } else {
            setAvailableSlots(slotsForDay);
            setLoadingTimeSlots(false);
        }
        const hasRecommended = slotsForDay.some(slot => slot.recommended ||
            slot.badge === "Aanbevolen" ||
            slot.badge === "Past goed in de route");
        setIsRecommendedDay(hasRecommended);

        // Also check if date itself is in recommended set
        if (recommendedDates.has(dateStr)) {
            setIsRecommendedDay(true);
        }
    }, [selectedDate, availabilityData, recommendedDates]);

    const calculateDuration = (): number => {
        const totalWindows = data.totalWindows;
        const hasInterior = data.interiorExteriorWindows > 0;

        if (!hasInterior && totalWindows <= 10) return 45;
        if (!hasInterior && totalWindows <= 30) return 60;
        if (!hasInterior && totalWindows > 30) return 90;
        if (hasInterior && totalWindows <= 10) return 60;
        if (hasInterior && totalWindows <= 20) return 90;
        if (hasInterior && totalWindows > 20) return 120;

        return 60;
    };

    const fetchAvailability = async (addressConfirmed: boolean = false) => {
        setLoading(true);
        setError("");

        try {
            // Parse address into street and house number
            const addressParts = data.customerAddress.trim().split(/\s+/);
            const huisnummer = addressParts[addressParts.length - 1];
            const straat = addressParts.slice(0, -1).join(" ");

            const requestBody = {
                straat,
                huisnummer,
                postcode: data.customerPostalCode,
                stad: data.customerCity,
                duur_min: calculateDuration(),
                kanaal: "website",
                ...(addressConfirmed && { adres_bevestigd: true })
            };

            console.log('🔍 Fetching availability with:', requestBody);

            const response = await fetch("https://n8n.panora.be/webhook/planning/v2/beschikbaarheid", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const result: AvailabilityResponse = await response.json();
                console.log('📅 API Response:', result);

                setAvailabilityData(result);

                // Build set of dates with slots and recommended dates
                const allSlots = [
                    ...(result.slots || []),
                    ...(result.meer_slots || []),
                    ...(result.fallback || [])
                ];

                const recDates = new Set<string>();
                allSlots.forEach(slot => {
                    const dateStr = new Date(slot.start).toISOString().split('T')[0];
                    if (slot.recommended || slot.badge === "Aanbevolen" || slot.badge === "Past goed in de route") {
                        recDates.add(dateStr);
                    }
                });
                setRecommendedDates(recDates);

                // Handle different response codes
                if (result.code === "ADDRESS_CONFIRMATION_REQUIRED") {
                    setNeedsAddressConfirmation(true);
                    setSuggestedAddress(result.adres_suggestie?.display_name || "");
                } else if (result.code === "ADDRESS_NOT_VERIFIED") {
                    setError(result.boodschap || "Adres niet gevonden. Controleer je gegevens.");
                } else if (result.code === "RANDGEBIED" || result.code === "BUITEN_WERKGEBIED") {
                    setError(result.boodschap || "");
                } else if (result.code?.startsWith("INVALID_")) {
                    setError(result.boodschap || "Ongeldige invoer. Controleer je gegevens.");
                } else if (!result.slots || result.slots.length === 0) {
                    setError(result.boodschap || "Geen online boekbare momenten gevonden.");
                }
            } else {
                setError("Kon beschikbaarheid niet ophalen. Probeer het opnieuw.");
            }
        } catch (error) {
            console.error('Error fetching availability:', error);
            setError("Onze agenda laadt even niet — probeer opnieuw.");
        } finally {
            setLoading(false);
        }
    };

    const handleDateSelect = (date: Date | undefined) => {
        console.log('📅 Date selected:', date);
        setSelectedDate(date);
        if (date) {
            setLoadingTimeSlots(true);
        }
        updateData({ selectedDate: date || null, selectedTime: "" });
    };

    const handleTimeSelect = (slot: SlotData) => {
        console.log('⏰ Time selected:', slot.tijd);

        // Store slot data in calculator data
        updateData({
            selectedTime: slot.tijd,
            selectedSlotStart: slot.start,
            selectedSlotEnd: slot.end,
            selectedSlotTitel: slot.titel,
            selectedSlotBadge: slot.badge,
            klantPinLatitude: availabilityData?.klant_pin?.latitude,
            klantPinLongitude: availabilityData?.klant_pin?.longitude,
            klantPinPrecisie: availabilityData?.klant_pin?.precisie,
        });

        // Track appointment_select event
        if (typeof window !== 'undefined' && selectedDate) {
            window.dataLayer = window.dataLayer || [];
            const eventData = {
                event: "appointment_select",
                funnel_name: "calculator",
                appointment_time: slot.tijd,
                appointment_day_of_week: selectedDate.toLocaleDateString('en-US', { weekday: 'long' })
            };
            window.dataLayer.push(eventData);
            if (process.env.NODE_ENV === 'development') {
                console.log('📊 GTM Event pushed:', eventData);
            }
        }
    };

    const handleRefresh = () => {
        if (addressSubmitted) {
            console.log('🔄 Manual refresh requested');
            fetchAvailability(false);
        }
    };

    // Fetch time slots from Google Calendar API for dates not in n8n response
    const fetchGoogleCalendarSlots = async (date: Date) => {
        setLoadingTimeSlots(true);
        try {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            console.log('📅 Fetching Google Calendar slots for:', dateStr);

            const timestamp = new Date().getTime();
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(`/api/availability?date=${dateStr}&t=${timestamp}`, {
                cache: 'no-store',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const result = await response.json();
                console.log('📅 Google Calendar Response:', result);

                // Convert string slots to SlotData format
                const googleSlots: SlotData[] = (result.slots || []).map((timeStr: string) => {
                    const [hours, minutes] = timeStr.split(':');
                    const startDate = new Date(date);
                    startDate.setHours(parseInt(hours), parseInt(minutes), 0);
                    const endDate = new Date(startDate);
                    endDate.setMinutes(endDate.getMinutes() + 60); // Assume 1 hour slots

                    return {
                        start: startDate.toISOString(),
                        end: endDate.toISOString(),
                        titel: timeStr,
                        tijd: timeStr,
                        badge: "",
                        uitleg: "",
                        recommended: false
                    };
                });

                setAvailableSlots(googleSlots);
            } else {
                console.error('Failed to fetch Google Calendar availability');
                setAvailableSlots([]);
            }
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.error('⏱️ Google Calendar request timeout - mogelijk netwerk probleem');
            } else {
                console.error('❌ Error fetching Google Calendar availability:', error);
            }
            setAvailableSlots([]);
        } finally {
            setLoadingTimeSlots(false);
        }
    };

    const handleAddressConfirmation = (confirmed: boolean) => {
        if (confirmed) {
            setNeedsAddressConfirmation(false);
            fetchAvailability(true);
        } else {
            setNeedsAddressConfirmation(false);
            setShowAddressForm(true);
            setAvailabilityData(null);
        }
    };

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { [key: string]: string } = {};
        if (!data.customerAddress.trim()) {
            errors.customerAddress = "Vul je straat en huisnummer in";
        }
        if (!data.customerPostalCode.trim()) {
            errors.customerPostalCode = "Vul je postcode in";
        }
        if (!data.customerCity.trim()) {
            errors.customerCity = "Vul je gemeente in";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        setShowAddressForm(false);
        setAddressSubmitted(true);
        fetchAvailability(false);
    };

    // Get dates with available slots for calendar
    const getDatesWithSlots = () => {
        if (!availabilityData) return new Set<string>();

        const allSlots = [
            ...(availabilityData.slots || []),
            ...(availabilityData.meer_slots || []),
            ...(availabilityData.fallback || [])
        ];

        const datesSet = new Set<string>();
        allSlots.forEach(slot => {
            const dateStr = new Date(slot.start).toISOString().split('T')[0];
            datesSet.add(dateStr);
        });

        return datesSet;
    };

    const availableDatesSet = getDatesWithSlots();

    // Custom modifiers for calendar styling
    const modifiers = {
        recommended: (date: Date) => {
            const dateStr = date.toISOString().split('T')[0];
            return recommendedDates.has(dateStr);
        },
        available: (date: Date) => {
            // Alle werkdagen die niet recommended zijn, tonen als blauw 
            if (!isDateAvailable(date)) return false;
            const dateStr = date.toISOString().split('T')[0];
            // Alleen blauw als het NIET al groen (recommended) is
            return !recommendedDates.has(dateStr);
        }
    };

    const modifiersClassNames = {
        recommended: "rounded-xl bg-emerald-400 text-white font-bold border-2 border-emerald-500 hover:bg-emerald-500 shadow-md",
        available: "rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200"
    };
    // Address form 
    if (showAddressForm) {
        return (
            <form onSubmit={handleAddressSubmit} className="space-y-4 max-w-md mx-auto">
                <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4">
                    Vul je adres in om beschikbare momenten te zien
                </p>

                <div>
                    <label htmlFor="address" className="block text-[#044D8E] font-semibold mb-2 text-sm md:text-base">
                        Straat en huisnummer *
                    </label>
                    <Input
                        id="address"
                        type="text"
                        value={data.customerAddress}
                        onChange={(e) => {
                            updateData({ customerAddress: e.target.value });
                            if (fieldErrors.customerAddress) {
                                setFieldErrors(prev => ({ ...prev, customerAddress: "" }));
                            }
                        }}
                        className={`placeholder:text-slate-400 placeholder:italic ${fieldErrors.customerAddress ? 'border-red-500' : ''}`}
                        placeholder="Bijv. Korte Nieuwstraat 12"
                    />
                    {fieldErrors.customerAddress && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.customerAddress}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="postalCode" className="block text-[#044D8E] font-semibold mb-2 text-sm md:text-base">
                            Postcode *
                        </label>
                        <Input
                            id="postalCode"
                            type="text"
                            value={data.customerPostalCode}
                            onChange={(e) => {
                                updateData({ customerPostalCode: e.target.value });
                                if (fieldErrors.customerPostalCode) {
                                    setFieldErrors(prev => ({ ...prev, customerPostalCode: "" }));
                                }
                            }}
                            className={`placeholder:text-slate-400 placeholder:italic ${fieldErrors.customerPostalCode ? 'border-red-500' : ''}`}
                            placeholder="Bijv. 9000"
                            maxLength={4}
                        />
                        {fieldErrors.customerPostalCode && (
                            <p className="text-red-600 text-sm mt-1">{fieldErrors.customerPostalCode}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-[#044D8E] font-semibold mb-2 text-sm md:text-base">
                            Gemeente *
                        </label>
                        <Input
                            id="city"
                            type="text"
                            value={data.customerCity}
                            onChange={(e) => {
                                updateData({ customerCity: e.target.value });
                                if (fieldErrors.customerCity) {
                                    setFieldErrors(prev => ({ ...prev, customerCity: "" }));
                                }
                            }}
                            className={`placeholder:text-slate-400 placeholder:italic ${fieldErrors.customerCity ? 'border-red-500' : ''}`}
                            placeholder="Bijv. Gent"
                        />
                        {fieldErrors.customerCity && (
                            <p className="text-red-600 text-sm mt-1">{fieldErrors.customerCity}</p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1792D0] to-[#044D8E] hover:from-[#0F61AC] hover:to-[#033465] text-white font-semibold py-3 text-lg transition-all duration-300 hover:shadow-lg"
                >
                    Beschikbare momenten tonen
                </Button>
            </form>
        );
    }

    // Loading state (Step 4B)
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin">
                    <Loader2 className="w-12 h-12 text-[#1792D0]" />
                </div>
                <div className="text-center">
                    <p className="text-[#044D8E] font-semibold text-lg mb-2">
                        Momentje… We stemmen onze agenda exclusief af op jouw buurt! 🚗✨
                    </p>
                    <p className="text-slate-600 text-sm">
                        We berekenen de beste momenten voor jouw locatie
                    </p>
                </div>
            </div>
        );
    }

    // Address confirmation needed
    if (needsAddressConfirmation) {
        return (
            <div className="space-y-4">
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Is dit jouw adres?
                    </h4>
                    <p className="text-amber-800 mb-4 text-lg">
                        {suggestedAddress}
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => handleAddressConfirmation(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                        >
                            Ja, dat klopt
                        </Button>
                        <Button
                            onClick={() => handleAddressConfirmation(false)}
                            variant="outline"
                            className="border-amber-600 text-amber-900 hover:bg-amber-100 flex-1"
                        >
                            Nee, aanpassen
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Error state - FIX 1: herstelbaar maken
    if (error) {
        return (
            <div className="space-y-4">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
                    <p className="text-red-800 font-semibold mb-2">
                        {error}
                    </p>
                    <div className="flex gap-3 justify-center mt-4">
                        <Button
                            onClick={() => {
                                setError("");
                                setShowAddressForm(true);
                                setAddressSubmitted(false);
                                setAvailabilityData(null);
                            }}
                            variant="outline"
                            className="border-[#044D8E] text-[#044D8E] hover:bg-[#044D8E] hover:text-white"
                        >
                            Adres aanpassen
                        </Button>
                        <Button
                            onClick={() => window.location.href = "/contact"}
                            className="bg-[#044D8E] hover:bg-[#1792D0]"
                        >
                            Neem contact op
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // No data yet
    if (!availabilityData) {
        return (
            <div className="text-center py-8">
                <p className="text-slate-600">Laden...</p>
            </div>
        );
    }

    // Calendar + time slots view (Step 4C)
    return (
        <div className="space-y-4 md:space-y-6">
            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4 md:mb-6">
                Selecteer een datum en tijdslot voor je afspraak
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* Calendar */}
                <div className="flex flex-col items-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => !isDateAvailable(date)}
                        modifiers={modifiers}
                        modifiersClassNames={modifiersClassNames}
                        locale={nl}
                        className="rounded-lg border border-[#9FCAE3] scale-90 md:scale-100"
                    />
                    {/* FIX 3: Legenda */}
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

                {/* Time Slots */}
                <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h4 className="font-semibold text-[#044D8E] text-sm md:text-base">
                            {selectedDate
                                ? `Tijden ${selectedDate.toLocaleDateString("nl-BE", { day: 'numeric', month: 'short' })}`
                                : "Selecteer datum"}
                        </h4>
                        {availabilityData && (
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
                                        const isSelected = data.selectedTime === slot.tijd;

                                        return (
                                            <Button
                                                key={slot.start}
                                                onClick={() => handleTimeSelect(slot)}
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
