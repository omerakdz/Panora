//Calculator.tsx
export interface CalculatorData {
  propertyType:
    | "appartement"
    | "rijhuis"
    | "halfopen"
    | "vrijstaand"
    | "kantoor"
    | "";

  totalWindows: number;
  exteriorWindows: number;
  interiorExteriorWindows: number;

  // extras
  hardToReach: boolean;
  firstTimeInLong: boolean;
  cleanFrames: boolean;

  calculatedPrice: number;

  // Schedule
  selectedDate: Date | null;
  selectedTime: string;

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
  calculatedPrice: number;
  propertyType: string;
  totalWindows: number;
  exteriorWindows: number;
  interiorExteriorWindows: number;
  hardToReach: boolean;
  firstTimeInLong: boolean;
  cleanFrames: boolean;
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
