"use client";

import { CalculatorData } from "@/types";
import { propertyTypes } from "@/lib/constants";
interface StepPropertyTypeProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepPropertyType({ data, updateData }: StepPropertyTypeProps) {
    const handlePropertyTypeClick = (value: CalculatorData["propertyType"]) => {
        // Track calculator_start on FIRST property type interaction
        if (typeof window !== "undefined") {
            const hasStarted = sessionStorage.getItem("calculator_started");

            if (!hasStarted) {
                window.dataLayer = window.dataLayer || [];
                const startEvent = {
                    event: "calculator_start",
                    funnel_name: "calculator",
                };
                window.dataLayer.push(startEvent);
                if (process.env.NODE_ENV === "development") {
                    console.log("📊 GTM Event pushed:", startEvent);
                }
                sessionStorage.setItem("calculator_started", "true");
            }

            // Track property_type_select event
            window.dataLayer = window.dataLayer || [];
            const eventData = {
                event: "property_type_select",
                funnel_name: "calculator",
                property_type: value
            };
            window.dataLayer.push(eventData);
            if (process.env.NODE_ENV === "development") {
                console.log("📊 GTM Event pushed:", eventData);
            }
        }

        updateData({ propertyType: value });
    };

    return (
        <div className="space-y-2 md:space-y-3">
            <p className="text-center text-[#0F61AC] text-xs md:text-base mb-2 md:mb-4">
                Selecteer het type woning of gebouw
            </p>
            <div className="grid gap-2 md:gap-3 grid-cols-1 md:grid-cols-2">
                {propertyTypes.map(({ value, label, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => handlePropertyTypeClick(value)}
                        className={`p-2 md:p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 md:gap-2 hover:shadow-md 
                            ${data.propertyType === value
                                ? "border-[#044D8E] bg-[#9FCAE3]/10 shadow-md"
                                : "border-[#9FCAE3] hover:border-[#1792D0]"
                            }
                        `}
                    >
                        <Icon className={`w-5 h-5 md:w-8 md:h-8 ${data.propertyType === value ? "text-[#044D8E]" : "text-[#0F61AC]"}`} />
                        <span className={`font-semibold text-xs md:text-sm ${data.propertyType === value ? "text-[#044D8E]" : "text-[#0F61AC]"}`}>
                            {label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
