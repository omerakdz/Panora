"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

interface StatCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon: React.ReactNode;
}

export default function StatCounter({
    end,
    duration = 2,
    suffix = "",
    prefix = "",
    label,
    icon
}: StatCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100
    });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(end);
        }
    }, [isInView, end, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return unsubscribe;
    }, [springValue]);

    return (
        <motion.div
            ref={ref}
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
        >
            {/* Glassmorphism card */}
            <div className="glass-card p-8 text-center rounded-3xl hover:glass-card-hover transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1792D0]/10 via-transparent to-[#044D8E]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon with 3D effect */}
                <motion.div
                    className="relative z-10 mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1792D0] to-[#044D8E] shadow-lg"
                    whileHover={{
                        rotateY: 15,
                        rotateX: 15,
                        scale: 1.1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {icon}
                </motion.div>

                {/* Counter */}
                <div className="relative z-10">
                    <motion.div
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#044D8E] to-[#1792D0] bg-clip-text text-transparent mb-2"
                        animate={isInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {prefix}{displayValue}{suffix}
                    </motion.div>
                    <p className="text-slate-600 font-medium">{label}</p>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-[#1792D0]/20 to-[#044D8E]/20 -z-10"></div>
            </div>
        </motion.div>
    );
}
