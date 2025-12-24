"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Calendar, Clock, Home, Euro, Mail, Phone, MapPin } from "lucide-react";
import { getPropertyTypeLabel } from "@/lib/constants";
import { BookingDetails } from "@/types";

// Force dynamic rendering - deze page gebruikt sessionStorage
export const dynamic = 'force-dynamic';

export default function ConfirmationPage() {
    const searchParams = useSearchParams();
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

    useEffect(() => {
        const details = sessionStorage.getItem("bookingDetails");
        if (details) {
            setBookingDetails(JSON.parse(details));
            sessionStorage.removeItem("bookingDetails");
        }
    }, []);

    if (!bookingDetails) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-[#9FCAE3]/10 to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-[#0F61AC] text-lg">Geen boekingsgegevens gevonden...</p>
                        <Button asChild className="mt-6 bg-[#044D8E] hover:bg-[#0F61AC]">
                            <Link href="/">Terug naar home</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("nl-BE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getServiceType = () => {
        if (bookingDetails.interiorExteriorWindows > 0 && bookingDetails.exteriorWindows > 0) {
            return "Binnen & Buiten Premium (gemengd)";
        } else if (bookingDetails.interiorExteriorWindows > 0) {
            return "Binnen & Buiten Premium";
        } else {
            return "Buiten Ramenwassen";
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#9FCAE3]/10 to-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-[#044D8E] mb-4">
                            Ontvangen! Jij staat ingepland.
                        </h1>
                        <p className="text-lg text-[#0F61AC]">
                            Je afspraak is bevestigd. We hebben een bevestigingsmail gestuurd naar{" "}
                            <span className="font-semibold">{bookingDetails.customerEmail}</span>
                        </p>
                    </div>

                    {/* Booking Summary Card */}
                    <Card className="mb-6 border-[#9FCAE3] shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white">
                            <CardTitle className="text-2xl">Jouw Afspraak</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Date & Time */}
                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <Calendar className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Datum</p>
                                    <p className="text-[#0F61AC] text-lg capitalize">
                                        {formatDate(bookingDetails.selectedDate)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <Clock className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Tijdstip</p>
                                    <p className="text-[#0F61AC] text-lg">{bookingDetails.selectedTime}</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <MapPin className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Adres</p>
                                    <p className="text-[#0F61AC] text-lg">{bookingDetails.customerAddress}</p>
                                </div>
                            </div>

                            {/* Service Type */}
                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <Home className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Type Woning</p>
                                    <p className="text-[#0F61AC] text-lg">
                                        {getPropertyTypeLabel(bookingDetails.propertyType)}
                                    </p>
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="bg-[#9FCAE3]/10 rounded-lg p-4 space-y-2">
                                <p className="font-semibold text-[#044D8E] text-lg mb-3">Service Details</p>
                                <div className="space-y-2 text-[#0F61AC]">
                                    <p>• {getServiceType()}</p>
                                    <p>• Totaal aantal ramen: {bookingDetails.totalWindows}</p>
                                    {bookingDetails.exteriorWindows > 0 && (
                                        <p>• Alleen buiten: {bookingDetails.exteriorWindows} ramen</p>
                                    )}
                                    {bookingDetails.interiorExteriorWindows > 0 && (
                                        <p>• Binnen & buiten: {bookingDetails.interiorExteriorWindows} ramen</p>
                                    )}
                                    {bookingDetails.hardToReach && <p>• Moeilijk bereikbaar (+15%)</p>}
                                    {bookingDetails.firstTimeInLong && <p>• Eerste keer in lange tijd (+€20)</p>}
                                    {bookingDetails.cleanFrames && <p>• Kozijnen reinigen (+€25)</p>}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between bg-gradient-to-r from-[#044D8E]/5 to-[#1792D0]/5 rounded-lg p-6 mt-6">
                                <div className="flex items-center gap-3">
                                    <Euro className="w-8 h-8 text-[#1792D0]" />
                                    <div>
                                        <p className="text-sm text-[#0F61AC] mb-1">Richtprijs (incl. BTW)</p>
                                        <p className="text-xs text-[#0F61AC]/70">
                                            Exacte prijs wordt bevestigd na inspectie
                                        </p>
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-[#044D8E]">
                                    €{bookingDetails.calculatedPrice.toFixed(2)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information Card */}
                    <Card className="mb-8 border-[#9FCAE3]">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-[#044D8E] text-lg mb-4">Jouw Gegevens</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-[#0F61AC]">
                                    <Mail className="w-5 h-5 text-[#1792D0]" />
                                    <span>{bookingDetails.customerEmail}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#0F61AC]">
                                    <Phone className="w-5 h-5 text-[#1792D0]" />
                                    <span>{bookingDetails.customerPhone}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* What's Next */}
                    <Card className="mb-8 bg-gradient-to-br from-[#9FCAE3]/20 to-white border-[#1792D0]">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-[#044D8E] text-xl mb-4">Wat gebeurt er nu?</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#1792D0] text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#044D8E]">Bevestigingsmail ontvangen</p>
                                        <p className="text-sm text-[#0F61AC]">
                                            Check je inbox voor alle details van je afspraak
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#1792D0] text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#044D8E]">Wij komen langs</p>
                                        <p className="text-sm text-[#0F61AC]">
                                            Op {formatDate(bookingDetails.selectedDate)} om {bookingDetails.selectedTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#1792D0] text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#044D8E]">Je ontvangt foto's + factuur</p>
                                        <p className="text-sm text-[#0F61AC]">
                                            Na de klus ontvang je direct foto's van het resultaat en de factuur
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-[#044D8E] hover:bg-[#0F61AC]">
                            <Link href="/">Terug naar home</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-[#044D8E] text-[#044D8E] hover:bg-[#9FCAE3]/20"
                        >
                            <Link href="/contact">Vragen? Contacteer ons</Link>
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-[#0F61AC]">
                            Wijziging nodig?{" "}
                            <Link href="/contact" className="text-[#1792D0] hover:underline font-semibold">
                                Laat het ons weten
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
