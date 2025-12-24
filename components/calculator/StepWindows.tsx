"use client";

import { CalculatorData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/constants";

interface StepWindowsProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepWindows({ data, updateData }: StepWindowsProps) {
    const isValid =
        data.totalWindows > 0 &&
        data.exteriorWindows + data.interiorExteriorWindows === data.totalWindows;

    const totalCount = data.exteriorWindows + data.interiorExteriorWindows;

    return (
        <div className="space-y-6">
            <p className="text-center text-[#0F61AC] mb-6">
                Vul het aantal ramen in dat gereinigd moet worden
            </p>

            <div className="space-y-4 max-w-md mx-auto">
                {/* Total Windows */}
                <div>
                    <Label htmlFor="totalWindows" className="text-[#044D8E] font-semibold mb-2 block">
                        Totaal aantal ramen *
                    </Label>
                    <Input
                        id="totalWindows"
                        type="number"
                        min="0"
                        value={data.totalWindows || ""}
                        onChange={(e) =>
                            updateData({ totalWindows: parseInt(e.target.value) || 0 })
                        }
                        className="border-[#9FCAE3] focus:border-[#044D8E]"
                        placeholder="Bijv. 12"
                    />
                </div>

                {/* Exterior Windows */}
                <div>
                    <Label htmlFor="exteriorWindows" className="text-[#044D8E] font-semibold mb-2 block">
                        Alleen buitenramen
                    </Label>
                    <Input
                        id="exteriorWindows"
                        type="number"
                        min="0"
                        value={data.exteriorWindows || ""}
                        onChange={(e) =>
                            updateData({ exteriorWindows: parseInt(e.target.value) || 0 })
                        }
                        className="border-[#9FCAE3] focus:border-[#044D8E]"
                        placeholder="Bijv. 8"
                    />
                    <p className="text-xs text-[#0F61AC] mt-1">Vanaf {SERVICE_TYPES.exterior.priceDisplay} per raam</p>
                </div>

                {/* Interior + Exterior Windows */}
                <div>
                    <Label
                        htmlFor="interiorExteriorWindows"
                        className="text-[#044D8E] font-semibold mb-2 block"
                    >
                        Binnen + buiten ramen
                    </Label>
                    <Input
                        id="interiorExteriorWindows"
                        type="number"
                        min="0"
                        value={data.interiorExteriorWindows || ""}
                        onChange={(e) =>
                            updateData({ interiorExteriorWindows: parseInt(e.target.value) || 0 })
                        }
                        className="border-[#9FCAE3] focus:border-[#044D8E]"
                        placeholder="Bijv. 4"
                    />
                    <p className="text-xs text-[#0F61AC] mt-1">Vanaf {SERVICE_TYPES.premium.priceDisplay} per raam</p>
                </div>

                {/* Validation Message */}
                <div
                    className={`
            p-3 rounded-lg flex items-start gap-2
            ${!isValid && totalCount > 0
                            ? "bg-red-50 border border-red-200"
                            : totalCount === data.totalWindows && data.totalWindows > 0
                                ? "bg-green-50 border border-green-200"
                                : "bg-[#9FCAE3]/10 border border-[#9FCAE3]"
                        }
          `}
                >
                    <AlertCircle
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${!isValid && totalCount > 0
                            ? "text-red-500"
                            : totalCount === data.totalWindows && data.totalWindows > 0
                                ? "text-green-600"
                                : "text-[#044D8E]"
                            }`}
                    />
                    <div className="text-sm">
                        {totalCount === 0 ? (
                            <p className="text-[#0F61AC]">
                                <strong>Opmerking:</strong> Buitenramen + binnen/buiten ramen moet gelijk zijn
                                aan het totaal aantal ramen.
                            </p>
                        ) : !isValid ? (
                            <p className="text-red-700">
                                <strong>Let op:</strong> {totalCount} ≠ {data.totalWindows}. De som moet
                                kloppen met het totaal.
                            </p>
                        ) : (
                            <p className="text-green-700">
                                <strong>Perfect!</strong> De telling klopt. Je kunt doorgaan naar de
                                volgende stap.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
