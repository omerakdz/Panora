import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { SERVICE_TYPES } from "@/lib/constants";


const Services = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#9FCAE3]/10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                    Onze diensten
                </h2>
                <p className="text-center text-[#0F61AC] mb-12 max-w-2xl mx-auto">
                    Kies de service die perfect bij jou past
                </p>
                <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                    <Card className="border-[#9FCAE3] hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-3 text-[#044D8E]">{SERVICE_TYPES.exterior.name}</h3>
                            <p className="text-3xl font-bold text-[#1792D0] mb-4">Vanaf {SERVICE_TYPES.exterior.priceDisplay}<span className="text-sm font-normal text-[#0F61AC]">/raam</span></p>
                            <p className="text-[#0F61AC] mb-6">
                                Strakke ramen zonder strepen. Osmose-techniek, professioneel resultaat.
                            </p>
                            <Button asChild className="w-full bg-[#044D8E] hover:bg-[#0F61AC]">
                                <Link href="/services/exterior">Zie direct jouw prijs voor buitenramen</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="border-[#1792D0] border-2 hover:shadow-xl transition-shadow relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1792D0] text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Populair
                        </div>
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-3 text-[#044D8E]">{SERVICE_TYPES.premium.name}</h3>
                            <p className="text-3xl font-bold text-[#1792D0] mb-4">Vanaf {SERVICE_TYPES.premium.priceDisplay}<span className="text-sm font-normal text-[#0F61AC]">/raam</span></p>
                            <p className="text-[#0F61AC] mb-6">
                                Volledige behandeling binnen & buiten. Complete service voor het beste resultaat.
                            </p>
                            <Button asChild className="w-full bg-[#1792D0] hover:bg-[#0F61AC]">
                                <Link href="/services/premium">Bereken jouw premium pakket-prijs</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="border-[#9FCAE3] hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-3 text-[#044D8E]">{SERVICE_TYPES.subscription.name}</h3>
                            <p className="text-3xl font-bold text-[#1792D0] mb-4">Vanaf €—<span className="text-sm font-normal text-[#0F61AC]">/maand</span></p>
                            <div className="bg-[#9FCAE3]/20 border border-[#1792D0] rounded-lg px-4 py-2 mb-4">
                                <p className="text-[#044D8E] font-semibold text-sm">🎉 10% korting op je vaste prijs</p>
                            </div>
                            <p className="text-[#0F61AC] mb-6">
                                1x/maand, 1x/2 maanden of 1x/kwartaal. Geniet als vaste klant van 10% korting.
                            </p>
                            <Button asChild variant="outline" className="w-full border-[#044D8E] text-[#044D8E] hover:bg-[#9FCAE3]/20">
                                <Link href="/services/subscription">Vind jouw ideale vaste formule</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Services;