"use client";

import { CalculatorData } from "@/types";
import PrivacySection from "./customerDetail/PrivacySection";
import CustomerForm from "./customerDetail/CustomerForm";
import AppointmentSummary from "./customerDetail/AppointmentSummary";
import FormErrors from "./customerDetail/FormErrors";
import PostalCodeError from "./customerDetail/PostalCodeError";
import SubmitButton from "./customerDetail/SubmitButton";
import { useBookingSubmit } from "@/hooks/useBooking";

interface StepCustomerDetailsProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
    nextStep: () => void;
}

export default function StepCustomerDetails({ data, updateData, nextStep, }: StepCustomerDetailsProps) {
    const {
        handleSubmit,
        isSubmitting,
        fieldErrors,
        setFieldErrors,
        privacyAccepted,
        setPrivacyAccepted,
        postalCodeError,
        showContactLink,
        contactUrl,
        contactButtonText,
    } = useBookingSubmit(data);

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-md mx-auto">
            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4 md:mb-6">
                Vul je gegevens in om de afspraak te bevestigen
            </p>

            <AppointmentSummary data={data} />

            <CustomerForm
                data={data}
                updateData={updateData}
                fieldErrors={fieldErrors}
                setFieldErrors={setFieldErrors}
            />

            <PrivacySection
                privacyAccepted={privacyAccepted}
                setPrivacyAccepted={setPrivacyAccepted}
                fieldErrors={fieldErrors}
                setFieldErrors={setFieldErrors}
            />

            <PostalCodeError
                error={postalCodeError}
                showContactLink={showContactLink}
                contactUrl={contactUrl}
                contactButtonText={contactButtonText}
            />

            <FormErrors error={fieldErrors.form} />

            <SubmitButton isSubmitting={isSubmitting} />
        </form>
    );
}
