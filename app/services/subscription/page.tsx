import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Percent, TrendingDown, Clock } from "lucide-react";
import Link from "next/link";

export default function SubscriptionServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#9FCAE3]/20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Abonnementen
                        </h1>
                        <p className="text-xl text-white/90 mb-6">
                            Altijd schone ramen, zonder zorgen
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                            <p className="text-2xl font-bold">
                                Korting voor vaste klanten
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                        Waarom een abonnement?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Percent className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Korting</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Vaste klanten krijgen <strong>korting</strong> op de standaard prijzen.
                                    Hoe vaker, hoe voordeliger.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Clock className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Zorgeloos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Wij <strong>plannen automatisch</strong> je volgende afspraak. Jij hoeft er niet
                                    meer aan te denken.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <TrendingDown className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Minder vuil</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Regelmatig onderhoud betekent <strong>minder opgehoopt vuil</strong> en een
                                    sneller resultaat.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Subscription Plans */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                            Kies je formule
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Monthly */}
                            <Card className="border-[#1792D0] border-2">
                                <CardHeader className="bg-gradient-to-r from-[#9FCAE3] to-white">
                                    <CardTitle className="text-[#044D8E] text-xl">1x per maand</CardTitle>
                                    <CardDescription className="text-lg font-semibold text-[#044D8E]">
                                        ~10% korting
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Ideaal voor:</strong> Drukke straten, locaties met veel vuil of
                                        wie perfect onderhouden ramen wil.
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Elke maand schone ramen</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Vaste dag/tijdstip</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Hoogste korting</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Bi-Monthly - Most Popular */}
                            <Card className="border-[#1792D0] border-4 shadow-xl relative">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white px-4 py-1 rounded-full text-sm font-bold">
                                    Meest gekozen
                                </div>
                                <CardHeader className="bg-gradient-to-r from-[#1792D0] to-[#9FCAE3] pt-8">
                                    <CardTitle className="text-white text-xl">1x per 2 maanden</CardTitle>
                                    <CardDescription className="text-lg font-semibold text-white">
                                        ~7% korting
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Ideaal voor:</strong> De meeste woningen. Balans tussen fris onderhoud
                                        en betaalbare regelmaat.
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Om de 2 maanden</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Perfect ritme</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Goede korting</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Quarterly */}
                            <Card className="border-[#1792D0] border-2">
                                <CardHeader className="bg-gradient-to-r from-[#9FCAE3] to-white">
                                    <CardTitle className="text-[#044D8E] text-xl">1x per kwartaal</CardTitle>
                                    <CardDescription className="text-lg font-semibold text-[#044D8E]">
                                        ~5% korting
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Ideaal voor:</strong> Rustige locaties of wie minder frequent onderhoud
                                        nodig heeft maar toch wil besparen.
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>4x per jaar</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Seizoensonderhoud</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Basiskorting</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                        Zo werkt het
                    </h2>

                    <div className="space-y-4">
                        <Card>
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Kies je formule</h3>
                                    <p className="text-gray-700">
                                        Gebruik de calculator om je prijs te berekenen en kies of je maandelijks,
                                        tweemaandelijks of per kwartaal wil.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Plan je eerste afspraak</h3>
                                    <p className="text-gray-700">
                                        Kies een datum en tijdstip voor de eerste reiniging. Wij bevestigen direct.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Automatische planning</h3>
                                    <p className="text-gray-700">
                                        Wij plannen elke volgende afspraak automatisch in volgens je gekozen frequentie.
                                        Je krijgt vooraf altijd een herinnering.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Flexibel aanpassen</h3>
                                    <p className="text-gray-700">
                                        Vakantie? Geen probleem. Je kan altijd een afspraak verzetten of annuleren.
                                        Opzeggen kan ook, zonder verplichtingen.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                            Veelgestelde vragen
                        </h2>

                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Moet ik me voor lange tijd vastleggen?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Nee. Er is geen minimale periode. Je kan je abonnement altijd stopzetten zonder
                                    extra kosten of boetes.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Hoe betaal ik?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Na elke reiniging ontvang je een factuur die je eenvoudig digitaal betaalt. Geen
                                    automatische incasso's of vooruitbetalingen.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Kan ik een afspraak verzetten?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Ja, dat kan. Neem even contact met ons op en we plannen een nieuwe datum. We
                                    proberen zo flexibel mogelijk te zijn.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Is de korting direct zichtbaar?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Ja. In de calculator zie je meteen de korting wanneer je een abonnement kiest.
                                    De verminderde prijs staat op je bevestiging.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Wat als ik eenmalig over wil slaan?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Geen probleem. We schuiven gewoon een periode door. Je abonnement blijft actief
                                    en je korting blijft behouden.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-gradient-to-br from-[#9FCAE3] to-white border-[#1792D0] border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-[#044D8E]">
                                Vind jouw ideale vaste formule
                            </CardTitle>
                            <CardDescription className="text-center text-lg">
                                Bereken je prijs met abonnementskorting en plan je eerste afspraak
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-lg px-8"
                            >
                                <Link href="/#calculator">
                                    Bereken nu jouw prijs →
                                </Link>
                            </Button>
                            <p className="text-sm text-gray-500 mt-4">
                                Geen verplichtingen • Altijd opzegbaar • Flexibel aanpasbaar
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
