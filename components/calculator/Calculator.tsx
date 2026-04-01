"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StepPropertyType from "./StepPropertyType";
import StepWindows from "./StepWindows";
import StepPrice from "./StepPrice";
import StepSchedule from "./StepSchedule";
import StepCustomerDetails from "./StepCustomerDetails";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalculatorData } from "@/types";


const TOTAL_STEPS = 5;

export default function Calculator() {
    const [currentStep, setCurrentStep] = useState(1);
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

    const updateData = (newData: Partial<CalculatorData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
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

    return (
        <div id="calculator" className="w-full">
            <Card className="border-[#9FCAE3] shadow-2xl hover:shadow-3xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-3 md:p-6">
                    {/* Progress Bar */}
                    <div className="mb-3 md:mb-4">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs md:text-sm text-[#0F61AC] font-medium">
                                Stap {currentStep} van {TOTAL_STEPS}
                            </span>
                            <span className="text-xs md:text-sm text-[#0F61AC] font-medium">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <Progress value={progress} className="h-1.5 md:h-2" />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg md:text-2xl font-bold text-[#044D8E] mb-3 md:mb-4 text-center">
                        {getStepTitle()}
                    </h3>

                    {/* Step Content */}
                    <div className="min-h-[150px] md:min-h-[200px]">{renderStep()}</div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4 md:mt-5 pt-3 md:pt-4 border-t border-[#9FCAE3]">
                        <Button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            variant="outline"
                            className="border-[#044D8E] text-[#044D8E] disabled:opacity-50 text-sm md:text-base h-9 md:h-10"
                        >
                            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                            Vorige
                        </Button>
                        {currentStep < 5 && (
                            <Button
                                onClick={nextStep}
                                disabled={!canProceed()}
                                className="bg-[#044D8E] hover:bg-[#0F61AC] disabled:opacity-50 text-sm md:text-base h-9 md:h-10"
                            >
                                Volgende
                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
