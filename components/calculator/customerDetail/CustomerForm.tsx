"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalculatorData } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface CustomerFormProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
    fieldErrors: { [key: string]: string };
    setFieldErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
}
const CustomerForm = ({ data, updateData, fieldErrors, setFieldErrors }: CustomerFormProps) => {
    return (
        <>
            <div>
                <Label htmlFor="customerName" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    Volledige naam *
                </Label>
                <Input
                    id="customerName"
                    type="text"
                    value={data.customerName}
                    onChange={(e) => {
                        updateData({ customerName: e.target.value });
                        if (fieldErrors.customerName) {
                            setFieldErrors(prev => ({ ...prev, customerName: "" } as { [key: string]: string }));
                        }
                    }}
                    className={`border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11 placeholder:text-gray-400 ${fieldErrors.customerName ? 'border-red-500' : ''}`}
                    placeholder="Bijv. Jan Jansen"
                    required
                />
                {fieldErrors.customerName && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.customerName}</p>
                )}
            </div>

            <div>
                <Label htmlFor="customerPhone" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    Telefoonnummer
                </Label>
                <Input
                    id="customerPhone"
                    type="tel"
                    value={data.customerPhone}
                    onChange={(e) => {
                        updateData({ customerPhone: e.target.value });
                        if (fieldErrors.contact) {
                            setFieldErrors(prev => ({ ...prev, contact: "" } as { [key: string]: string }));
                        }
                    }}
                    className={`border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11 placeholder:text-gray-400 ${fieldErrors.contact ? 'border-red-500' : ''}`}
                    placeholder="Bijv. 0476 12 34 56"
                />
            </div>

            <div>
                <Label htmlFor="customerEmail" className="text-[#044D8E] font-semibold text-sm md:text-base">
                    E-mailadres
                </Label>
                <Input
                    id="customerEmail"
                    type="email"
                    value={data.customerEmail}
                    onChange={(e) => {
                        updateData({ customerEmail: e.target.value });
                        if (fieldErrors.contact) {
                            setFieldErrors(prev => ({ ...prev, contact: "" } as { [key: string]: string }));
                        }
                    }}
                    className={`border-[#9FCAE3] focus:border-[#044D8E] h-10 md:h-11 placeholder:text-gray-400 ${fieldErrors.contact ? 'border-red-500' : ''}`}
                    placeholder="Bijv. jan.jansen@example.com"
                />
                {fieldErrors.contact && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.contact}</p>
                )}
                <p className="text-xs text-slate-500 mt-1">* Vul minimaal een telefoonnummer of e-mailadres in</p>
            </div>

            <div>
                <Label htmlFor="customerNotes" className="text-[#044D8E] font-semibold">
                    Opmerkingen (optioneel)
                </Label>
                <Textarea
                    id="customerNotes"
                    value={data.customerNotes}
                    onChange={(e) => updateData({ customerNotes: e.target.value })}
                    className="border-[#9FCAE3] focus:border-[#044D8E] min-h-[80px] placeholder:text-gray-400"
                    placeholder="Bijv. moeilijk bereikbare ramen, huisdieren, etc."
                />
            </div>
        </>
    )
}

export default CustomerForm;