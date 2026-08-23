import { useEffect, useState } from "react";
import { CalculatorData } from "@/types";

interface UsePriceCalculationProps {
  data: CalculatorData;
  updateData: (data: Partial<CalculatorData>) => void;
}

export const usePriceCalculation = ({
  data,
  updateData,
}: UsePriceCalculationProps) => {
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      setIsCalculating(true);

      try {
        const response = await fetch("/api/calculate-price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to calculate price");
        }

        const result = await response.json();

        if (data.calculatedPrice !== result.price) {
          updateData({
            calculatedPrice: result.price,
          });
        }

        // Track price_view event - zonder PII
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];

          const eventData = {
            event: "price_view",
            funnel_name: "calculator",
            service_type: data.windowService,
            property_type: data.propertyType,
            total_windows: data.totalWindows,
            exterior_windows: data.exteriorWindows,
            interior_exterior_windows: data.interiorExteriorWindows,
            price_value: result.price,
          };

          window.dataLayer.push(eventData);

          if (process.env.NODE_ENV === "development") {
            console.log("📊 GTM Event pushed:", eventData);
          }
        }

        // Track below_minimum event if price is below €25
        if (result.price < 25 && typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];

          const belowMinimumEvent = {
            event: "below_minimum",
            funnel_name: "calculator",
            postal_code: data.customerPostalCode || "",
            calculated_value: result.price,
            total_windows: data.totalWindows,
          };

          window.dataLayer.push(belowMinimumEvent);

          if (process.env.NODE_ENV === "development") {
            console.log("📊 GTM Event pushed:", belowMinimumEvent);
          }
        }
      } catch (error) {
        console.error("Error calculating price:", error);
      } finally {
        setIsCalculating(false);
      }
    };

    fetchPrice();
  }, [
    data.exteriorWindows,
    data.interiorExteriorWindows,
    data.hardToReach,
    data.firstTimeInLong,
    data.cleanFrames,
    data.propertyType,
    data.totalWindows,
    updateData,
  ]);

  return {
    isCalculating,
  };
};
