import { useState } from "react";
import { CalculatorData } from "@/types";

const TOTAL_STEPS = 5;

export const useCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CalculatorData>({
    propertyType: "",
    windowService: "exterior",
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

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return data.propertyType !== "";
      case 2:
        // Minimaal 1 raam EN minimum bedrag van €25
        return (
          (data.exteriorWindows > 0 || data.interiorExteriorWindows > 0) &&
          data.calculatedPrice >= 25
        );
      case 3:
        return true; // Price is shown, always can proceed
      case 4:
        // Address, date and time must be selected
        return (
          data.customerAddress !== "" &&
          data.customerCity !== "" &&
          data.customerPostalCode !== "" &&
          data.selectedSlotStart !== undefined &&
          data.selectedSlotStart !== ""
        );
      case 5:
        return (
          data.customerName !== "" &&
          (data.customerPhone !== "" || data.customerEmail !== "") &&
          data.customerAddress !== "" &&
          data.customerCity !== "" &&
          data.customerPostalCode !== ""
        );
      default:
        return false;
    }
  };

  return {
    currentStep,
    data,
    updateData,
    nextStep,
    prevStep,
    canProceed,
    TOTAL_STEPS,
  };
};
