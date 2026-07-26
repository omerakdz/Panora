"use client";

import { CalculatorData } from "@/types";
import { Loader2 } from "lucide-react";

interface PriceCardProps {
    price: number;
    propertyType: CalculatorData["propertyType"];
}

const PriceCard = ({ price, propertyType }: PriceCardProps) => {
    return (
        <>
            <div className="bg-gradient-to-br from-[#044D8E] to-[#1792D0] text-white rounded-xl md:rounded-2xl p-4 md:p-8 max-w-md mx-auto">
                <p className="text-xs uppercase tracking-wide mb-1 md:mb-2 opacity-90">Jouw richtprijs</p>
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 flex items-center justify-center gap-2 md:gap-3">
                    <>€{price.toFixed(2)}</>
                </div>
                <p className="text-xs md:text-sm opacity-90">
                    {propertyType === "kantoor" ? "excl. BTW" : "incl. BTW"}
                </p>
            </div>
        </>
    )
}

export default PriceCard;