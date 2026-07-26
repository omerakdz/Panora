"use client";

import { usePriceCalculation } from "@/hooks/usePriceCalculation";
import { CalculatorData } from "@/types";
import PriceCard from "./price/PriceCard";
import PriceSummary from "./price/PriceSummary";

interface StepPriceProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepPrice({ data, updateData }: StepPriceProps) {
    const { isCalculating, } = usePriceCalculation({ data, updateData, });
    return (
        <div className="space-y-3 md:space-y-6 text-center">
            <PriceCard
                price={data.calculatedPrice}
                propertyType={data.propertyType}
            />

            <PriceSummary data={data} />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                    <strong>Let op:</strong> Dit is een richtprijs. De exacte prijs wordt bevestigd
                    na inspectie ter plaatse.
                </p>
            </div>
        </div>
    );
}
