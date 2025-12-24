"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StepPropertyType from "./StepPropertyType";
import StepWindows from "./StepWindows";
import StepExtras from "./StepExtras";
import StepPrice from "./StepPrice";
import StepSchedule from "./StepSchedule";
import StepCustomerDetails from "./StepCustomerDetails";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalculatorData } from "@/types";


const TOTAL_STEPS = 6;

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
                return true; // Extras are optional
            case 4:
                return true; // Price is shown, always can proceed
            case 5:
                return data.selectedDate !== null && data.selectedTime !== "";
            case 6:
                return (
                    data.customerName !== "" &&
                    data.customerPhone !== "" &&
                    data.customerEmail !== "" &&
                    data.customerAddress !== ""
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
                return "Extra opties";
            case 4:
                return "Jouw prijs";
            case 5:
                return "Kies datum & tijd";
            case 6:
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
                return <StepExtras data={data} updateData={updateData} />;
            case 4:
                return <StepPrice data={data} updateData={updateData} />;
            case 5:
                return <StepSchedule data={data} updateData={updateData} />;
            case 6:
                return <StepCustomerDetails data={data} updateData={updateData} nextStep={nextStep} />;
            default:
                return null;
        }
    };

    const progress = (currentStep / TOTAL_STEPS) * 100;

    return (
        <div id="calculator" className="w-full">
            <Card className="border-[#9FCAE3] shadow-lg">
                <CardContent className="p-6 md:p-8">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-[#0F61AC] font-medium">
                                Stap {currentStep} van {TOTAL_STEPS}
                            </span>
                            <span className="text-sm text-[#0F61AC] font-medium">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-2xl font-bold text-[#044D8E] mb-6 text-center">
                        {getStepTitle()}
                    </h3>

                    {/* Step Content */}
                    <div className="min-h-[300px]">{renderStep()}</div>

                    {/* Navigation Buttons */}
                    {currentStep < 6 && (
                        <div className="flex justify-between mt-8 pt-6 border-t border-[#9FCAE3]">
                            <Button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                variant="outline"
                                className="border-[#044D8E] text-[#044D8E] disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Vorige
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={!canProceed() || currentStep === 6}
                                className="bg-[#044D8E] hover:bg-[#0F61AC] disabled:opacity-50"
                            >
                                {currentStep === 6 ? "Bevestig afspraak" : "Volgende"}
                                {currentStep !== 6 && <ChevronRight className="w-4 h-4 ml-2" />}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
