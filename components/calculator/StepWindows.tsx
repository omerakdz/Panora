"use client";

import { CalculatorData } from "@/types";
import { Button } from "@/components/ui/button";
import { HelpCircle, Minus, Plus, Home, Sparkles, Sun, Info } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "../ui/card";

interface StepWindowsProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

const DEFAULT_WINDOWS = 8;

export default function StepWindows({ data, updateData }: StepWindowsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Automatisch totalWindows bijwerken
    useEffect(() => {
        const total =
            data.exteriorWindows + data.interiorExteriorWindows;


        const price =
            (data.exteriorWindows * 2.50) +
            (data.interiorExteriorWindows * 4.50);


        if (
            data.totalWindows !== total ||
            data.calculatedPrice !== price
        ) {
            updateData({
                totalWindows: total,
                calculatedPrice: price,
            });
        }

    }, [
        data.exteriorWindows,
        data.interiorExteriorWindows,
    ]);

    const [animateHelp, setAnimateHelp] = useState(false);

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

    const changeCount = (
        field: "exteriorWindows" | "interiorExteriorWindows",
        amount: number,
    ) => {
        const current = data[field];

        updateData({
            [field]: Math.max(0, current + amount),
        });
    };

    const selectService = (service: CalculatorData["windowService"]) => {
        updateData({
            windowService: service,

            ...(service === "exterior" && {
                exteriorWindows: data.exteriorWindows || DEFAULT_WINDOWS,
                interiorExteriorWindows: 0,
            }),

            ...(service === "premium" && {
                interiorExteriorWindows:
                    data.interiorExteriorWindows || DEFAULT_WINDOWS,
                exteriorWindows: 0,
            }),

            ...(service === "combination" && {
                exteriorWindows: data.exteriorWindows || DEFAULT_WINDOWS,

                interiorExteriorWindows:
                    data.interiorExteriorWindows || DEFAULT_WINDOWS,
            }),
        });
    };

    const Counter = ({
        label,
        value,
        field,
    }: {
        label: string;
        value: number;
        field: "exteriorWindows" | "interiorExteriorWindows";
    }) => (
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
                    onClick={() => changeCount(field, -1)}
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
                    onClick={() => changeCount(field, 1)}
                    className="rounded-full bg-gradient-to-br from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] shadow-md hover:shadow-lg transition-all"
                >
                    <Plus />
                </Button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="mt-5 rounded-xl border border-[#9FCAE3] bg-[#9FCAE3]/20 p-4">
                <p className="text-sm text-[#044D8E] leading-relaxed text-center">
                    <strong>Eén raam = één glaspaneel.</strong>
                    <br />
                    Een dubbele deur telt als 2.
                    <br />
                    Niet zeker? Geef je beste schatting — we bevestigen ter plaatse.
                </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-[#044D8E] text-center cursor-pointer">
                            Hoe tel je je ramen?
                        </h2>

                        <div className="relative aspect-4/3 mt-5 rounded-lg overflow-hidden">
                            <Image
                                src="/images/ramen.png"
                                alt="Ramen tellen"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                className="w-full bg-[#044D8E]"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Begrepen
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="text-center mb-4">
                <p className="text-[#0F61AC] font-medium">Wat wil je laten reinigen?</p>
            </div>

            {/* SERVICE SELECTOR */}

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
                    const isActive = data.windowService === service.id;

                    return (
                        <motion.button
                            key={service.id}
                            onClick={() =>
                                selectService(service.id as CalculatorData["windowService"])
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
                    onClick={() => setIsDialogOpen(true)}
                    className={cn(
                        "border-[#9FCAE3] text-[#044D8E] hover:bg-[#044D8E]/20 hover:border-[#044D8E] transition-all cursor-pointer",
                        animateHelp && "animate-wiggle"
                    )}
                >
                    <HelpCircle className="mr-2 w-4 h-4" />
                    Hoe tel je je ramen?
                </Button>
            </div>

            {/* COUNTERS */}

            <div className="space-y-4">
                {data.windowService === "combination" ? (
                    <>
                        <Counter
                            label="Enkel buiten"
                            value={data.exteriorWindows}
                            field="exteriorWindows"
                        />

                        <div className="border-t border-[#9FCAE3]/50" />

                        <Counter
                            label="Binnen + buiten"
                            value={data.interiorExteriorWindows}
                            field="interiorExteriorWindows"
                        />
                    </>
                ) : (
                    <Counter
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
                    />
                )}
            </div>

            <Card className="text-center p-4 bg-white rounded-lg border border-[#9FCAE3]/50 shadow-sm">
                <CardContent className="p-0">

                    <p className="text-sm text-[#0F61AC] leading-tight">
                        {data.totalWindows} ramen · richtprijs
                    </p>

                    <p className="text-3xl font-bold text-[#044D8E] leading-tight mt-1">
                        €{data.calculatedPrice.toFixed(2)}
                    </p>

                    {
                        data.calculatedPrice > 0 &&
                        data.calculatedPrice < 25 && (
                            <div className="mt-3 rounded-lg bg-[#9FCAE3]/20 border border-[#9FCAE3] p-3 space-y-3">

                                <p className="text-sm text-[#044D8E] leading-relaxed">
                                    Ons minimum is €25. Tel er enkele ramen bij —
                                    of die van de buren — en we komen graag langs.
                                </p>

                                <a
                                    href="/contact"
                                    className="inline-block w-full text-center bg-gradient-to-r from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    Neem contact op
                                </a>

                            </div>
                        )
                    }
                </CardContent>
            </Card>

        </div>
    );
}
