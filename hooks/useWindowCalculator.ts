import { useEffect } from "react";
import { CalculatorData } from "@/types";
import { DEFAULT_WINDOWS } from "@/lib/constants";

interface UseWindowCalculatorProps {
  data: CalculatorData;
  updateData: (data: Partial<CalculatorData>) => void;
}

export const useWindowCalculator = ({
  data,
  updateData,
}: UseWindowCalculatorProps) => {
  useEffect(() => {
    const total = data.exteriorWindows + data.interiorExteriorWindows;

    const price =
      data.exteriorWindows * 2.5 + data.interiorExteriorWindows * 4.5;

    if (data.totalWindows !== total || data.calculatedPrice !== price) {
      updateData({
        totalWindows: total,
        calculatedPrice: price,
      });
    }
  }, [
    data.exteriorWindows,
    data.interiorExteriorWindows,
    data.totalWindows,
    data.calculatedPrice,
    updateData,
  ]);

  const changeCount = (
    field: "exteriorWindows" | "interiorExteriorWindows",
    amount: number,
  ) => {
    updateData({
      [field]: Math.max(0, data[field] + amount),
    });
  };

  const selectService = (service: CalculatorData["windowService"]) => {
    updateData({
      windowService: service,

      ...(service === "exterior" && {
        exteriorWindows: data.exteriorWindows || DEFAULT_WINDOWS,
        interiorExteriorWindows: 0,
      }),

      ...(service === "premium" && {
        interiorExteriorWindows:
          data.interiorExteriorWindows || DEFAULT_WINDOWS,
        exteriorWindows: 0,
      }),

      ...(service === "combination" && {
        exteriorWindows: data.exteriorWindows || DEFAULT_WINDOWS,
        interiorExteriorWindows:
          data.interiorExteriorWindows || DEFAULT_WINDOWS,
      }),
    });
  };

  return {
    changeCount,
    selectService,
  };
};
