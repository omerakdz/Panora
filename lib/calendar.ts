import { addDays, isWeekend, setHours, setMinutes, format } from "date-fns";
import { TIME_SLOTS, EXCLUDED_DATES, CALENDAR_CONFIG } from "./constants";


// Check if a date is a working day
export function isWorkingDay(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return CALENDAR_CONFIG.workingDays.includes(dayOfWeek);
}

export function isDateAvailable(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Must be in the future (not today)
  if (date < today) return false;

  // Not too far in the future
  const maxDate = addDays(today, CALENDAR_CONFIG.maxBookingDays);
  if (date > maxDate) return false;

  if (!isWorkingDay(date)) return false;

  // Check if date is in excluded dates
  const isExcluded = EXCLUDED_DATES.some(
    (excludedDate) =>
      excludedDate.getFullYear() === date.getFullYear() &&
      excludedDate.getMonth() === date.getMonth() &&
      excludedDate.getDate() === date.getDate()
  );

  return !isExcluded;
}


export function getAvailableTimeSlots(date: Date, bookedSlots: string[] = []): string[] {
  if (!isDateAvailable(date)) return [];
  
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  
  const isToday = selectedDate.getTime() === today.getTime();
  
  return TIME_SLOTS.filter(slot => {
    // Check if slot is already booked
    if (bookedSlots.includes(slot)) return false;
    
    // If the selected date is today, check if the timeslot has passed
    if (isToday) {
      const { start } = parseTimeSlot(slot);
      const [hours, minutes] = start.split(':').map(Number);
      
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0, 0);
      
      // Block slot if it's in the past
      if (slotTime <= now) {
        return false;
      }
    }
    
    return true;
  });
}

export function isTimeSlotAvailable(date: Date, timeSlot: string, bookedSlots: string[]): boolean {
  if (!isDateAvailable(date)) return false;
  if (bookedSlots.includes(timeSlot)) return false;
  
  // Check if timeslot is in the past (for today)
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  
  const isToday = selectedDate.getTime() === today.getTime();
  
  if (isToday) {
    const { start } = parseTimeSlot(timeSlot);
    const [hours, minutes] = start.split(':').map(Number);
    
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    // Block if slot is in the past
    if (slotTime <= now) {
      return false;
    }
  }
  
  return true;
}

// Parse time slot to get start and end times
export function parseTimeSlot(timeSlot: string): { start: string; end: string } {
  const [start, end] = timeSlot.split(' - ');
  return { start, end };
}

// Convert date and time to ISO string
export function toISODateTime(date: string, time: string): string {
  const { start } = parseTimeSlot(time);
  const [hours, minutes] = start.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return dateTime.toISOString();
}


// for calendar display
export function getBlockedDates(): Date[] {
  return EXCLUDED_DATES;
}

export function addBlockedDate(date: Date): void {
  EXCLUDED_DATES.push(date);
}
