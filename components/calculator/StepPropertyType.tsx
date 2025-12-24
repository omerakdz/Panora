"use client";

import { CalculatorData } from "@/types";
import { Building2, Home, Store } from "lucide-react";

interface StepPropertyTypeProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepPropertyType({ data, updateData }: StepPropertyTypeProps) {
    const propertyTypes = [
        { value: "appartement", label: "Appartement", icon: Building2 },
        { value: "rijhuis", label: "Rijhuis", icon: Home },
        { value: "halfopen", label: "Halfopen woning", icon: Home },
        { value: "vrijstaand", label: "Vrijstaande woning", icon: Home },
        { value: "kantoor", label: "Kantoor/Handelszaak", icon: Store },
    ] as const;

    return (
        <div className="space-y-4">
            <p className="text-center text-[#0F61AC] mb-6">
                Selecteer het type woning of gebouw
            </p>
            <div className="grid gap-4 md:grid-cols-2">
                {propertyTypes.map(({ value, label, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => updateData({ propertyType: value })}
                        className={`
              p-6 rounded-lg border-2 transition-all
              flex flex-col items-center justify-center gap-3
              hover:shadow-md
              ${data.propertyType === value
                                ? "border-[#044D8E] bg-[#9FCAE3]/10 shadow-md"
                                : "border-[#9FCAE3] hover:border-[#1792D0]"
                            }
            `}
                    >
                        <Icon
                            className={`w-12 h-12 ${data.propertyType === value ? "text-[#044D8E]" : "text-[#0F61AC]"
                                }`}
                        />
                        <span
                            className={`font-semibold ${data.propertyType === value ? "text-[#044D8E]" : "text-[#0F61AC]"
                                }`}
                        >
                            {label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
