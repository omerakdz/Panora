import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Clock, Award, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#9FCAE3]/20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white py-20 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'url(/images/panora-logo.png)',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '60px 60px',
                        backgroundPosition: 'center'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Over PANORA
                        </h1>
                        <p className="text-xl text-white/90">
                            Moderne ramenwas voor de 21e eeuw
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#044D8E] mb-4">
                            Wij zijn PANORA
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            PANORA is een <strong>moderne ramenwasdienst</strong> die snelheid, transparantie en
                            digitale service centraal zet. We geloven dat je niet eindeloos hoeft te bellen,
                            mailen of wachten op een offerte. Bij ons <strong>bereken je je prijs online</strong>,
                            <strong>kies je zelf je tijdslot</strong>, en ontvang je direct een bevestiging.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#044D8E]">
                                    <Sparkles className="w-6 h-6" />
                                    Onze Missie
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Streepvrije ramen én een streeploos proces. We maken professionele ramenwas
                                    toegankelijk, transparant en moeiteloos voor iedereen in Gent en omstreken.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#044D8E]">
                                    <Award className="w-6 h-6" />
                                    Onze Belofte
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Kwaliteit zonder verrassingen. Je weet vooraf exact wat je betaalt, wanneer we
                                    komen, en wat je krijgt. Altijd helder, altijd professioneel.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Choose PANORA */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                            Waarom PANORA?
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="border-[#1792D0] border-2">
                                <CardHeader>
                                    <CheckCircle2 className="w-12 h-12 text-[#1792D0] mb-2" />
                                    <CardTitle className="text-lg">100% Transparant</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Geen verborgen kosten, geen verrassingen. Je ziet vooraf exact wat je betaalt.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-[#1792D0] border-2">
                                <CardHeader>
                                    <Clock className="w-12 h-12 text-[#1792D0] mb-2" />
                                    <CardTitle className="text-lg">Digitaal & Snel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Boek je afspraak online in minder dan 1 minuut. Direct bevestigd, direct geregeld.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-[#1792D0] border-2">
                                <CardHeader>
                                    <Sparkles className="w-12 h-12 text-[#1792D0] mb-2" />
                                    <CardTitle className="text-lg">Premium Kwaliteit</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Osmose-techniek voor streepvrije ramen. Professioneel materiaal en vakmanschap.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                        Onze Werkwijze
                    </h2>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-[#044D8E]">Osmose-techniek</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    We werken met gezuiverd water via osmose. Dit betekent <strong>geen chemicaliën</strong>,
                                    <strong>geen strepen</strong>, en een <strong>langer streeploos resultaat</strong>.
                                    Je ramen drogen vanzelf op en blijven langer schoon.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-[#044D8E]">Foto's na afloop</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Na elke klus ontvang je <strong>foto's van het resultaat</strong> samen met je
                                    factuur. Zo zie je direct wat er gedaan is, ook als je er zelf niet bij was.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white py-16 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'url(/images/panora-logo.png)',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '60px 60px',
                        backgroundPosition: 'center'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Users className="w-16 h-16 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">
                            Een Modern Team
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Ons team bestaat uit ervaren professionals die begrijpen dat ramenwassen
                            meer is dan alleen poetsen. Het gaat om <strong>betrouwbaarheid</strong>,
                            <strong>communicatie</strong> en <strong>kwaliteit leveren</strong> waar je
                            op kan rekenen.
                        </p>
                        <p className="text-white/80">
                            We bedienen Gent en de randgemeenten met trots.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-gradient-to-br from-[#9FCAE3] to-white border-[#1792D0] border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-[#044D8E]">
                                Klaar om PANORA te ervaren?
                            </CardTitle>
                            <CardDescription className="text-center text-lg">
                                Bereken je prijs en plan je afspraak in minder dan 1 minuut
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-[#044D8E] to-[#1792D0]"
                            >
                                <Link href="/#calculator">
                                    Bereken jouw prijs
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-[#044D8E] text-[#044D8E] hover:bg-[#044D8E] hover:text-white"
                            >
                                <Link href="/contact">
                                    Neem contact op
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
