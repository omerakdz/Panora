"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface WindowCounterProps {
    label: string;
    value: number;
    field: "exteriorWindows" | "interiorExteriorWindows";
    onChange: (
        field: "exteriorWindows" | "interiorExteriorWindows",
        amount: number
    ) => void;
}

const WindowCounter = ({ label, value, field, onChange }: WindowCounterProps) => {
    return (
        <>
            <div
                className="flex items-center justify-between bg-gradient-to-br from-white to-[#9FCAE3]/10 rounded-xl border-2 border-[#9FCAE3] p-4 shadow-sm hover:shadow-md transition-shadow"
            >
                <div>
                    <p className="font-semibold text-[#044D8E] text-base md:text-lg">
                        {label}
                    </p>

                    <p className="text-xs text-[#0F61AC]">Ramen</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        disabled={value === 0}
                        onClick={() => onChange(field, -1)}
                        className="rounded-full border-[#9FCAE3] hover:border-[#044D8E] hover:bg-[#044D8E]/10 transition-all"
                    >
                        <Minus className="text-[#044D8E]" />
                    </Button>

                    <span className="text-2xl font-bold text-[#044D8E] min-w-[3rem] text-center">
                        {value}
                    </span>

                    <Button
                        type="button"
                        size="icon"
                        onClick={() => onChange(field, 1)}
                        className="rounded-full bg-gradient-to-br from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] shadow-md hover:shadow-lg transition-all"
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default WindowCounter;