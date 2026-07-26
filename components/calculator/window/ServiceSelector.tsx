"use client";

import { CalculatorData } from "@/types";
import { HelpCircle, Home, Sparkles, Sun } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ServiceSelectorProps {
    selected: CalculatorData["windowService"];
    onSelect: (service: CalculatorData["windowService"]) => void;
    onHelpClick: () => void;
    animateHelp: boolean;
}

const ServiceSelector = ({ selected, onSelect, animateHelp, onHelpClick }: ServiceSelectorProps) => {
    return (
        <>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
                {[
                    {
                        id: "exterior",
                        label: "Enkel buiten",
                        icon: Sun,
                    },
                    {
                        id: "premium",
                        label: "Binnen + buiten",
                        icon: Sparkles,
                    },
                    {
                        id: "combination",
                        label: "Combinatie",
                        icon: Home,
                    },
                ].map((service) => {
                    const Icon = service.icon;
                    const isActive = selected === service.id;

                    return (
                        <motion.button
                            key={service.id}
                            onClick={() =>
                                onSelect(service.id as CalculatorData["windowService"])
                            }
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                                "rounded-xl border-2 p-3 md:p-4 text-xs md:text-sm font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer",

                                isActive
                                    ? "border-[#044D8E] bg-gradient-to-br from-[#9FCAE3]/40 to-[#9FCAE3]/20 text-[#044D8E] shadow-md"
                                    : "border-[#9FCAE3] text-[#0F61AC] hover:border-[#1792D0] hover:bg-[#9FCAE3]/10",
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5 md:w-6 md:h-6 transition-colors",
                                    isActive ? "text-[#044D8E]" : "text-[#1792D0]",
                                )}
                            />

                            <span className="leading-tight">{service.label}</span>
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <Button
                    variant="outline"
                    onClick={onHelpClick}
                    className={cn(
                        "border-[#9FCAE3] text-[#044D8E] hover:bg-[#044D8E]/20 hover:border-[#044D8E] transition-all cursor-pointer",
                        animateHelp && "animate-wiggle"
                    )}
                >
                    <HelpCircle className="mr-2 w-4 h-4" />
                    Hoe tel je je ramen?
                </Button>
            </div>
        </>
    )
}

export default ServiceSelector;