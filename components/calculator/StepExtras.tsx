"use client";

import { CalculatorData } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StepExtrasProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepExtras({ data, updateData }: StepExtrasProps) {
    const extras = [
        {
            id: "hardToReach",
            label: "Moeilijk bereikbaar",
            description: "Ramen op grote hoogte of moeilijk toegankelijk",
            value: data.hardToReach,
            onChange: (checked: boolean) => updateData({ hardToReach: checked }),
        },
        {
            id: "firstTimeInLong",
            label: "Eerste keer in lange tijd",
            description: "De ramen zijn al langer dan 6 maanden niet gewassen",
            value: data.firstTimeInLong,
            onChange: (checked: boolean) => updateData({ firstTimeInLong: checked }),
        },
        {
            id: "cleanFrames",
            label: "Kozijnen reinigen",
            description: "Ook de raamkozijnen grondig reinigen",
            value: data.cleanFrames,
            onChange: (checked: boolean) => updateData({ cleanFrames: checked }),
        },
    ];

    return (
        <div className="space-y-6">
            <p className="text-center text-[#0F61AC] mb-6">
                Selecteer eventuele extra opties (optioneel)
            </p>

            <div className="space-y-4 max-w-md mx-auto">
                {extras.map((extra) => (
                    <div
                        key={extra.id}
                        className="flex items-start space-x-3 p-4 rounded-lg border border-[#9FCAE3] hover:bg-[#9FCAE3]/5 transition-colors"
                    >
                        <Checkbox
                            id={extra.id}
                            checked={extra.value}
                            onCheckedChange={extra.onChange}
                            className="mt-1"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor={extra.id}
                                className="text-[#044D8E] font-semibold cursor-pointer"
                            >
                                {extra.label}
                            </Label>
                            <p className="text-sm text-[#0F61AC] mt-1">{extra.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-center text-sm text-[#0F61AC] mt-6">
                Deze opties kunnen de prijs beïnvloeden
            </p>
        </div>
    );
}
