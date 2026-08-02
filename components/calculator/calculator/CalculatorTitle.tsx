import { AnimatePresence, motion } from "motion/react";

interface CalculatorTitleProps {
    currentStep: number;
}

const getStepTitle = (step: number): string => {
    switch (step) {
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

const CalculatorTitle = ({ currentStep }: CalculatorTitleProps) => {
    return (
        <AnimatePresence mode="wait">
            <motion.h3
                key={currentStep}
                className="text-lg md:text-2xl font-bold text-[#044D8E] mb-2 md:mb-3 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {getStepTitle(currentStep)}
            </motion.h3>
        </AnimatePresence>
    );
};

export default CalculatorTitle;