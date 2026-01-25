"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Calendar, Clock, Home, Euro, Mail, Phone, MapPin } from "lucide-react";
import { getPropertyTypeLabel } from "@/lib/constants";
import { BookingDetails } from "@/types";

export default function ConfirmationContent() {
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
            return "Complete Glasreiniging (gemengd)";
        } else if (bookingDetails.interiorExteriorWindows > 0) {
            return "Complete Glasreiniging";
        } else {
            return "Buiten Glasreiniging";
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

                            {/* Service Details */}
                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <Home className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Woningtype</p>
                                    <p className="text-[#0F61AC]">{getPropertyTypeLabel(bookingDetails.propertyType)}</p>
                                </div>
                            </div>

                            <div className="pb-4 border-b border-[#9FCAE3]/30">
                                <p className="font-semibold text-[#044D8E] mb-3">Service Details</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[#0F61AC]">
                                        <span>Type:</span>
                                        <span className="font-semibold">{getServiceType()}</span>
                                    </div>
                                    {bookingDetails.interiorExteriorWindows > 0 && (
                                        <div className="flex justify-between text-[#0F61AC]">
                                            <span>Binnen & Buiten ramen:</span>
                                            <span className="font-semibold">{bookingDetails.interiorExteriorWindows}</span>
                                        </div>
                                    )}
                                    {bookingDetails.exteriorWindows > 0 && (
                                        <div className="flex justify-between text-[#0F61AC]">
                                            <span>Alleen buiten ramen:</span>
                                            <span className="font-semibold">{bookingDetails.exteriorWindows}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <Euro className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Prijs</p>
                                    <p className="text-2xl font-bold text-[#1792D0]">€{bookingDetails.calculatedPrice}</p>
                                    <p className="text-sm text-[#0F61AC] mt-1">Betaling na afloop via overschrijving</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4 pb-4 border-b border-[#9FCAE3]/30">
                                <MapPin className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-1">Adres</p>
                                    <p className="text-[#0F61AC]">
                                        {bookingDetails.customerAddress}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-[#1792D0] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-[#044D8E] mb-2">Jouw gegevens</p>
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
