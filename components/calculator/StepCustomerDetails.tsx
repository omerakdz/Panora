"use client";

import { CalculatorData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Valideer postcode voordat we submitten
        if (!isPostalCodeAllowed(data.customerPostalCode)) {
            const errorInfo = getPostalCodeErrorMessage(data.calculatedPrice);
            setPostalCodeError(errorInfo.message);
            setShowContactLink(errorInfo.showContactLink);
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert selectedDate to YYYY-MM-DD format (local timezone)
            let selectedDateString = "";
            if (data.selectedDate) {
                const year = data.selectedDate.getFullYear();
                const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(data.selectedDate.getDate()).padStart(2, '0');
                selectedDateString = `${year}-${month}-${day}`;
            }

            // Send booking data to API
            const response = await fetch("/api/book-appointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    selectedDate: selectedDateString,
                }),
            });

            if (response.ok) {
                // Track booking_request event - zonder PII
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
                    selectedDate: selectedDateString,
                    selectedTime: data.selectedTime,
                    calculatedPrice: data.calculatedPrice,
                    propertyType: data.propertyType,
                    totalWindows: data.totalWindows,
                    exteriorWindows: data.exteriorWindows,
                    interiorExteriorWindows: data.interiorExteriorWindows,
                    hardToReach: data.hardToReach,
                    firstTimeInLong: data.firstTimeInLong,
                    cleanFrames: data.cleanFrames,
                };
                sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

                // Redirect to confirmation page
                router.push("/confirmation");
            } else {
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
            console.error("Error submitting booking:", error);

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
            alert("Er is een fout opgetreden. Probeer het later opnieuw.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid =
        data.customerName &&
        data.customerPhone &&
        data.customerEmail &&
        data.customerAddress &&
        data.customerCity &&
        data.customerPostalCode &&
        !postalCodeError;

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
                    onChange={(e) => updateData({ customerName: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11"
                    placeholder="Jan Janssens"
                    required
                />
            </div>

            <div>
                <Label htmlFor="customerPhone" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    Telefoonnummer *
                </Label>
                <Input
                    id="customerPhone"
                    type="tel"
                    value={data.customerPhone}
                    onChange={(e) => updateData({ customerPhone: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11"
                    placeholder="+32 123 45 67 89"
                    required
                />
            </div>

            <div>
                <Label htmlFor="customerEmail" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    E-mailadres *
                </Label>
                <Input
                    id="customerEmail"
                    type="email"
                    value={data.customerEmail}
                    onChange={(e) => updateData({ customerEmail: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11"
                    placeholder="jan@voorbeeld.be"
                    required
                />
            </div>

            <div>
                <Label htmlFor="customerAddress" className="text-[#044D8E] font-semibold">
                    Straat en huisnummer *
                </Label>
                <Input
                    id="customerAddress"
                    type="text"
                    value={data.customerAddress}
                    onChange={(e) => updateData({ customerAddress: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E]"
                    placeholder="Korenmarkt 1"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="customerPostalCode" className="text-[#044D8E] font-semibold">
                        Postcode *
                    </Label>
                    <Input
                        id="customerPostalCode"
                        type="text"
                        value={data.customerPostalCode}
                        onChange={(e) => {
                            updateData({ customerPostalCode: e.target.value });
                            setPostalCodeError(""); // Clear error when user types
                            setShowContactLink(false);
                        }}
                        className={`border-[#9FCAE3] focus:border-[#044D8E] ${postalCodeError ? 'border-red-500' : ''}`}
                        placeholder="9000"
                        required
                    />
                    {postalCodeError && (
                        <div className="text-red-600 text-sm mt-1">
                            <p>{postalCodeError}</p>
                            {showContactLink && (
                                <a
                                    href="/contact"
                                    className="text-[#044D8E] underline hover:text-[#0F61AC] font-semibold mt-1 inline-block"
                                >
                                    Neem contact met ons op →
                                </a>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <Label htmlFor="customerCity" className="text-[#044D8E] font-semibold">
                        Stad *
                    </Label>
                    <Input
                        id="customerCity"
                        type="text"
                        value={data.customerCity}
                        onChange={(e) => updateData({ customerCity: e.target.value })}
                        className="border-[#9FCAE3] focus:border-[#044D8E]"
                        placeholder="Gent"
                        required
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="customerNotes" className="text-[#044D8E] font-semibold">
                    Opmerkingen (optioneel)
                </Label>
                <Textarea
                    id="customerNotes"
                    value={data.customerNotes}
                    onChange={(e) => updateData({ customerNotes: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E] min-h-[100px]"
                    placeholder="Eventuele extra informatie of speciale verzoeken..."
                />
            </div>

            <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-[#044D8E] hover:bg-[#0F61AC] disabled:opacity-50 text-lg py-6"
            >
                {isSubmitting ? "Bezig met bevestigen..." : "Bevestig jouw afspraak"}
            </Button>

            <p className="text-xs text-center text-[#0F61AC]">
                Door te bevestigen ga je akkoord met onze voorwaarden en privacybeleid
            </p>
        </form>
    );
}
