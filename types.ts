//Calculator.tsx
export interface CalculatorData {
  propertyType:
    | "appartement"
    | "rijhuis"
    | "halfopen"
    | "vrijstaand"
    | "kantoor"
    | "";

  windowService: "exterior" | "premium" | "combination";

  exteriorWindows: number;
  interiorExteriorWindows: number;

  totalWindows: number;

  hardToReach: boolean;
  firstTimeInLong: boolean;
  cleanFrames: boolean;

  calculatedPrice: number;

  selectedDate: Date | null;
  selectedTime: string;

  selectedSlotStart?: string;
  selectedSlotEnd?: string;
  selectedSlotTitel?: string;
  selectedSlotBadge?: string;

  klantPinLatitude?: string;
  klantPinLongitude?: string;
  klantPinPrecisie?: string;

  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  customerNotes: string;
}

// confirmation page
export interface BookingDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  selectedDate: string;
  selectedTime: string;
  selectedSlotTitel?: string;
  calculatedPrice: number;
  propertyType: string;
  totalWindows: number;
  exteriorWindows: number;
  interiorExteriorWindows: number;
  hardToReach: boolean;
  firstTimeInLong: boolean;
  cleanFrames: boolean;
  confirmationMessage?: string;
}

// lib calendar.ts
export interface BookingSlot {
  date: string; // YYYY-MM-DD
  time: string; // "09:00 - 11:00"
  available: boolean;
}

// lib calendar.ts
export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity?: string;
  customerPostalCode?: string;
  date: string; // YYYY-MM-DD
  time: string;
  propertyType: string;
  totalWindows: number;
  exteriorWindows: number;
  interiorExteriorWindows: number;
  hardToReach: boolean;
  firstTimeInLong: boolean;
  cleanFrames: boolean;
  calculatedPrice: number;
  customerNotes?: string;
  createdAt: string;
  googleCalendarEventId?: string;
}

// mail.ts
export interface EmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity?: string;
  customerPostalCode?: string;
  selectedDate: Date;
  selectedTime: string;
  calculatedPrice: number;
  propertyType: string;
  totalWindows: number;
  exteriorWindows: number;
  interiorExteriorWindows: number;
  hardToReach: boolean;
  firstTimeInLong: boolean;
  cleanFrames: boolean;
  customerNotes?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  location: string;
}

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
}

export interface BookingData {
  customerEmail: string;
  customerName: string;
  bookingId: string;
}

export interface SlotData {
  datum?: string;
  start: string;
  end: string;
  titel: string;
  tijd: string;
  badge: string;
  uitleg: string;
  recommended: boolean;
}

export interface AvailabilityResponse {
  adres_geverifieerd: boolean;
  slots: SlotData[];
  meer_slots?: SlotData[];
  fallback?: SlotData[];
  top_pick?: SlotData;
  klant_pin?: {
    latitude: string;
    longitude: string;
    precisie: string;
  };
  boodschap?: string;
  code?: string;
  adres_suggestie?: {
    display_name: string;
  };
  meer_beschikbaar?: boolean;
}

export interface StepScheduleHandle {
  // true  = intern afgehandeld (4B -> 4A), ouder mag NIET van stap wisselen
  // false = we zitten al in 4A, ouder mag gewoon naar stap 3 gaan
  goBack: () => boolean;
}
