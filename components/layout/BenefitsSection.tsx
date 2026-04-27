"use client";

import Image from "next/image";
import { CheckCircle2, Clock, Droplets, FileCheck, Sparkles, Shield } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const BenefitsSection = () => {
    const shouldReduceMotion = useReducedMotion();

    const benefits = [
        {
            icon: CheckCircle2,
            title: "Transparante prijs",
            desc: "Weet vooraf precies wat je betaalt",
            color: "bg-emerald-50 text-emerald-600"
        },
        {
            icon: Clock,
            title: "Snel ingepland",
            desc: "Binnen 48 uur beschikbaar",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Droplets,
            title: "Osmose-techniek",
            desc: "Gedemineraliseerd water voor perfecte resultaten",
            color: "bg-cyan-50 text-cyan-600"
        },
        {
            icon: Shield,
            title: "Volledig verzekerd",
            desc: "Beschermd tegen eventuele schade",
            color: "bg-violet-50 text-violet-600"
        },
        {
            icon: Sparkles,
            title: "Streeploos resultaat",
            desc: "Gegarandeerde perfecte afwerking",
            color: "bg-amber-50 text-amber-600"
        }
    ];

    return (
        <section className="py-20 bg-white border-y border-slate-100 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <div
                    className="text-center mb-12"
                    style={{
                        opacity: 0,
                        animation: shouldReduceMotion ? 'none' : 'fadeInUp 0.5s ease-out forwards'
                    }}
                >
                    <div className="mx-auto relative w-20 h-20">
                        <Image src="/images/panora-logo.png" alt="PANORA Logo" width={80} height={80} quality={90} className="object-contain" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#044D8E] mb-3">
                        Waarom kiezen voor PANORA?
                    </h2>
                    <p className="text-slate-600">Professionele service waar u op kunt rekenen</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 overflow-visible">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        const borderColors = [
                            'border-2 border-emerald-200',
                            'border-2 border-blue-200',
                            'border-2 border-cyan-200',
                            'border-2 border-violet-200',
                            'border-2 border-amber-200'
                        ];
                        const isLastItem = index === benefits.length - 1;
                        return (
                            <motion.div
                                key={benefit.title}
                                className={`group glass-card ${borderColors[index]} rounded-2xl p-6 overflow-hidden ${isLastItem ? 'col-span-2 md:col-span-1 mx-auto w-full max-w-[calc(50%-0.5rem)] md:max-w-none' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.01,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
                                    transition: { type: "spring", stiffness: 300, damping: 20 }
                                }}
                                style={{
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                                <div
                                    className={`relative z-10 w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-transform duration-150 hover:scale-110 hover:rotate-3`}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#044D8E] mb-2 text-base">{benefit.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
                                </div>
                                {/* 3D glow effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br from-blue-100/50 to-transparent -z-10"></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection;
