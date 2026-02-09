/**
 * Sanitize user input to prevent XSS attacks
 * Escapes HTML special characters
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitize input for email addresses
 * Allows only valid email characters
 */
export function sanitizeEmail(email: string): string {
  // Remove any characters that aren't valid in email addresses
  return email
    .replace(/[^\w\s@.-]/gi, "")
    .trim()
    .toLowerCase();
}

/**
 * Sanitize phone number
 * Allows only digits, spaces, +, -, and ()
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+\-() ]/g, "").trim();
}

/**
 * Sanitize general text input
 * Removes potentially dangerous characters while keeping text readable
 */
export function sanitizeText(text: string): string {
  // Remove control characters and normalize whitespace
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Validate and sanitize booking data
 */
export function sanitizeBookingData(data: any) {
  return {
    customerName: sanitizeText(data.customerName || ""),
    customerEmail: sanitizeEmail(data.customerEmail || ""),
    customerPhone: sanitizePhone(data.customerPhone || ""),
    customerAddress: sanitizeText(data.customerAddress || ""),
    customerCity: sanitizeText(data.customerCity || ""),
    customerPostalCode: sanitizeText(data.customerPostalCode || ""),
    customerNotes: sanitizeText(data.customerNotes || ""),
    // Keep other fields as is (they're controlled inputs)
    selectedDate: data.selectedDate,
    selectedTime: data.selectedTime,
    propertyType: data.propertyType,
    totalWindows: data.totalWindows,
    exteriorWindows: data.exteriorWindows,
    interiorExteriorWindows: data.interiorExteriorWindows,
    hardToReach: data.hardToReach,
    firstTimeInLong: data.firstTimeInLong,
    cleanFrames: data.cleanFrames,
    calculatedPrice: data.calculatedPrice,
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  // Allow international formats
  const phoneRegex = /^[\d\s+\-()]{8,20}$/;
  return phoneRegex.test(phone);
}
