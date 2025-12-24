"use client";

import { useEffect, useState } from "react";
import { CalculatorData } from "@/types";
import { Check, Loader2 } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/constants";

interface StepPriceProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepPrice({ data, updateData }: StepPriceProps) {
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        const fetchPrice = async () => {
            setIsCalculating(true);
            try {
                const response = await fetch("/api/calculate-price", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    updateData({ calculatedPrice: result.price });
                } else {
                    console.error("Failed to calculate price");
                }
            } catch (error) {
                console.error("Error calculating price:", error);
            } finally {
                setIsCalculating(false);
            }
        };

        fetchPrice();
    }, [
        data.exteriorWindows,
        data.interiorExteriorWindows,
        data.hardToReach,
        data.firstTimeInLong,
        data.cleanFrames,
    ]);

    return (
        <div className="space-y-6 text-center">
            <div className="bg-gradient-to-br from-[#044D8E] to-[#1792D0] text-white rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Jouw richtprijs</p>
                <div className="text-5xl font-bold mb-2 flex items-center justify-center gap-3">
                    {isCalculating ? (
                        <Loader2 className="w-12 h-12 animate-spin" />
                    ) : (
                        <>€{data.calculatedPrice.toFixed(2)}</>
                    )}
                </div>
                <p className="text-sm opacity-90">incl. BTW</p>
            </div>

            <div className="bg-[#9FCAE3]/10 rounded-lg p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-[#044D8E] mb-4">Samenvatting</h4>
                <div className="space-y-3 text-left">
                    {data.exteriorWindows > 0 && (
                        <div className="flex items-center gap-2 text-[#0F61AC]">
                            <Check className="w-5 h-5 text-[#1792D0]" />
                            <span>
                                {data.exteriorWindows} buitenramen ({SERVICE_TYPES.exterior.priceDisplay}/raam)
                            </span>
                        </div>
                    )}
                    {data.interiorExteriorWindows > 0 && (
                        <div className="flex items-center gap-2 text-[#0F61AC]">
                            <Check className="w-5 h-5 text-[#1792D0]" />
                            <span>
                                {data.interiorExteriorWindows} binnen + buiten ramen ({SERVICE_TYPES.premium.priceDisplay}/raam)
                            </span>
                        </div>
                    )}
                    {data.hardToReach && (
                        <div className="flex items-center gap-2 text-[#0F61AC]">
                            <Check className="w-5 h-5 text-[#1792D0]" />
                            <span>Moeilijk bereikbaar (+15%)</span>
                        </div>
                    )}
                    {data.firstTimeInLong && (
                        <div className="flex items-center gap-2 text-[#0F61AC]">
                            <Check className="w-5 h-5 text-[#1792D0]" />
                            <span>Eerste keer in lange tijd (+€20)</span>
                        </div>
                    )}
                    {data.cleanFrames && (
                        <div className="flex items-center gap-2 text-[#0F61AC]">
                            <Check className="w-5 h-5 text-[#1792D0]" />
                            <span>Kozijnen reinigen (+€25)</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                    <strong>Let op:</strong> Dit is een richtprijs. De exacte prijs wordt bevestigd
                    na inspectie ter plaatse.
                </p>
            </div>
        </div>
    );
}
