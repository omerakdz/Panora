"use client";

import { forwardRef, useImperativeHandle } from "react";
import { CalculatorData, StepScheduleHandle } from "@/types";
import { useAvailability } from "@/hooks/useAvailability";

import AddressForm from "./schedule/AddressForm";
import AddressConfirmation from "./schedule/AddressConfirmation";
import AvailabilityLoading from "./schedule/AvailabilityLoading";
import AvailabilityError from "./schedule/AvailabilityError";
import LocationSummary from "./schedule/LocationSummary";
import AvailabilityCalendar from "./schedule/AvailabilityCalendar";
import TimeSlotPicker from "./schedule/TimeSlotPicker";

interface StepScheduleProps {
    data: CalculatorData;
    updateData: (data: Partial<CalculatorData>) => void;
}

const StepSchedule = forwardRef<StepScheduleHandle, StepScheduleProps>(function StepSchedule({ data, updateData }, ref) {
    const {
        loading,
        loadingTimeSlots,
        availabilityData,
        selectedDate,
        availableSlots,
        isRecommendedDay,
        error,
        needsAddressConfirmation,
        suggestedAddress,
        showAddressForm,
        fieldErrors,
        setFieldErrors,
        currentMonth,
        setCurrentMonth,
        handleDateSelect,
        handleTimeSelect,
        handleAddressSubmit,
        handleAddressConfirmation,
        handleRefresh,
        handleEditAddress,
        modifiers,
        modifiersClassNames,
        isDateDisabled,
    } = useAvailability(data, updateData);

    // Expose "goBack" aan de parent Calculator (voor de "Vorige"-knop)
    useImperativeHandle(ref, () => ({
        goBack: () => {
            if (!showAddressForm) {
                handleEditAddress();
                return true; // intern afgehandeld, blijf op stap 4
            }
            return false; // we zitten al in 4A, ouder mag naar stap 3
        }
    }), [showAddressForm, handleEditAddress]);

    // Stap 4A: adresformulier
    if (showAddressForm) {
        return (
            <AddressForm
                data={data}
                updateData={updateData}
                fieldErrors={fieldErrors}
                setFieldErrors={setFieldErrors}
                onSubmit={handleAddressSubmit}
            />
        );
    }

    // Stap 4B: laden
    if (loading) {
        return <AvailabilityLoading />;
    }

    // Stap 4B: adres bevestigen
    if (needsAddressConfirmation) {
        return (
            <AddressConfirmation
                suggestedAddress={suggestedAddress}
                handleAddressConfirmation={handleAddressConfirmation}
            />
        );
    }

    // Stap 4B: foutstate
    if (error) {
        return (
            <AvailabilityError
                message={error}
                onEditAddress={handleEditAddress}
            />
        );
    }

    // Nog geen data
    if (!availabilityData) {
        return (
            <div className="text-center py-8">
                <p className="text-slate-600">Laden...</p>
            </div>
        );
    }

    // Stap 4C: kalender + tijdslots
    return (
        <div className="space-y-4 md:space-y-6">
            <LocationSummary
                address={data.customerAddress}
                postalCode={data.customerPostalCode}
                city={data.customerCity}
                onEdit={handleEditAddress}
            />

            <p className="text-center text-[#0F61AC] text-sm md:text-base mb-4 md:mb-6">
                Selecteer een datum en tijdslot voor je afspraak
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <AvailabilityCalendar
                    selectedDate={selectedDate}
                    onSelect={handleDateSelect}
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    isDisabled={isDateDisabled}
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                />

                <TimeSlotPicker
                    selectedDate={selectedDate}
                    availableSlots={availableSlots}
                    loadingTimeSlots={loadingTimeSlots}
                    isRecommendedDay={isRecommendedDay}
                    selectedTime={data.selectedTime}
                    onSelectSlot={handleTimeSelect}
                    onRefresh={handleRefresh}
                    refreshing={loading}
                />
            </div>

            {data.selectedDate && data.selectedTime && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 text-center">
                    <p className="text-green-800 text-sm md:text-base">
                        ✓ Je hebt gekozen voor{" "}
                        <strong>
                            {data.selectedDate.toLocaleDateString("nl-BE")} om {data.selectedTime}
                        </strong>
                    </p>
                </div>
            )}
        </div>
    );
});

export default StepSchedule;