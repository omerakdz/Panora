import { CalculatorData } from "@/types";

export const trackBookingSuccess = (data: CalculatorData) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const eventData = {
    event: "booking_request",
    funnel_name: "calculator",
    service_type: data.windowService,
    property_type: data.propertyType,
    total_windows: data.totalWindows,
    price_value: data.calculatedPrice,
  };

  window.dataLayer.push(eventData);

  if (process.env.NODE_ENV === "development") {
    console.log("📊 GTM Event pushed:", eventData);
  }
};

export const trackBookingError = (errorType: "api_error" | "network_error") => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const eventData = {
    event: "booking_error",
    funnel_name: "calculator",
    error_type: errorType,
  };

  window.dataLayer.push(eventData);

  if (process.env.NODE_ENV === "development") {
    console.log("📊 GTM Event pushed:", eventData);
  }
};
