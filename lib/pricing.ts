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

  return Math.round(basePrice * 100) / 100; 
}

export { PRICING };
