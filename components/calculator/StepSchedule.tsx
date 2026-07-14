"use client";

import { CalculatorData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
    const [availabilityData, setAvailabilityData] = useState<AvailabilityResponse | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<SlotData | null>(null);
    const [showMoreSlots, setShowMoreSlots] = useState(false);
    const [error, setError] = useState<string>("");
    const [needsAddressConfirmation, setNeedsAddressConfirmation] = useState(false);
    const [suggestedAddress, setSuggestedAddress] = useState<string>("");
    const [showAddressForm, setShowAddressForm] = useState(true);
    const [addressSubmitted, setAddressSubmitted] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    // Check if address is already filled
    useEffect(() => {
        if (data.customerAddress && data.customerPostalCode && data.customerCity && !addressSubmitted) {
            setShowAddressForm(false);
            fetchAvailability(false);
            setAddressSubmitted(true);
        }
    }, []);

    const calculateDuration = (): number => {
        const totalWindows = data.totalWindows;
        const hasInterior = data.interiorExteriorWindows > 0;

        // Klein, enkel buiten (≤10 panelen): 45
        if (!hasInterior && totalWindows <= 10) return 45;

        // Normaal, enkel buiten: 60
        if (!hasInterior && totalWindows <= 30) return 60;

        // Groot (≥25 panelen): 90
        if (!hasInterior && totalWindows > 30) return 90;

        // Binnen + buiten, t/m 10 ramen: 60
        if (hasInterior && totalWindows <= 10) return 60;

        // Binnen + buiten, 11-20 ramen: 90
        if (hasInterior && totalWindows <= 20) return 90;

        // Binnen + buiten, meer dan 20: 120
        if (hasInterior && totalWindows > 20) return 120;

        // Default
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

    const handleSlotSelect = (slot: SlotData) => {
        setSelectedSlot(slot);

        // Store slot data in calculator data for later use
        updateData({
            selectedSlotStart: slot.start,
            selectedSlotEnd: slot.end,
            selectedSlotTitel: slot.titel,
            selectedSlotBadge: slot.badge,
            klantPinLatitude: availabilityData?.klant_pin?.latitude,
            klantPinLongitude: availabilityData?.klant_pin?.longitude,
            klantPinPrecisie: availabilityData?.klant_pin?.precisie,
        });
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

        // Validate address fields
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

    const renderSlot = (slot: SlotData, isRecommended: boolean = false, isFallback: boolean = false) => {
        const isSelected = selectedSlot?.start === slot.start;

        return (
            <motion.div
                key={slot.start}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Button
                    onClick={() => handleSlotSelect(slot)}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full text-left h-auto p-4 relative overflow-hidden transition-all duration-300 ${isRecommended
                        ? isSelected
                            ? "bg-gradient-to-br from-[#1792D0] to-[#044D8E] text-white border-2 border-[#044D8E] shadow-lg"
                            : "border-2 border-[#1792D0] hover:border-[#044D8E] bg-blue-50/50"
                        : isSelected
                            ? "bg-[#044D8E] text-white"
                            : "border-[#9FCAE3] hover:border-[#044D8E]"
                        }`}
                >
                    {/* Badge */}
                    <div className="absolute top-2 right-2">
                        <Badge
                            variant={isRecommended ? "default" : "secondary"}
                            className={`text-xs ${isRecommended
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                : isFallback
                                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                                    : "bg-slate-200 text-slate-700"
                                }`}
                        >
                            {slot.badge}
                        </Badge>
                    </div>

                    <div className="pr-24">
                        {/* Titel */}
                        <div className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-[#044D8E]'}`}>
                            <Clock className="inline-block w-4 h-4 mr-1" />
                            {slot.titel}
                        </div>

                        {/* Uitleg */}
                        <div className={`text-sm ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                            {slot.uitleg}
                        </div>
                    </div>

                    {isSelected && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute bottom-2 right-2"
                        >
                            <div className="bg-white rounded-full p-1">
                                <svg className="w-5 h-5 text-[#044D8E]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </Button>
            </motion.div>
        );
    };

    // Address form (Step 4A)
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
                    className="w-full bg-gradient-to-r from-[#1792D0] to-[#044D8E] hover:from-[#0F61AC] hover:to-[#033465] text-white font-semibold py-3 text-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
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
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="w-12 h-12 text-[#1792D0]" />
                </motion.div>
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

    // Error state
    if (error) {
        return (
            <div className="space-y-4">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
                    <p className="text-red-800 font-semibold mb-2">
                        {error}
                    </p>
                    <Button
                        onClick={() => window.location.href = "/contact"}
                        className="bg-[#044D8E] hover:bg-[#1792D0] mt-4"
                    >
                        Neem contact op
                    </Button>
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

    // Render available slots (Step 4C)
    return (
        <div className="space-y-4">
            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4">
                Kies een moment dat past bij jouw planning
            </p>

            {/* Primary slots */}
            {availabilityData.slots && availabilityData.slots.length > 0 && (
                <div className="space-y-3">
                    {availabilityData.slots.map((slot, index) =>
                        renderSlot(slot, index === 0 && slot.recommended)
                    )}
                </div>
            )}

            {/* More slots toggle */}
            {availabilityData.meer_beschikbaar && availabilityData.meer_slots && availabilityData.meer_slots.length > 0 && (
                <div className="space-y-3">
                    <Button
                        onClick={() => setShowMoreSlots(!showMoreSlots)}
                        variant="ghost"
                        className="w-full text-[#044D8E] hover:bg-[#044D8E]/10 hover:text-[#023A6B] cursor-pointer transition-all duration-300 flex items-center justify-center"
                    >
                        {showMoreSlots ? "Minder momenten" : "Meer momenten"}
                        <ChevronDown
                            className={`ml-2 w-4 h-4 transition-transform ${showMoreSlots ? "rotate-180" : ""
                                }`}
                        />
                    </Button>

                    <AnimatePresence>
                        {showMoreSlots && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3"
                            >
                                {availabilityData.meer_slots.map(slot => renderSlot(slot))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Fallback slots (extra optie) */}
            {(!availabilityData.slots || availabilityData.slots.length === 0) &&
                availabilityData.fallback && availabilityData.fallback.length > 0 && (
                    <div className="space-y-3">
                        <p className="text-sm text-slate-600 text-center mb-2">Extra optie:</p>
                        {availabilityData.fallback.map(slot => renderSlot(slot, false, true))}
                    </div>
                )}

            {/* Selected confirmation */}
            {selectedSlot && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4 text-center"
                >
                    <p className="text-emerald-800 font-semibold">
                        ✓ Je hebt gekozen voor <strong>{selectedSlot.titel}</strong>
                    </p>
                </motion.div>
            )}
        </div>
    );
}
