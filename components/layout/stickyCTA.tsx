"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";
import { motion } from "motion/react";

export default function StickyCTA() {
    const pathname = usePathname();

    // Don't show on confirmation page
    if (pathname === "/confirmation") {
        return null;
    }

    // Don't show on homepage (calculator is already visible)
    if (pathname === "/") {
        return null;
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-[#044D8E] via-[#0F61AC] to-[#1792D0] shadow-2xl border-t-2 border-white/10"
        >
            <div className="container mx-auto px-4 py-3">
                <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                >
                    <Button
                        asChild
                        className="w-full bg-white text-[#044D8E] hover:bg-[#9FCAE3] hover:text-white font-bold text-base py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                        size="lg"
                    >
                        <Link href="/#calculator" className="flex items-center justify-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Jouw ramen. Jouw prijs. Start hier.
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}

