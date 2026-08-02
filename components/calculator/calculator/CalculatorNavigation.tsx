import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalculatorNavigationProps {
    currentStep: number;
    prevStep: () => void;
    nextStep: () => void;
    canProceed: () => boolean;
}

const CalculatorNavigation = ({ currentStep, prevStep, nextStep, canProceed }: CalculatorNavigationProps) => {
    return (
        <>
            <div className="flex justify-between mt-3 md:mt-4 pt-3 border-t border-white/50">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        variant="outline"
                        className="glass-frosted border-2 border-[#044D8E]/30 text-[#044D8E] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base h-10 md:h-12 px-6 font-semibold hover:bg-[#044D8E]/20 hover:border-[#044D8E] hover:text-[#044D8E] hover:shadow-lg transition-all duration-300 cursor-pointer"
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
                            className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base h-10 md:h-12 px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            Volgende
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default CalculatorNavigation;