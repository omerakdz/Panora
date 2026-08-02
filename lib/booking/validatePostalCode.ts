import {
  getPostalCodeErrorMessage,
  isPostalCodeAllowed,
} from "@/lib/constants";

export const validatePostalCode = (
  postalCode: string,
  calculatedPrice: number,
) => {
  if (isPostalCodeAllowed(postalCode)) {
    return { valid: true };
  }

  const errorInfo = getPostalCodeErrorMessage(calculatedPrice);

  return {
    valid: false,
    ...errorInfo,
  };
};
