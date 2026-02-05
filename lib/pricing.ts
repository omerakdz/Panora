import type { CalculatorData } from "@/types";
import { PRICING } from "./constants";

export function calculatePrice(data: CalculatorData): number {
  let basePrice = 0;

  // Calculate base price from windows
  basePrice += data.exteriorWindows * PRICING.exteriorWindow;
  basePrice += data.interiorExteriorWindows * PRICING.interiorExteriorWindow;

  if (data.hardToReach) {
    basePrice *= PRICING.hardToReachMultiplier;
  }

  if (data.firstTimeInLong) {
    basePrice += PRICING.firstTimeExtra;
  }

  if (data.cleanFrames) {
    basePrice += PRICING.cleanFramesExtra;
  }

  // For kantoor/handelszaak,  excluding BTW (divide by 1.21)
  if (data.propertyType === "kantoor") {
    basePrice = basePrice / 1.21;
  }

  return Math.round(basePrice * 100) / 100;
}

export { PRICING };
