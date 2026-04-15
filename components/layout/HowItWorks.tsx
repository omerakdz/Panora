"use client";

import { motion, useReducedMotion } from "motion/react";
import { Calculator, CalendarCheck, Truck, Camera } from "lucide-react";

const HowItWorks = () => {
    const shouldReduceMotion = useReducedMotion();

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
        <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1792D0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#044D8E]/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">                <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="inline-block bg-[#044D8E]/10 text-[#044D8E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                    ✨ Eenvoudig proces
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
                            <div
                                key={step.num}
                                className="relative transition-transform duration-200 ease-out hover:md:-translate-y-2 hover:md:scale-105"
                                style={{
                                    opacity: 0,
                                    animation: shouldReduceMotion ? 'none' : `fadeInUp 0.4s ease-out ${index * 0.1}s forwards`,
                                    transform: 'translateZ(0)'
                                }}
                            >
                                <div className={`group bg-white/80 backdrop-blur-sm ${borderColors[index]} rounded-2xl p-6 text-center hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-300 h-full relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1792D0]/5 to-transparent rounded-full blur-2xl group-hover:from-[#1792D0]/10 transition-colors duration-300"></div>

                                    {/* Step number badge */}
                                    <div className="relative mx-auto mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#044D8E] to-[#1792D0] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#044D8E]/30 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                                            <Icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-[#1792D0] rounded-full flex items-center justify-center text-sm font-bold text-[#044D8E] shadow-md">
                                            {step.num}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-[#044D8E]">{step.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;
