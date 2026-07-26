"use client";

import { CalculatorData } from "@/types";
import { Check } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/constants";
interface PriceSummaryProps {
    data: CalculatorData;
}

const PriceSummary = ({ data }: PriceSummaryProps) => {
    return (
        <>
            <div className="bg-[#9FCAE3]/10 rounded-lg p-3 md:p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-[#044D8E] mb-2 md:mb-4 text-xs md:text-base">Samenvatting</h4>
                <div className="space-y-1.5 md:space-y-3 text-left">
                    {data.exteriorWindows > 0 && (
                        <div className="flex items-center gap-2 text-[#0F61AC] text-sm md:text-base">
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#1792D0] flex-shrink-0" />
                            <span>
                                {data.exteriorWindows} buitenramen ({SERVICE_TYPES.exterior.priceDisplay}/raam)
                            </span>
                        </div>
                    )}
                    {data.interiorExteriorWindows > 0 && (
                        <div className="flex items-center gap-2 text-[#0F61AC] text-sm md:text-base">
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#1792D0] flex-shrink-0" />
                            <span>
                                {data.interiorExteriorWindows} binnen + buiten ramen ({SERVICE_TYPES.premium.priceDisplay}/raam)
                            </span>
                        </div>
                    )}
                    {
                        data.propertyType !== "" && (
                            <div className="flex items-center gap-2 text-[#0F61AC] text-sm md:text-base">
                                <Check className="w-4 h-4 md:w-5 md:h-5 text-[#1792D0] flex-shrink-0" />
                                <span>Type woning: {data.propertyType}</span>
                            </div>
                        )
                    }
                    {data.hardToReach && (
                        <div className="flex items-center gap-2 text-[#0F61AC] text-sm md:text-base">
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#1792D0] flex-shrink-0" />
                            <span>Moeilijk bereikbaar (+15%)</span>
                        </div>
                    )}
                    {data.firstTimeInLong && (
                        <div className="flex items-center gap-2 text-[#0F61AC] text-sm md:text-base">
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#1792D0] flex-shrink-0" />
                            <span>Eerste keer in lange tijd (+€20)</span>
                        </div>
                    )}
                    {data.cleanFrames && (
                        <div className="flex items-center gap-2 text-[#0F61AC] text-sm md:text-base">
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#1792D0] flex-shrink-0" />
                            <span>Kozijnen reinigen (+€25)</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default PriceSummary;

