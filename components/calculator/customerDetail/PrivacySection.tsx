"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";


interface PrivacySectionProps {
    privacyAccepted: boolean;
    setPrivacyAccepted: Dispatch<SetStateAction<boolean>>;
    fieldErrors: { [key: string]: string };
    setFieldErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const PrivacySection = ({ privacyAccepted, setPrivacyAccepted, fieldErrors, setFieldErrors }: PrivacySectionProps) => {
    return (
        <>
            <div className="flex items-start space-x-2 pt-2 border-t border-slate-200">
                <Checkbox
                    id="privacyAccepted"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => {
                        setPrivacyAccepted(checked as boolean);
                        if (fieldErrors.privacy) {
                            setFieldErrors(prev => ({ ...prev, privacy: "" }));
                        }
                    }}
                    className={`mt-1 ${fieldErrors.privacy ? 'border-red-500' : ''}`}
                    required
                />
                <div>
                    <label
                        htmlFor="privacyAccepted"
                        className="text-sm text-slate-700 cursor-pointer"
                    >
                        Ik ga akkoord met het{" "}
                        <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#044D8E] underline hover:text-[#1792D0]"
                        >
                            privacybeleid
                        </a>
                        {" "}van Panora *
                    </label>
                    {fieldErrors.privacy && (
                        <p className="text-red-600 text-xs mt-1">{fieldErrors.privacy}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default PrivacySection;