"use client";

import { CalculatorData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isPostalCodeAllowed, getPostalCodeErrorMessage } from "@/lib/constants";

interface StepCustomerDetailsProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
    nextStep: () => void;
}

export default function StepCustomerDetails({
    data,
    updateData,
    nextStep,
}: StepCustomerDetailsProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState("");
    const [showContactLink, setShowContactLink] = useState(false);
    const [contactUrl, setContactUrl] = useState("");
    const [contactButtonText, setContactButtonText] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Valideer alle velden
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
            errors.privacy = "Je moet akkoord gaan met het privacybeleid om te kunnen boeken";
        }

        // Als er fouten zijn, toon ze en stop
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Clear field errors
        setFieldErrors({});

        // Valideer postcode voordat we submitten
        if (!isPostalCodeAllowed(data.customerPostalCode)) {
            const errorInfo = getPostalCodeErrorMessage(data.calculatedPrice);
            setPostalCodeError(errorInfo.message);
            setShowContactLink(errorInfo.showContactLink);
            setContactUrl(errorInfo.contactUrl || "");
            setContactButtonText(errorInfo.contactButtonText || "");
            return;
        }

        setIsSubmitting(true);

        try {
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

            console.log('📤 Sending booking request...');

            const response = await fetch("https://n8n.panora.be/webhook/planning/boek", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingPayload),
            });

            console.log('📡 Response status:', response.status, response.statusText);

            let result;
            try {
                result = await response.json();
                console.log('📥 Response body:', JSON.stringify(result, null, 2));
            } catch (e) {
                console.error('❌ Failed to parse response as JSON:', e);
                const textResponse = await response.text();
                console.error('Raw response:', textResponse);
                throw new Error(`API returned invalid JSON (status ${response.status})`);
            }

            if (response.status === 200 && (result.ok === true || result.status === "bevestigd" || result.bevestigd === true)) {
                console.log('✅ Booking successful!');

                // Track booking_request event
                if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || [];
                    const eventData = {
                        event: "booking_request",
                        funnel_name: "calculator",
                        service_type: data.propertyType,
                        total_windows: data.totalWindows,
                        price_value: data.calculatedPrice
                    };
                    window.dataLayer.push(eventData);
                    if (process.env.NODE_ENV === 'development') {
                        console.log('📊 GTM Event pushed:', eventData);
                    }
                }

                // Save booking details to sessionStorage
                const bookingDetails = {
                    customerName: data.customerName,
                    customerEmail: data.customerEmail,
                    customerPhone: data.customerPhone,
                    customerAddress: data.customerAddress,
                    customerCity: data.customerCity,
                    customerPostalCode: data.customerPostalCode,
                    selectedDate: data.selectedSlotStart ? new Date(data.selectedSlotStart).toISOString().split('T')[0] : '',
                    selectedTime: data.selectedSlotTitel || '',
                    calculatedPrice: data.calculatedPrice,
                    propertyType: data.propertyType,
                    totalWindows: data.totalWindows,
                    exteriorWindows: data.exteriorWindows,
                    interiorExteriorWindows: data.interiorExteriorWindows,
                    hardToReach: data.hardToReach,
                    firstTimeInLong: data.firstTimeInLong,
                    cleanFrames: data.cleanFrames,
                    confirmationMessage: result.boodschap || result.bevestiging || "Je afspraak is bevestigd! Je ontvangt binnenkort een e-mail met alle details.",
                };
                sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

                console.log('📦 Booking details saved to sessionStorage');
                console.log('🎉 Redirecting to confirmation page...');

                // Redirect to confirmation page
                router.push("/confirmation");
            } else if (response.status === 409) {
                // Slot just got booked by someone else
                alert("Dit moment is net geboekt door iemand anders. We tonen je nieuwe beschikbare momenten.");
                // Trigger refresh of slots (parent should handle this)
                window.location.reload();
            } else if (response.status === 422) {
                // Invalid slot or other validation error
                alert(result.reden || "Dit moment is niet meer beschikbaar. We tonen je nieuwe momenten.");
                window.location.reload();
            } else if (response.status === 400) {
                // Form validation error - read the 'fouten' array
                console.error('❌ 400 Bad Request - Details:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: result,
                    fouten: result.fouten,
                    reden: result.reden,
                    boodschap: result.boodschap
                });

                // Parse fouten array if present
                let errorMessage = "Er is een probleem met je invoer.";
                if (result.fouten && Array.isArray(result.fouten) && result.fouten.length > 0) {
                    errorMessage = "Validatiefouten:\n" + result.fouten.map((f: any) => `• ${f.veld || 'Onbekend veld'}: ${f.boodschap || f.fout || 'Onbekende fout'}`).join('\n');
                    console.error('📋 Validation errors:', result.fouten);
                } else if (result.reden) {
                    errorMessage = result.reden;
                } else if (result.boodschap) {
                    errorMessage = result.boodschap;
                }

                setFieldErrors({ form: errorMessage });
                alert(`Booking fout:\n\n${errorMessage}\n\nCheck de browser console (F12) voor volledige details.`);
            } else {
                // Unexpected response format
                console.error('⚠️ Unexpected response format:', {
                    status: response.status,
                    body: result,
                    hasOk: 'ok' in result,
                    hasStatus: 'status' in result,
                    hasBevestigd: 'bevestigd' in result,
                    okValue: result.ok,
                    statusValue: result.status,
                    bevestigdValue: result.bevestigd
                });

                // Track booking_error event
                if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || [];
                    const eventData = {
                        event: "booking_error",
                        funnel_name: "calculator",
                        error_type: "api_error"
                    };
                    window.dataLayer.push(eventData);
                    if (process.env.NODE_ENV === 'development') {
                        console.log('📊 GTM Event pushed:', eventData);
                    }
                }
                alert("Er is iets misgegaan. Probeer het opnieuw.");
            }
        } catch (error) {
            console.error("❌ Error submitting booking:", error);
            console.error('Error details:', {
                name: error instanceof Error ? error.name : 'Unknown',
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            });

            // Track booking_error event
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                const eventData = {
                    event: "booking_error",
                    funnel_name: "calculator",
                    error_type: "network_error"
                };
                window.dataLayer.push(eventData);
                if (process.env.NODE_ENV === 'development') {
                    console.log('📊 GTM Event pushed:', eventData);
                }
            }
            alert("Er is een fout opgetreden. Probeer het later opnieuw.\n\nCheck de browser console (F12) voor details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-md mx-auto">
            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4 md:mb-6">
                Vul je gegevens in om de afspraak te bevestigen
            </p>

            <div>
                <Label htmlFor="customerName" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    Volledige naam *
                </Label>
                <Input
                    id="customerName"
                    type="text"
                    value={data.customerName}
                    onChange={(e) => {
                        updateData({ customerName: e.target.value });
                        if (fieldErrors.customerName) {
                            setFieldErrors(prev => ({ ...prev, customerName: "" }));
                        }
                    }}
                    className={`border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11 placeholder:text-gray-400 ${fieldErrors.customerName ? 'border-red-500' : ''}`}
                    placeholder="Bijv. Jan Jansen"
                    required
                />
                {fieldErrors.customerName && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.customerName}</p>
                )}
            </div>

            <div>
                <Label htmlFor="customerPhone" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    Telefoonnummer
                </Label>
                <Input
                    id="customerPhone"
                    type="tel"
                    value={data.customerPhone}
                    onChange={(e) => {
                        updateData({ customerPhone: e.target.value });
                        if (fieldErrors.contact) {
                            setFieldErrors(prev => ({ ...prev, contact: "" }));
                        }
                    }}
                    className={`border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11 placeholder:text-gray-400 ${fieldErrors.contact ? 'border-red-500' : ''}`}
                    placeholder="Bijv. 0476 12 34 56"
                />
            </div>

            <div>
                <Label htmlFor="customerEmail" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    E-mailadres
                </Label>
                <Input
                    id="customerEmail"
                    type="email"
                    value={data.customerEmail}
                    onChange={(e) => {
                        updateData({ customerEmail: e.target.value });
                        if (fieldErrors.contact) {
                            setFieldErrors(prev => ({ ...prev, contact: "" }));
                        }
                    }}
                    className={`border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11 placeholder:text-gray-400 ${fieldErrors.contact ? 'border-red-500' : ''}`}
                    placeholder="Bijv. jan.jansen@example.com"
                />
                {fieldErrors.contact && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.contact}</p>
                )}
                <p className="text-xs text-slate-500 mt-1">* Vul minimaal een telefoonnummer of e-mailadres in</p>
            </div>

            <div>
                <Label htmlFor="customerNotes" className="text-[#044D8E] font-semibold">
                    Opmerkingen (optioneel)
                </Label>
                <Textarea
                    id="customerNotes"
                    value={data.customerNotes}
                    onChange={(e) => updateData({ customerNotes: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E] min-h-[80px] placeholder:text-gray-400"
                    placeholder="Bijv. moeilijk bereikbare ramen, huisdieren, etc."
                />
            </div>

            {/* Privacy checkbox - REQUIRED */}
            <div className="flex items-start space-x-2 pt-2 border-t border-slate-200">
                <Checkbox
                    id="privacyAccepted"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => {
                        setPrivacyAccepted(checked as boolean);
                        if (fieldErrors.privacy) {
                            setFieldErrors(prev => ({ ...prev, privacy: "" }));
                        }
                    }}
                    className={`mt-1 ${fieldErrors.privacy ? 'border-red-500' : ''}`}
                    required
                />
                <div>
                    <label
                        htmlFor="privacyAccepted"
                        className="text-sm text-slate-700 cursor-pointer"
                    >
                        Ik ga akkoord met het{" "}
                        <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#044D8E] underline hover:text-[#1792D0]"
                        >
                            privacybeleid
                        </a>
                        {" "}van Panora *
                    </label>
                    {fieldErrors.privacy && (
                        <p className="text-red-600 text-xs mt-1">{fieldErrors.privacy}</p>
                    )}
                </div>
            </div>

            {fieldErrors.form && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{fieldErrors.form}</p>
                </div>
            )}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#044D8E] hover:bg-[#1792D0] text-white font-bold py-3 text-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
                {isSubmitting ? "Bezig met boeken..." : "Bevestig afspraak"}
            </Button>
        </form>
    );
}
