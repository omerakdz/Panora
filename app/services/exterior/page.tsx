import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Droplets, Sparkles, Euro } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Buitenreiniging — Panora Gent",
    description: "Professionele buitenreiniging van ramen in Gent. Osmose-techniek voor streepvrije ramen. Vanaf €2,50 per raam. Direct online boeken.",
    alternates: {
        canonical: "https://www.panora.be/services/exterior",
    },
    openGraph: {
        title: "Buitenreiniging — Panora Gent",
        description: "Professionele buitenreiniging van ramen. Osmose-techniek, vanaf €2,50 per raam. Direct online boeken in Gent.",
        url: "https://www.panora.be/services/exterior",
    },
};

export default function ExteriorServicePage() {
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
                            Buiten Glasreiniging
                        </h1>
                        <p className="text-xl text-white/90 mb-6">
                            Strakke ramen zonder strepen
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                            <p className="text-2xl font-bold">
                                Vanaf €2,50 per raam
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                        Wat krijg je?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Droplets className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Osmose-techniek</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    We gebruiken <strong>gezuiverd water via osmose</strong>. Dit betekent geen
                                    chemicaliën, geen strepen, en een streeploos resultaat dat langer mooi blijft.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Sparkles className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Streeploos droog</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Het gezuiverde water droogt <strong>vanzelf streeploos op</strong>. Geen nadrogen
                                    nodig, geen vlekken achteraf.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <CheckCircle2 className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Tot 9 meter hoogte</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Met professioneel materiaal bereiken we <strong>ramen tot 9 meter hoog</strong>.
                                    Veilig, efficiënt, zonder ladder.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Euro className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Transparante prijzen</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    <strong>Vanaf €2,50 per raam</strong>. Bereken direct je exacte prijs online,
                                    zonder verborgen kosten of verrassingen.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                            Ideaal voor
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-[#044D8E]">Appartementen</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Perfect voor buitenramen van appartementen die regelmatig onderhoud nodig hebben.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-[#044D8E]">Rijtjeshuizen</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Snel en efficiënt voor de buitenkant van rijtjeswoningen en halfopen woningen.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-[#044D8E]">Vrijstaande woningen</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Ook grote woningen met veel ramen kunnen we professioneel behandelen.
                                    </p>
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
                        Hoe het werkt
                    </h2>

                    <div className="space-y-4">
                        <Card>
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Bereken je prijs</h3>
                                    <p className="text-gray-700">
                                        Vul in hoeveel buitenramen je hebt. De calculator toont direct je richtprijs.
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
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Kies je tijdslot</h3>
                                    <p className="text-gray-700">
                                        Selecteer een datum en tijdstip dat jou het beste uitkomt. Direct bevestigd.
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
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Wij komen langs</h3>
                                    <p className="text-gray-700">
                                        Op het afgesproken moment wassen we je buitenramen professioneel en streeploos.
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
                                    <h3 className="font-bold text-lg text-[#044D8E] mb-1">Foto's & factuur</h3>
                                    <p className="text-gray-700">
                                        Je ontvangt foto's van het resultaat en je factuur digitaal. Alles geregeld.
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
                                    <CardTitle className="text-lg">Hoe werkt osmose precies?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Osmose zuivert leidingwater van alle mineralen en onzuiverheden. Dit gezuiverde
                                    water trekt vuil aan en droogt streeploos op, zonder chemicaliën of naspoelen.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Kan ik thuis blijven tijdens de reiniging?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Voor buitenramen hoef je niet thuis te zijn. We werken alleen aan de buitenkant
                                    en sturen je achteraf foto's van het resultaat.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Wat als het regent?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Lichte regen is geen probleem. Bij zware regen of storm nemen we contact op om
                                    een nieuwe afspraak te plannen.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Is de prijs definitief?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    De online calculator geeft een nauwkeurige richtprijs. De exacte prijs wordt
                                    bevestigd na een korte inspectie of via foto's.
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
                                Zie direct jouw prijs voor buitenramen
                            </CardTitle>
                            <CardDescription className="text-center text-lg">
                                Bereken je prijs en plan je afspraak in minder dan 1 minuut
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
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
