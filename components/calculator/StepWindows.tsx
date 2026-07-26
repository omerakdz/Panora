"use client";

import { CalculatorData } from "@/types";
import { useEffect, useState } from "react";
import ServiceSelector from "./window/ServiceSelector";
import WindowHelpDialog from "./window/WindowHelpDialog";
import WindowCounter from "./window/WindowCounter";
import WindowSummaryCard from "./window/WindowSummaryCard";
import WindowInfo from "./window/WindowInfo";
import { useWindowCalculator } from "@/hooks/useWindowCalculator";

interface StepWindowsProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

export default function StepWindows({ data, updateData }: StepWindowsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [animateHelp, setAnimateHelp] = useState(false);

    const { changeCount, selectService, } = useWindowCalculator({ data, updateData, });

    // Wiggle animatie voor help-knop
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateHelp(true);

            const resetTimer = setTimeout(() => {
                setAnimateHelp(false);
            }, 700);

            return () => clearTimeout(resetTimer);
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-6">
            <WindowInfo />

            <WindowHelpDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />

            <div className="text-center mb-4">
                <p className="text-[#0F61AC] font-medium">
                    Wat wil je laten reinigen?
                </p>
            </div>

            <ServiceSelector
                selected={data.windowService}
                onSelect={selectService}
                animateHelp={animateHelp}
                onHelpClick={() => setIsDialogOpen(true)}
            />

            <div className="space-y-4">
                {data.windowService === "combination" ? (
                    <>
                        <WindowCounter
                            label="Enkel buiten"
                            value={data.exteriorWindows}
                            field="exteriorWindows"
                            onChange={changeCount}
                        />

                        <div className="border-t border-[#9FCAE3]/50" />

                        <WindowCounter
                            label="Binnen + buiten"
                            value={data.interiorExteriorWindows}
                            field="interiorExteriorWindows"
                            onChange={changeCount}
                        />
                    </>
                ) : (
                    <WindowCounter
                        label={
                            data.windowService === "premium"
                                ? "Binnen + buiten"
                                : "Enkel buiten"
                        }
                        value={
                            data.windowService === "premium"
                                ? data.interiorExteriorWindows
                                : data.exteriorWindows
                        }
                        field={
                            data.windowService === "premium"
                                ? "interiorExteriorWindows"
                                : "exteriorWindows"
                        }
                        onChange={changeCount}
                    />
                )}
            </div>

            <WindowSummaryCard
                totalWindows={data.totalWindows}
                calculatedPrice={data.calculatedPrice}
            />
        </div>
    );
}