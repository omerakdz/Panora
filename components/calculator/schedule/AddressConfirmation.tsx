"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

type AddressConfirmationProps = {
    suggestedAddress: string;
    handleAddressConfirmation: (confirmed: boolean) => void;
};

const AddressConfirmation = ({ suggestedAddress, handleAddressConfirmation }: AddressConfirmationProps) => {
    return (
        <div className="space-y-4">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
                <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Is dit jouw adres?
                </h4>

                <p className="text-amber-800 mb-4 text-lg">
                    {suggestedAddress}
                </p>

                <div className="flex gap-3">
                    <Button
                        onClick={() => handleAddressConfirmation(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                    >
                        Ja, dat klopt
                    </Button>

                    <Button
                        onClick={() => handleAddressConfirmation(false)}
                        variant="outline"
                        className="border-amber-600 text-amber-900 hover:bg-amber-100 flex-1"
                    >
                        Nee, aanpassen
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddressConfirmation;