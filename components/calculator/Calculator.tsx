"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { StepScheduleHandle } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useCalculator } from "@/hooks/useCalculator";
import { useCalculatorTracking } from "@/hooks/useCalculatorTracking";
import CalculatorStepper from "./calculator/CalculatorStepper";
import CalculatorTitle from "./calculator/CalculatorTitle";
import CalculatorStepContent from "./calculator/CalculatorStepContent";
import CalculatorNavigation from "./calculator/CalculatorNavigation";

export default function Calculator() {
    const stepScheduleRef = useRef<StepScheduleHandle>(null);

    const {
        currentStep,
        data,
        updateData,
        nextStep: nextStepBase,
        prevStep: prevStepBase,
        canProceed,
    } = useCalculator();

    const {
        trackWindowCountSubmit,
        trackPriceConfirm,
        trackLeadFormStart,
    } = useCalculatorTracking(currentStep, data);

    const nextStep = () => {
        // Track events before transitioning to next step
        if (currentStep === 2) {
            trackWindowCountSubmit();
        } else if (currentStep === 3) {
            trackPriceConfirm();
        } else if (currentStep === 4) {
            trackLeadFormStart();
        }

        nextStepBase();
    };

    const prevStep = () => {
        // Als we op stap 4 zitten, geef StepSchedule eerst de kans om zelf terug te gaan (4B -> 4A)
        if (currentStep === 4 && stepScheduleRef.current) {
            const handledInternally = stepScheduleRef.current.goBack();
            if (handledInternally) return;
        }

        prevStepBase();
    };

    return (
        <div id="calculator" className="w-full px-2 md:px-4 pb-6 md:pb-8">
            <Card className="glass-card border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
                {/* Gradient background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1792D0]/5 via-transparent to-[#044D8E]/5 opacity-50"></div>

                <CardContent className="p-3 md:p-5 relative z-10">
                    {/* Premium Progress Indicator */}
                    <CalculatorStepper currentStep={currentStep} />

                    {/* Step Title with animation */}
                    <CalculatorTitle currentStep={currentStep} />

                    {/* Step Content with animation */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            className="min-h-[100px] md:min-h-[140px]"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CalculatorStepContent
                                step={currentStep}
                                data={data}
                                updateData={updateData}
                                stepScheduleRef={stepScheduleRef}
                                nextStep={nextStep}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <CalculatorNavigation
                        currentStep={currentStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        canProceed={canProceed}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
