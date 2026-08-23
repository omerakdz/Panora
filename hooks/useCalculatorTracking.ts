import { CalculatorData } from "@/types";

export const useCalculatorTracking = (
  currentStep: number,
  data: CalculatorData,
) => {
  // NOTE: calculator_start event is now tracked in StepPropertyType on first property selection
  // This ensures it only fires on actual user interaction, not on page load

  // Track window_count_submit event
  const trackWindowCountSubmit = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      const eventData = {
        event: "window_count_submit",
        funnel_name: "calculator",
        total_windows: data.totalWindows,
        exterior_windows: data.exteriorWindows,
        interior_exterior_windows: data.interiorExteriorWindows,
      };
      window.dataLayer.push(eventData);
      if (process.env.NODE_ENV === "development") {
        console.log("📊 GTM Event pushed:", eventData);
      }
    }
  };

  // Track price_confirm event
  const trackPriceConfirm = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      const eventData = {
        event: "price_confirm",
        funnel_name: "calculator",
        service_type: data.windowService,
        property_type: data.propertyType,
        total_windows: data.totalWindows,
        exterior_windows: data.exteriorWindows,
        interior_exterior_windows: data.interiorExteriorWindows,
        has_hard_to_reach: data.hardToReach,
        has_first_time_long: data.firstTimeInLong,
        has_clean_frames: data.cleanFrames,
        price_value: data.calculatedPrice,
      };
      window.dataLayer.push(eventData);
      if (process.env.NODE_ENV === "development") {
        console.log("📊 GTM Event pushed:", eventData);
      }
    }
  };

  // Track lead_form_start event
  const trackLeadFormStart = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      const eventData = {
        event: "lead_form_start",
        funnel_name: "calculator",
      };
      window.dataLayer.push(eventData);
      if (process.env.NODE_ENV === "development") {
        console.log("📊 GTM Event pushed:", eventData);
      }
    }
  };

  return {
    trackWindowCountSubmit,
    trackPriceConfirm,
    trackLeadFormStart,
  };
};
