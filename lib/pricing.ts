import type { CalculatorData } from "@/types";
import { PRICING } from "./constants";

/**
 * Subset of CalculatorData needed for price calculation
 */
export interface PriceCalculationData {
  propertyType: string;
  totalWindows: number;
  exteriorWindows: number;
  interiorExteriorWindows: number;
  hardToReach?: boolean;
  firstTimeInLong?: boolean;
  cleanFrames?: boolean;
}

/**
 * Calculate price with comprehensive validation
 * This is the ONLY authoritative price calculation function
 * Used by both client-side and server-side to ensure consistency
 */
export function calculatePrice(
  data: CalculatorData | PriceCalculationData,
): number {
  // Input validation
  if (!data || typeof data !== "object") {
    throw new Error("Invalid calculator data");
  }

  const exteriorWindows = Number(data.exteriorWindows) || 0;
  const interiorExteriorWindows = Number(data.interiorExteriorWindows) || 0;
  const totalWindows = Number(data.totalWindows) || 0;

  // Validate window counts
  if (exteriorWindows < 0 || interiorExteriorWindows < 0 || totalWindows < 1) {
    throw new Error("Invalid window counts");
  }

  if (exteriorWindows + interiorExteriorWindows !== totalWindows) {
    throw new Error(
      `Window count mismatch: ${exteriorWindows} + ${interiorExteriorWindows} ≠ ${totalWindows}`,
    );
  }

  // Validate reasonable limits
  if (totalWindows > 200) {
    throw new Error("Total windows exceeds maximum (200)");
  }

  let basePrice = 0;

  // Calculate base price from windows
  basePrice += exteriorWindows * PRICING.exteriorWindow;
  basePrice += interiorExteriorWindows * PRICING.interiorExteriorWindow;

  // Validate base price is not zero when windows exist
  if (basePrice === 0 && totalWindows > 0) {
    throw new Error("Base price calculation resulted in zero");
  }

  // Apply multipliers
  if (data.hardToReach === true) {
    basePrice *= PRICING.hardToReachMultiplier;
  }

  // Apply extras
  if (data.firstTimeInLong === true) {
    basePrice += PRICING.firstTimeExtra;
  }

  if (data.cleanFrames === true) {
    basePrice += PRICING.cleanFramesExtra;
  }

  // NOTE: BTW correctie is verwijderd op verzoek van eigenaar
  // Kantoren betalen dezelfde prijs als particulieren
  // Eigenaar regelt BTW zelf op de factuur

  // Round to 2 decimal places
  const finalPrice = Math.round(basePrice * 100) / 100;

  // Final sanity check
  if (finalPrice < 0 || !isFinite(finalPrice)) {
    throw new Error("Invalid price calculation result");
  }

  return finalPrice;
}

/**
 * Validate if a price matches the expected calculation
 * Returns true if price is correct (within 0.01 tolerance for rounding)
 */
export function validatePrice(
  data: CalculatorData | PriceCalculationData,
  priceToValidate: number,
): { valid: boolean; expectedPrice: number; difference: number } {
  const expectedPrice = calculatePrice(data);
  const difference = Math.abs(expectedPrice - priceToValidate);
  const valid = difference <= 0.01; // Allow 1 cent tolerance for rounding

  return {
    valid,
    expectedPrice,
    difference,
  };
}

export { PRICING };
