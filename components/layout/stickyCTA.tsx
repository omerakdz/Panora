"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";

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
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-[#044D8E] to-[#1792D0] shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <Button
                    asChild
                    className="w-full bg-white text-[#044D8E] hover:bg-[#9FCAE3] font-bold text-base py-6 shadow-lg"
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

