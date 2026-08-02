"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalculatorData } from "@/types";
import {
  getPostalCodeErrorMessage,
  isPostalCodeAllowed,
} from "@/lib/constants";
import { validateBookingForm } from "@/lib/booking/validateBookingForm";
import { buildBookingPayload } from "@/lib/booking/buildBookingPayload";
import { handleBookingResponse } from "@/lib/booking/handleBookingResponse";
import { submitBooking } from "@/lib/booking/submitBooking";
import { trackBookingError } from "@/lib/booking/tracking";

export const useBookingSubmit = (data: CalculatorData) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [postalCodeError, setPostalCodeError] = useState("");
  const [showContactLink, setShowContactLink] = useState(false);
  const [contactUrl, setContactUrl] = useState("");
  const [contactButtonText, setContactButtonText] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBookingForm(data, privacyAccepted, setFieldErrors)) {
      return;
    }

    setFieldErrors({});

    // Valideer postcode voordat we submitten
    if (!isPostalCodeAllowed(data.customerPostalCode)) {
      const errorInfo = getPostalCodeErrorMessage(data.calculatedPrice);
      setPostalCodeError(errorInfo.message);
      setShowContactLink(errorInfo.showContactLink);
      setContactUrl(errorInfo.contactUrl || "");
      setContactButtonText(errorInfo.contactButtonText || "");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload = buildBookingPayload(data);

      console.log("📤 Sending booking request...");

      const response = await submitBooking(bookingPayload);

      await handleBookingResponse(response, data, router, setFieldErrors);
    } catch (error) {
      trackBookingError("network_error");
      console.error("❌ Error submitting booking:", error);
      console.error("Error details:", {
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
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
  };
};
