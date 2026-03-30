"use client";

import { motion } from "motion/react";
import { Calculator, CalendarCheck, Truck, Camera } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            num: 1,
            icon: Calculator,
            title: "Bereken je prijs",
            desc: "Vul de calculator in en zie direct je richtprijs"
        },
        {
            num: 2,
            icon: CalendarCheck,
            title: "Kies datum & tijd",
            desc: "Selecteer een beschikbaar moment in onze agenda"
        },
        {
            num: 3,
            icon: Truck,
            title: "Wij komen langs",
            desc: "Professionele service op de afgesproken tijd"
        },
        {
            num: 4,
            icon: Camera,
            title: "Foto's + factuur",
            desc: "Je ontvangt foto's van het resultaat en de factuur"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-[#044D8E]/10 text-[#044D8E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        Eenvoudig proces
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#044D8E] mb-4">
                        Hoe het werkt
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        In vier eenvoudige stappen tot stralend schone ramen
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-6 relative">
                    {/* Connection line - desktop only */}
                    <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#044D8E] via-[#1792D0] to-[#044D8E]" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const borderColors = [
                            'border-2 border-[#044D8E]/30',
                            'border-2 border-[#1792D0]/40',
                            'border-2 border-[#044D8E]/40',
                            'border-2 border-[#1792D0]/50'
                        ];
                        return (
                            <motion.div
                                key={step.num}
                                className="relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <div className={`bg-white ${borderColors[index]} rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 h-full`}>
                                    {/* Step number badge */}
                                    <div className="relative mx-auto mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#044D8E] to-[#1792D0] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#044D8E]/20">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-[#1792D0] rounded-full flex items-center justify-center text-sm font-bold text-[#044D8E]">
                                            {step.num}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-[#044D8E]">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;
