"use client";

import { CalculatorData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                // Save booking details to sessionStorage
                const bookingDetails = {
                    customerName: data.customerName,
                    customerEmail: data.customerEmail,
                    customerPhone: data.customerPhone,
                    customerAddress: data.customerAddress,
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
                alert("Er is iets misgegaan. Probeer het opnieuw.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("Er is een fout opgetreden. Probeer het later opnieuw.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid =
        data.customerName &&
        data.customerPhone &&
        data.customerEmail &&
        data.customerAddress;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <p className="text-center text-[#0F61AC] mb-6">
                Vul je gegevens in om de afspraak te bevestigen
            </p>

            <div>
                <Label htmlFor="customerName" className="text-[#044D8E] font-semibold">
                    Volledige naam *
                </Label>
                <Input
                    id="customerName"
                    type="text"
                    value={data.customerName}
                    onChange={(e) => updateData({ customerName: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E]"
                    placeholder="Jan Janssens"
                    required
                />
            </div>

            <div>
                <Label htmlFor="customerPhone" className="text-[#044D8E] font-semibold">
                    Telefoonnummer *
                </Label>
                <Input
                    id="customerPhone"
                    type="tel"
                    value={data.customerPhone}
                    onChange={(e) => updateData({ customerPhone: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E]"
                    placeholder="+32 123 45 67 89"
                    required
                />
            </div>

            <div>
                <Label htmlFor="customerEmail" className="text-[#044D8E] font-semibold">
                    E-mailadres *
                </Label>
                <Input
                    id="customerEmail"
                    type="email"
                    value={data.customerEmail}
                    onChange={(e) => updateData({ customerEmail: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E]"
                    placeholder="jan@voorbeeld.be"
                    required
                />
            </div>

            <div>
                <Label htmlFor="customerAddress" className="text-[#044D8E] font-semibold">
                    Adres *
                </Label>
                <Input
                    id="customerAddress"
                    type="text"
                    value={data.customerAddress}
                    onChange={(e) => updateData({ customerAddress: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E]"
                    placeholder="Straatnaam 123, 9000 Gent"
                    required
                />
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
