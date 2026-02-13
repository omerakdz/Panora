"use client";

import { CheckCircle2, Clock, Droplets, FileCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const BenefitsSection = () => {
    const benefits = [
        {
            icon: CheckCircle2,
            title: "Transparante prijs",
            desc: "Direct duidelijkheid"
        },
        {
            icon: Clock,
            title: "Snelle beschikbaarheid",
            desc: "Snel ingepland"
        },
        {
            icon: Droplets,
            title: "Osmose-techniek",
            desc: "Streeploos resultaat"
        },
        {
            icon: FileCheck,
            title: "Digitale bevestiging",
            desc: "Alles digitaal"
        },
        {
            icon: Sparkles,
            title: "Streeploos resultaat",
            desc: "Perfecte afwerking",
            span: "col-span-2 md:col-span-1"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={benefit.title}
                                className={`flex flex-col items-center text-center ${benefit.span || ""}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-16 h-16 bg-[#9FCAE3]/20 rounded-full flex items-center justify-center mb-4">
                                    <Icon className="w-8 h-8 text-[#044D8E]" />
                                </div>
                                <h3 className="font-semibold text-[#044D8E] mb-2">{benefit.title}</h3>
                                <p className="text-sm text-[#0F61AC]">{benefit.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection;