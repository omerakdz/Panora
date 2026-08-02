"use client";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
    isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#044D8E] hover:bg-[#1792D0] text-white font-bold py-3 text-lg cursor-pointer transition-all duration-300 hover:shadow-lg"
        >
            {isSubmitting ? "Bezig met boeken..." : "Bevestig afspraak"}
        </Button>
    );
};

export default SubmitButton;