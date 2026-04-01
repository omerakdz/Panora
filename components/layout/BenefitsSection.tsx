"use client";

import { CheckCircle2, Clock, Droplets, FileCheck, Sparkles, Shield } from "lucide-react";
import { motion } from "motion/react";

const BenefitsSection = () => {
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
        <section className="py-20 bg-white border-y border-slate-100">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <img src="/images/panora-logo.png" alt="PANORA Logo" className="mx-auto  h-20" />
                    <h2 className="text-2xl md:text-3xl font-bold text-[#044D8E] mb-3">
                        Waarom kiezen voor PANORA?
                    </h2>
                    <p className="text-slate-600">Professionele service waar u op kunt rekenen</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
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
                                className={`group relative bg-gradient-to-br from-white to-slate-50/50 ${borderColors[index]} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden ${isLastItem ? 'col-span-2 md:col-span-1 mx-auto w-full max-w-[calc(50%-0.5rem)] md:max-w-none' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className={`relative z-10 w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-[#044D8E] mb-2 text-base">{benefit.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection;
