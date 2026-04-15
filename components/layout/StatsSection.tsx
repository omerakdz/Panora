"use client";

import { Users, Star, Calendar, Award } from "lucide-react";
import { motion } from "motion/react";
import StatCounter from "./StatCounter";

export default function StatsSection() {
    const stats = [
        {
            end: 500,
            suffix: "+",
            label: "Tevreden klanten",
            icon: <Users className="w-8 h-8 text-white" />
        },
        {
            end: 4.9,
            suffix: "/5",
            label: "Gemiddelde beoordeling",
            icon: <Star className="w-8 h-8 text-white" />
        },
        {
            end: 1500,
            suffix: "+",
            label: "Ramen schoongemaakt",
            icon: <Calendar className="w-8 h-8 text-white" />
        },
        {
            end: 100,
            suffix: "%",
            label: "Tevredenheid",
            icon: <Award className="w-8 h-8 text-white" />
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Parallax background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(23, 146, 208, 0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block bg-gradient-to-r from-[#1792D0] to-[#044D8E] text-white text-sm font-semibold px-6 py-2 rounded-full mb-4 shadow-lg">
                        Onze Prestaties
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#044D8E] to-[#1792D0] bg-clip-text text-transparent mb-4">
                        Vertrouwd door honderden klanten
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Een bewezen trackrecord van excellente service en tevreden klanten in Gent
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            end={stat.end}
                            suffix={stat.suffix}
                            label={stat.label}
                            icon={stat.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative elements with parallax */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#1792D0]/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#044D8E]/10 rounded-full blur-3xl" style={{ animationDelay: "1s" }}></div>
        </section>
    );
}
