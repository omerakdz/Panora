"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SERVICE_TYPES } from "@/lib/constants";
import { motion } from "motion/react";
import { Droplets, Sparkles, CalendarClock, Check } from "lucide-react";

const Services = () => {
    return (
        <section className="py-24 bg-white overflow-x-hidden">
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
                        className="group glass-card border-2 border-slate-200/50 rounded-2xl p-8 relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0 }}
                        whileHover={{
                            y: -12,
                            scale: 1.01,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }
                        }}
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitFontSmoothing: "subpixel-antialiased"
                        }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/70 transition-all duration-700 ease-out"></div>
                        <div className="relative z-10">
                            <motion.div
                                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15
                                    }
                                }}
                            >
                                <Droplets className="w-7 h-7 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2 text-[#044D8E]">{SERVICE_TYPES.exterior.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold text-[#044D8E]">{SERVICE_TYPES.exterior.priceDisplay}</span>
                                <span className="text-slate-500">/raam</span>
                            </div>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                Strakke ramen zonder strepen. Professionele osmose-techniek voor een kristalhelder resultaat.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {["Osmose-waterzuivering", "Streeploos resultaat", "Inclusief kozijnen"].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button asChild className="w-full bg-gradient-to-r from-[#044D8E] to-[#0F61AC] hover:from-[#0F61AC] hover:to-[#1792D0] shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Link href="/services/exterior">Bekijk buitenreiniging</Link>
                                </Button>
                            </motion.div>
                        </div>
                        {/* 3D glow effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out blur-xl bg-gradient-to-r from-blue-200/30 to-blue-300/30 -z-10"></div>
                    </motion.div>

                    {/* Premium Service - Featured */}
                    <motion.div
                        className="group bg-gradient-to-br from-[#044D8E] via-[#0F61AC] to-[#1792D0] rounded-2xl p-8 text-white relative shadow-2xl shadow-[#044D8E]/30 overflow-visible pt-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{
                            y: -12,
                            scale: 1.01,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }
                        }}
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitFontSmoothing: "subpixel-antialiased"
                        }}
                    >
                        <motion.div
                            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-900 px-5 py-1.5 rounded-full text-xs font-bold shadow-xl z-20"
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            ⭐ MEEST GEKOZEN
                        </motion.div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <motion.div
                                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15
                                    }
                                }}
                            >
                                <Sparkles className="w-7 h-7 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2">{SERVICE_TYPES.premium.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-bold">{SERVICE_TYPES.premium.priceDisplay}</span>
                                <span className="text-white/70">/raam</span>
                            </div>
                            <p className="text-white/90 mb-6 text-sm leading-relaxed">
                                Complete behandeling binnen én buiten voor het ultieme resultaat en maximaal lichtinval.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {["Binnen & buiten reiniging", "Vensterbanken schoonmaken", "Raamlijsten afgewerkt", "Perfecte afwerking"].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-white/95">
                                        <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-slate-900" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className="w-full bg-white text-[#044D8E] hover:bg-white/95 hover:scale-[1.02] font-semibold shadow-xl transition-all duration-300">
                                <Link href="/services/premium">Bekijk premium pakket</Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Subscription Service */}
                    <motion.div
                        className="group glass-card border-2 border-slate-200 rounded-2xl p-8 relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{
                            y: -12,
                            scale: 1.01,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }
                        }}
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitFontSmoothing: "subpixel-antialiased"
                        }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl group-hover:bg-emerald-200/50 transition-all duration-700 ease-out"></div>
                        <div className="relative z-10">
                            <motion.div
                                className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15
                                    }
                                }}
                            >
                                <CalendarClock className="w-7 h-7 text-white" />
                            </motion.div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold text-[#044D8E]">{SERVICE_TYPES.subscription.name}</h3>
                            </div>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-3xl font-bold text-[#044D8E]">€—</span>
                                <span className="text-slate-500">/maand</span>
                            </div>
                            <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-emerald-200">
                                💚 10% vaste korting
                            </div>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                Maandelijks, tweemaandelijks of per kwartaal. Altijd schone ramen zonder zorgen.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {["Flexibele frequentie", "10% korting altijd", "Vaste afspraak"].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button asChild variant="outline" className="w-full border-2 border-[#044D8E] text-[#044D8E] hover:bg-[#044D8E] hover:text-white shadow-md hover:shadow-lg transition-all duration-300">
                                <Link href="/services/subscription">Bekijk abonnementen</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Services;
