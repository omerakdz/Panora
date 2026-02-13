"use client";

import { motion } from "motion/react";

const HowItWorks = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                        Hoe het werkt
                    </h2>
                    <p className="text-center text-[#0F61AC] mb-12 max-w-2xl mx-auto">
                        In vier eenvoudige stappen tot schone ramen
                    </p>
                </motion.div>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            num: 1,
                            bg: "bg-[#044D8E]",
                            title: "Bereken je prijs",
                            desc: "Vul de calculator in en zie direct je richtprijs"
                        },
                        {
                            num: 2,
                            bg: "bg-[#0F61AC]",
                            title: "Kies datum & tijd",
                            desc: "Selecteer een beschikbaar moment in onze agenda"
                        },
                        {
                            num: 3,
                            bg: "bg-[#1792D0]",
                            title: "Wij komen langs",
                            desc: "Professionele service op de afgesproken tijd"
                        },
                        {
                            num: 4,
                            bg: "bg-[#044D8E]",
                            title: "Foto's + factuur",
                            desc: "Je ontvangt foto's van het resultaat en de factuur"
                        }
                    ].map((step, index) => (
                        <motion.div
                            key={step.num}
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={`w-20 h-20 ${step.bg} text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4`}>
                                {step.num}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-[#044D8E]">{step.title}</h3>
                            <p className="text-[#0F61AC]">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;