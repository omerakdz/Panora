"use client";

import { Button } from "@/components/ui/button";

interface AvailabilityErrorProps {
    message: string;
    onEditAddress: () => void;
}

const AvailabilityError = ({ message, onEditAddress }: AvailabilityErrorProps) => {
    return (
        <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
                <p className="text-red-800 font-semibold mb-2">
                    {message}
                </p>

                <div className="flex gap-3 justify-center mt-4">
                    <Button
                        onClick={onEditAddress}
                        variant="outline"
                        className="border-[#044D8E] text-[#044D8E] hover:bg-[#044D8E] hover:text-white"
                    >
                        Adres aanpassen
                    </Button>

                    <Button
                        onClick={() => (window.location.href = "/contact")}
                        className="bg-[#044D8E] hover:bg-[#1792D0]"
                    >
                        Neem contact op
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityError;