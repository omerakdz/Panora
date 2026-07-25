"use client";
import { CalculatorData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddressFormProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
    fieldErrors: { [key: string]: string };
    setFieldErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    onSubmit: (e: React.FormEvent) => void;
}

const AddressForm = ({ data, updateData, fieldErrors, setFieldErrors, onSubmit }: AddressFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4">
                Vul je adres in om beschikbare momenten te zien
            </p>

            <div>
                <label htmlFor="address" className="block text-[#044D8E] font-semibold mb-2 text-sm md:text-base">
                    Straat en huisnummer *
                </label>
                <Input
                    id="address"
                    type="text"
                    value={data.customerAddress}
                    onChange={(e) => {
                        updateData({ customerAddress: e.target.value });
                        if (fieldErrors.customerAddress) {
                            setFieldErrors(prev => ({ ...prev, customerAddress: "" }));
                        }
                    }}
                    className={`placeholder:text-slate-400 placeholder:italic ${fieldErrors.customerAddress ? 'border-red-500' : ''}`}
                    placeholder="Bijv. Korte Nieuwstraat 12"
                />
                {fieldErrors.customerAddress && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.customerAddress}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="postalCode" className="block text-[#044D8E] font-semibold mb-2 text-sm md:text-base">
                        Postcode *
                    </label>
                    <Input
                        id="postalCode"
                        type="text"
                        value={data.customerPostalCode}
                        onChange={(e) => {
                            updateData({ customerPostalCode: e.target.value });
                            if (fieldErrors.customerPostalCode) {
                                setFieldErrors(prev => ({ ...prev, customerPostalCode: "" }));
                            }
                        }}
                        className={`placeholder:text-slate-400 placeholder:italic ${fieldErrors.customerPostalCode ? 'border-red-500' : ''}`}
                        placeholder="Bijv. 9000"
                        maxLength={4}
                    />
                    {fieldErrors.customerPostalCode && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.customerPostalCode}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="city" className="block text-[#044D8E] font-semibold mb-2 text-sm md:text-base">
                        Gemeente *
                    </label>
                    <Input
                        id="city"
                        type="text"
                        value={data.customerCity}
                        onChange={(e) => {
                            updateData({ customerCity: e.target.value });
                            if (fieldErrors.customerCity) {
                                setFieldErrors(prev => ({ ...prev, customerCity: "" }));
                            }
                        }}
                        className={`placeholder:text-slate-400 placeholder:italic ${fieldErrors.customerCity ? 'border-red-500' : ''}`}
                        placeholder="Bijv. Gent"
                    />
                    {fieldErrors.customerCity && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.customerCity}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1792D0] to-[#044D8E] hover:from-[#0F61AC] hover:to-[#033465] text-white font-semibold py-3 text-lg transition-all duration-300 hover:shadow-lg"
            >
                Beschikbare momenten tonen
            </Button>
        </form>
    );
};

export default AddressForm;