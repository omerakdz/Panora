"use client";

import { Card, CardContent } from "@/components/ui/card";

interface WindowSummaryCardProps {
    totalWindows: number;
    calculatedPrice: number;
}


const WindowSummaryCard = ({ totalWindows, calculatedPrice }: WindowSummaryCardProps) => {
    return (
        <>
            <Card className="text-center p-4 bg-white rounded-lg border border-[#9FCAE3]/50 shadow-sm">
                <CardContent className="p-0">

                    <p className="text-sm text-[#0F61AC] leading-tight">
                        {totalWindows} ramen · richtprijs
                    </p>

                    <p className="text-3xl font-bold text-[#044D8E] leading-tight mt-1">
                        €{calculatedPrice.toFixed(2)}
                    </p>

                    {
                        calculatedPrice > 0 &&
                        calculatedPrice < 25 && (
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
        </>
    )
}

export default WindowSummaryCard;