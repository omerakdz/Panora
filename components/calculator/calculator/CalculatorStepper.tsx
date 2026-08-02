import { motion } from "motion/react";
import { calculatorSteps } from "@/lib/calculator/calculatorSteps";
import { Check } from "lucide-react";

interface CalculatorStepperProps {
    currentStep: number;
}

const CalculatorStepper = ({ currentStep }: CalculatorStepperProps) => {
    return (
        <>
            <div className="mb-3 md:mb-4">
                {/* Horizontal stepper - all screens */}
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    {calculatorSteps.map((step, index) => {
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
                                {index < calculatorSteps.length - 1 && (
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
        </>
    );
};

export default CalculatorStepper;