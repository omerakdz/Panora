import StepPropertyType from "../StepPropertyType";
import StepWindows from "../StepWindows";
import StepPrice from "../StepPrice";
import StepSchedule from "../StepSchedule";
import StepCustomerDetails from "../StepCustomerDetails";
import { CalculatorData, StepScheduleHandle } from "@/types";
import { RefObject } from "react";

interface CalculatorStepContentProps {
    step: number;
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
    stepScheduleRef: RefObject<StepScheduleHandle | null>;
    nextStep: () => void;
}

const CalculatorStepContent = ({ step, data, updateData, stepScheduleRef, nextStep }: CalculatorStepContentProps) => {
    return (
        (() => {
            switch (step) {
                case 1:
                    return <StepPropertyType data={data} updateData={updateData} />;
                case 2:
                    return <StepWindows data={data} updateData={updateData} />;
                case 3:
                    return <StepPrice data={data} updateData={updateData} />;
                case 4:
                    return <StepSchedule ref={stepScheduleRef} data={data} updateData={updateData} />;
                case 5:
                    return <StepCustomerDetails data={data} updateData={updateData} nextStep={nextStep} />;
                default:
                    return null;
            }
        })()
    );
};

export default CalculatorStepContent;