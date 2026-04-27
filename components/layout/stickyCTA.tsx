"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyCTA() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay visibility for smoother initial page load
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Don't show on confirmation page
    if (pathname === "/confirmation") {
        return null;
    }

    // Don't show on homepage (calculator is already visible)
    if (pathname === "/") {
        return null;
    }

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-[#044D8E] via-[#0F61AC] to-[#1792D0] shadow-2xl border-t-2 border-white/10 transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="container mx-auto px-4 py-3">
                <Button
                    asChild
                    className="w-full bg-white text-[#044D8E] hover:bg-[#9FCAE3] hover:text-white font-bold text-base py-6 shadow-xl active:scale-95 transition-all duration-200"
                    size="lg"
                >
                    <Link href="/#calculator" className="flex items-center justify-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Jouw ramen. Jouw prijs. Start hier.
                    </Link>
                </Button>
            </div>
        </div>
    );
}

