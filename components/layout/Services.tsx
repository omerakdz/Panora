"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SERVICE_TYPES } from "@/lib/constants";
import { motion } from "motion/react";
import { Droplets, Sparkles, CalendarClock, Check } from "lucide-react";

const Services = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block bg-[#1792D0]/10 text-[#1792D0] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        Onze Diensten
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#044D8E] mb-4">
                        Kies de service die bij u past
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Van eenmalige reiniging tot regelmatig onderhoud - wij hebben een oplossing voor elk budget
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                    {/* Exterior Service */}
                    <motion.div
                        className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                            <Droplets className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#044D8E]">{SERVICE_TYPES.exterior.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-[#044D8E]">Vanaf {SERVICE_TYPES.exterior.priceDisplay}</span>
                            <span className="text-slate-500">/raam</span>
                        </div>
                        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                            Strakke ramen zonder strepen. Professionele osmose-techniek voor een kristalhelder resultaat.
                        </p>
                        <ul className="space-y-2 mb-6">
                            {["Osmose-waterzuivering", "Streeploos resultaat", "Inclusief kozijnen"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button asChild className="w-full bg-[#044D8E] hover:bg-[#0F61AC]">
                            <Link href="/services/exterior">Bekijk buitenreiniging</Link>
                        </Button>
                    </motion.div>

                    {/* Premium Service - Featured */}
                    <motion.div
                        className="bg-gradient-to-b from-[#044D8E] to-[#0F61AC] rounded-2xl p-8 text-white relative shadow-xl shadow-[#044D8E]/20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                            MEEST GEKOZEN
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{SERVICE_TYPES.premium.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold">Vanaf {SERVICE_TYPES.premium.priceDisplay}</span>
                            <span className="text-white/70">/raam</span>
                        </div>
                        <p className="text-white/80 mb-6 text-sm leading-relaxed">
                            Complete behandeling binnen én buiten voor het ultieme resultaat en maximaal lichtinval.
                        </p>
                        <ul className="space-y-2 mb-6">
                            {["Binnen & buiten reiniging", "Vensterbanken schoonmaken", "Raamlijsten afgewerkt", "Perfecte afwerking"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button asChild className="w-full bg-white text-[#044D8E] hover:bg-slate-100 font-semibold">
                            <Link href="/services/premium">Bekijk premium pakket</Link>
                        </Button>
                    </motion.div>

                    {/* Subscription Service */}
                    <motion.div
                        className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                            <CalendarClock className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-[#044D8E]">{SERVICE_TYPES.subscription.name}</h3>
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-3xl font-bold text-[#044D8E]">Vanaf €—</span>
                            <span className="text-slate-500">/maand</span>
                        </div>
                        <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            10% vaste korting
                        </div>
                        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                            Maandelijks, tweemaandelijks of per kwartaal. Altijd schone ramen zonder zorgen.
                        </p>
                        <ul className="space-y-2 mb-6">
                            {["Flexibele frequentie", "10% korting altijd", "Vaste afspraak"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button asChild variant="outline" className="w-full border-[#044D8E] text-[#044D8E] hover:bg-slate-50">
                            <Link href="/services/subscription">Bekijk abonnementen</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Services;
