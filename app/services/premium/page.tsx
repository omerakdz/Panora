import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Home, Crown } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Premium Glasreiniging — Panora",
    description: "Complete glasreiniging binnen en buiten in Gent. Premium dienst met osmose-techniek en eco-vriendelijke behandeling. Vanaf €4,50 per raam.",
    alternates: {
        canonical: "https://www.panora.be/services/premium",
    },
    openGraph: {
        title: "Premium Glasreiniging — Panora",
        description: "Volledige glasreiniging binnen en buiten. Premium kwaliteit, osmose-techniek. Vanaf €4,50 per raam in Gent.",
        url: "https://www.panora.be/services/premium",
    },
};

export default function PremiumServicePage() {
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
                        <Crown className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Complete Glasreiniging
                        </h1>
                        <p className="text-xl text-white/90 mb-6">
                            Volledige behandeling binnen & buiten
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                            <p className="text-2xl font-bold">
                                Vanaf €4,50 per raam
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                        Het complete pakket
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Home className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Binnen én buiten</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    We behandelen je ramen <strong>volledig</strong>: buitenkant met osmose-techniek
                                    én binnenkant handmatig gepoetst. Compleet streeploos resultaat.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Sparkles className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Extra aandacht</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Hoeken, randen en kozijnen krijgen <strong>extra aandacht</strong>. We zorgen
                                    dat elk detail perfect is.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <CheckCircle2 className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Premium materiaal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Microfiber doeken, gezuiverd water, professionele middelen voor binnenkant.
                                    <strong>Geen strepen, geen vlekken</strong>.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#1792D0] border-2">
                            <CardHeader>
                                <Crown className="w-12 h-12 text-[#1792D0] mb-2" />
                                <CardTitle>Totaalervaring</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    Van <strong>binnen én buiten perfect schoon</strong>. Je ramen zien eruit alsof
                                    ze nieuw zijn.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                            Buiten vs. Premium
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="bg-gray-50">
                                    <CardTitle className="text-[#044D8E]">Alleen Buiten</CardTitle>
                                    <CardDescription>Vanaf €2,50 per raam</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Buitenramen met osmose</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Streeploos droog</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Snel & efficiënt</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-400">
                                            <span className="w-5 h-5 flex-shrink-0">✗</span>
                                            <span>Geen binnenramen</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-[#1792D0] border-2 shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-[#9FCAE3] to-white">
                                    <CardTitle className="text-[#044D8E] flex items-center gap-2">
                                        <Crown className="w-5 h-5" />
                                        Premium Pakket
                                    </CardTitle>
                                    <CardDescription>Vanaf €4,50 per raam</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span><strong>Buiten én binnen</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Osmose + handmatig</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span>Extra aandacht details</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-[#1792D0] flex-shrink-0 mt-0.5" />
                                            <span><strong>Compleet schoon</strong></span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ideal For */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#044D8E] mb-12">
                        Wanneer kies je Premium?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg text-[#044D8E]">Bij verkoop of verhuur</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-700">
                                Wil je je huis verkopen of verhuren? Het Premium pakket zorgt voor een perfecte
                                eerste indruk. Binnen én buiten stralend schoon.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg text-[#044D8E]">Voor speciale gelegenheden</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-700">
                                Feest, familiebezoek of gewoon een grondige opfrisbeurt? Premium geeft je huis
                                die extra glans.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg text-[#044D8E]">Grootonderhoudsbeurt</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-700">
                                Lange tijd niet gedaan? Het Premium pakket is ideaal voor een complete reiniging
                                van al je ramen.
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg text-[#044D8E]">Voor wie het beste wil</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-700">
                                Je wilt gewoon dat je ramen er perfect uitzien, zowel van binnen als van buiten.
                                Premium is de totaaloplossing.
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
                                    <CardTitle className="text-lg">Moet ik thuis zijn?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Ja, voor het Premium pakket moet je thuis zijn zodat we toegang hebben tot de
                                    binnenkant van je ramen. We plannen een tijdstip dat jou goed uitkomt.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Hoelang duurt het?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Dat hangt af van het aantal ramen. Gemiddeld 2-4 uur voor een standaard woning.
                                    We werken efficiënt zonder concessies aan kwaliteit.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Wat moet ik voorbereiden?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Zorg dat we toegang hebben tot alle ramen. Verplaats eventueel decoraties of
                                    planten van de vensterbank. Wij doen de rest.
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Is Premium de moeite waard?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700">
                                    Absoluut! Je krijgt binnen én buiten perfecte ramen. Ideaal voor speciale
                                    momenten of als je gewoon het beste resultaat wilt.
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
                                Bereken jouw premium pakket-prijs
                            </CardTitle>
                            <CardDescription className="text-center text-lg">
                                Volledige behandeling binnen & buiten. Bereken direct je prijs.
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
