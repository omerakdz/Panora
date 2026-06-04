"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StepPropertyType from "./StepPropertyType";
import StepWindows from "./StepWindows";
import StepPrice from "./StepPrice";
import StepSchedule from "./StepSchedule";
import StepCustomerDetails from "./StepCustomerDetails";
import { ChevronLeft, ChevronRight, Home, Grid3x3, Euro, Calendar, User, Check } from "lucide-react";
import type { CalculatorData } from "@/types";
import { motion, AnimatePresence } from "motion/react";


const TOTAL_STEPS = 5;

export default function Calculator() {
    const [currentStep, setCurrentStep] = useState(1);
    const [calculatorStarted, setCalculatorStarted] = useState(false);
    const [data, setData] = useState<CalculatorData>({
        propertyType: "",
        totalWindows: 0,
        exteriorWindows: 0,
        interiorExteriorWindows: 0,
        hardToReach: false,
        firstTimeInLong: false,
        cleanFrames: false,
        calculatedPrice: 0,
        selectedDate: null,
        selectedTime: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        customerAddress: "",
        customerCity: "",
        customerPostalCode: "",
        customerNotes: "",
    });

    // Track calculator_start event - eerste echte interactie
    useEffect(() => {
        if (!calculatorStarted && currentStep === 1) {
            // Initialize dataLayer
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                const eventData = {
                    event: "calculator_start",
                    funnel_name: "calculator"
                };
                window.dataLayer.push(eventData);
                if (process.env.NODE_ENV === 'development') {
                    console.log('📊 GTM Event pushed:', eventData);
                }
                setCalculatorStarted(true);
            }
        }
    }, [calculatorStarted, currentStep]);

    const updateData = (newData: Partial<CalculatorData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            // Track window_count_submit event
            if (currentStep === 2 && typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                const eventData = {
                    event: "window_count_submit",
                    funnel_name: "calculator",
                    total_windows: data.totalWindows,
                    exterior_windows: data.exteriorWindows,
                    interior_exterior_windows: data.interiorExteriorWindows
                };
                window.dataLayer.push(eventData);
                if (process.env.NODE_ENV === 'development') {
                    console.log('📊 GTM Event pushed:', eventData);
                }
            }

            // Track lead_form_start event
            if (currentStep === 4 && typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                const eventData = {
                    event: "lead_form_start",
                    funnel_name: "calculator"
                };
                window.dataLayer.push(eventData);
                if (process.env.NODE_ENV === 'development') {
                    console.log('📊 GTM Event pushed:', eventData);
                }
            }

            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return data.propertyType !== "";
            case 2:
                return (
                    data.totalWindows > 0 &&
                    data.exteriorWindows + data.interiorExteriorWindows === data.totalWindows
                );
            case 3:
                return true; // Price is shown, always can proceed
            case 4:
                return data.selectedDate !== null && data.selectedTime !== "";
            case 5:
                return (
                    data.customerName !== "" &&
                    data.customerPhone !== "" &&
                    data.customerEmail !== "" &&
                    data.customerAddress !== "" &&
                    data.customerCity !== "" &&
                    data.customerPostalCode !== ""
                );
            default:
                return false;
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return "Type woning";
            case 2:
                return "Aantal ramen";
            case 3:
                return "Jouw prijs";
            case 4:
                return "Kies datum & tijd";
            case 5:
                return "Jouw gegevens";
            default:
                return "";
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepPropertyType data={data} updateData={updateData} />;
            case 2:
                return <StepWindows data={data} updateData={updateData} />;
            case 3:
                return <StepPrice data={data} updateData={updateData} />;
            case 4:
                return <StepSchedule data={data} updateData={updateData} />;
            case 5:
                return <StepCustomerDetails data={data} updateData={updateData} nextStep={nextStep} />;
            default:
                return null;
        }
    };

    const progress = (currentStep / TOTAL_STEPS) * 100;

    const steps = [
        { number: 1, title: "Type woning", icon: Home },
        { number: 2, title: "Aantal ramen", icon: Grid3x3 },
        { number: 3, title: "Jouw prijs", icon: Euro },
        { number: 4, title: "Kies datum & tijd", icon: Calendar },
        { number: 5, title: "Jouw gegevens", icon: User },
    ];

    return (
        <div id="calculator" className="w-full px-2 md:px-4 pb-6 md:pb-8">
            <Card className="glass-card border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
                {/* Gradient background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1792D0]/5 via-transparent to-[#044D8E]/5 opacity-50"></div>

                <CardContent className="p-3 md:p-5 relative z-10">
                    {/* Premium Progress Indicator */}
                    <div className="mb-3 md:mb-4">
                        {/* Horizontal stepper - all screens */}
                        <div className="flex justify-between items-start mb-3 md:mb-4">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isCompleted = currentStep > step.number;
                                const isCurrent = currentStep === step.number;
                                const isUpcoming = currentStep < step.number;

                                return (
                                    <div key={step.number} className="flex-1 relative">
                                        <div className="flex flex-col items-center">
                                            {/* Icon circle */}
                                            <motion.div
                                                className={`relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${isCompleted
                                                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30"
                                                    : isCurrent
                                                        ? "bg-gradient-to-br from-[#1792D0] to-[#044D8E] shadow-lg shadow-blue-500/40 glow-pulse"
                                                        : "bg-slate-200 border-2 border-slate-300"
                                                    }`}
                                                initial={false}
                                                animate={{
                                                    scale: isCurrent ? [1, 1.1, 1] : 1,
                                                }}
                                                transition={{
                                                    duration: isCurrent ? 1.5 : 0.3,
                                                    repeat: isCurrent ? Infinity : 0,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                {isCompleted ? (
                                                    <Check className="w-3 h-3 md:w-5 md:h-5 text-white" />
                                                ) : (
                                                    <Icon className={`w-3 h-3 md:w-5 md:h-5 ${isCurrent ? "text-white" : "text-slate-500"
                                                        }`} />
                                                )}
                                            </motion.div>

                                            {/* Step label */}
                                            <div className="text-[9px] md:text-[11px] font-semibold text-center max-w-[55px] md:max-w-[90px]">
                                                <div className={`${isCurrent ? "text-[#044D8E]" : "text-slate-500"
                                                    }`}>
                                                    {step.title}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connecting line */}
                                        {index < steps.length - 1 && (
                                            <div className="absolute top-4 md:top-6 left-[calc(50%+16px)] md:left-[calc(50%+24px)] right-[calc(-50%+16px)] md:right-[calc(-50%+24px)] h-0.5 bg-slate-200">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: isCompleted ? "100%" : "0%" }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step Title with animation */}
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={currentStep}
                            className="text-lg md:text-2xl font-bold text-[#044D8E] mb-2 md:mb-3 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {getStepTitle()}
                        </motion.h3>
                    </AnimatePresence>

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
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-3 md:mt-4 pt-3 border-t border-white/50">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                variant="outline"
                                className="glass-frosted border-2 border-[#044D8E]/30 text-[#044D8E] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base h-10 md:h-12 px-6 font-semibold hover:bg-[#044D8E]/10 transition-all duration-300"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Vorige
                            </Button>
                        </motion.div>
                        {currentStep < 5 && (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base h-10 md:h-12 px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Volgende
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
