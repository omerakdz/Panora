"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageCircle, MapPin, Building2 } from "lucide-react";
import { CONTACT, COMPANY } from "@/lib/constants";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    message: "",
                });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hallo PANORA! Ik heb een vraag over jullie ramenwas diensten.`
        );
        window.open(`https://wa.me/${CONTACT.whatsapp}?text=${message}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#9FCAE3]/20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Neem Contact Op
                        </h1>
                        <p className="text-xl text-white/90">
                            Vragen? We helpen je graag verder!
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Stuur ons een bericht</CardTitle>
                            <CardDescription>
                                Vul het formulier in en we nemen zo snel mogelijk contact met je op.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Naam *</Label>
                                    <Input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Je volledige naam"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="jouw@email.be"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefoon *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="0412 34 56 78"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Bericht *</Label>
                                    <Textarea
                                        id="message"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Vertel ons waar we je mee kunnen helpen..."
                                        rows={5}
                                    />
                                </div>

                                {submitStatus === "success" && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                                        ✓ Bedankt! Je bericht is verzonden. We nemen binnen 24 uur contact met je op.
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                                        ❌ Er ging iets mis. Probeer het opnieuw of bel ons direct op {CONTACT.phoneDisplay}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-[#044D8E] to-[#1792D0]"
                                    size="lg"
                                >
                                    {isSubmitting ? "Versturen..." : "Verstuur bericht"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info & WhatsApp */}
                    <div className="space-y-6">
                        {/* WhatsApp Card */}
                        <Card className="bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <MessageCircle className="w-6 h-6" />
                                    Liever direct chatten?
                                </CardTitle>
                                <CardDescription className="text-white/90">
                                    Stuur ons een WhatsApp bericht voor een snelle reactie!
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-white text-[#128C7E] hover:bg-white/90"
                                    size="lg"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Chat via WhatsApp
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Contact Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Informatie</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-[#044D8E] mt-1" />
                                    <div>
                                        <p className="font-semibold">E-mail</p>
                                        <a href={`mailto:${CONTACT.email}`} className="text-[#044D8E] hover:underline">
                                            {CONTACT.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-[#044D8E] mt-1" />
                                    <div>
                                        <p className="font-semibold">Telefoon</p>
                                        <a href={`tel:${CONTACT.phone}`} className="text-[#044D8E] hover:underline">
                                            {CONTACT.phoneDisplay}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#044D8E] mt-1" />
                                    <div>
                                        <p className="font-semibold">Werkgebied</p>
                                        <p className="text-gray-600">Gent + randgemeenten</p>
                                    </div>
                                </div>

                                {COMPANY.vatNumber && (
                                    <div className="flex items-start gap-3">
                                        <Building2 className="w-5 h-5 text-[#044D8E] mt-1" />
                                        <div>
                                            <p className="font-semibold">BTW-nummer</p>
                                            <p className="text-gray-600">{COMPANY.vatNumber}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Bereikbaarheid */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Bereikbaarheid</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    We zijn <strong>24/7 bereikbaar</strong> voor al jouw vragen. Neem gerust contact met ons op via telefoon, WhatsApp of e-mail.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
