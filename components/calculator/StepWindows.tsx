"use client";

import { CalculatorData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { AlertCircle, HelpCircle } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/constants";
import { useState } from "react";
import Image from "next/image";

interface StepWindowsProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepWindows({ data, updateData }: StepWindowsProps) {
    // Simple state - starts as true to show popup on mount
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const isValid =
        data.totalWindows > 0 &&
        data.exteriorWindows + data.interiorExteriorWindows === data.totalWindows;

    const totalCount = data.exteriorWindows + data.interiorExteriorWindows;

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Help Guide Dialog - Always rendered */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <div className="p-4 md:p-6">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-[#044D8E] text-center mb-2">
                                Hoe tel je je ramen?
                            </h2>
                            <p className="text-[#0F61AC] text-center text-sm md:text-base">
                                Volg deze eenvoudige uitleg om je raampanelen correct te tellen
                            </p>
                        </div>

                        <div className="relative w-full aspect-4/3 mb-6 rounded-lg overflow-hidden bg-gray-50">
                            <Image
                                src="/images/ramen.png"
                                alt="Uitleg over het tellen van raampanelen"
                                fill
                                className="object-contain"
                                priority
                                unoptimized
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                onClick={closeDialog}
                                className="w-full bg-[#044D8E] hover:bg-[#0F61AC] text-white font-semibold py-3 text-base"
                                type="button"
                            >
                                Begrepen, ik ga verder
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-center text-[#0F61AC] text-sm md:text-base">
                    Vul het aantal ramen in dat gereinigd moet worden
                </p>
                <button
                    onClick={openDialog}
                    className="text-[#044D8E] hover:text-[#0F61AC] transition-colors flex items-center gap-1"
                    title="Hulp bij het tellen van ramen"
                    type="button"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-3 md:space-y-4 max-w-md mx-auto">
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
                        className={`w-5 h-5 mt-0.5 shrink-0 ${!isValid && totalCount > 0
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
        </div >
    );
}
