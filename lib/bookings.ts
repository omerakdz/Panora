import fs from 'fs';
import path from 'path';
import type { Booking } from '@/types';
import { BOOKINGS_FILE } from './constants';

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
  }
}

// Get all VALID bookings (with date and time)
export function getBookings(): Booking[] {
  try {
    ensureDataDirectory();
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    const allBookings = JSON.parse(data);
    
    // Filter out incomplete bookings
    const validBookings = allBookings.filter((b: any) => 
      b.date && b.time && b.customerName && b.customerEmail
    );
    
    console.log(`📊 Total entries: ${allBookings.length}, Valid bookings: ${validBookings.length}`);
    
    return validBookings;
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

export function getBookingsByDateRange(startDate: Date, endDate: Date): Booking[] {
  const bookings = getBookings();
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];
  
  return bookings.filter(booking => {
    return booking.date >= start && booking.date <= end;
  });
}

export function getBookingsByDate(date: string): Booking[] {
  const bookings = getBookings();
  const filtered = bookings.filter(booking => booking.date === date);
  console.log(`📅 Bookings for ${date}: ${filtered.length} found`);
  if (filtered.length > 0) {
    filtered.forEach(b => console.log(`   - ${b.time} | ${b.customerName}`));
  }
  return filtered;
}

export function addBooking(booking: Booking): boolean {
  try {
    ensureDataDirectory();
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    const allBookings = JSON.parse(data);
    
    // Check if slot is already taken (only among valid bookings)
    const isSlotTaken = allBookings.some((b: any) =>
      b.date === booking.date && 
      b.time === booking.time &&
      b.date && b.time // Only check entries with date and time
    );
    
    if (isSlotTaken) {
      console.error('❌ Slot already booked:', booking.date, booking.time);
      return false;
    }
    
    allBookings.push(booking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(allBookings, null, 2));
    console.log('✅ Booking added successfully');
    return true;
  } catch (error) {
    console.error('Error adding booking:', error);
    return false;
  }
}

export function deleteBooking(id: string): boolean {
  try {
    ensureDataDirectory();
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    const allBookings = JSON.parse(data);
    const filteredBookings = allBookings.filter((b: any) => b.id !== id);
    
    if (filteredBookings.length === allBookings.length) {
      return false;
    }
    
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(filteredBookings, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
}

export function getBookedSlotsForDate(date: string): string[] {
  const bookings = getBookingsByDate(date);
  const slots = bookings.map(b => b.time);
  console.log(`🔒 Booked slots for ${date}:`, slots);
  return slots;
}

export function isSlotAvailable(date: string, time: string): boolean {
  const bookedSlots = getBookedSlotsForDate(date);
  const available = !bookedSlots.includes(time);
  console.log(`🔍 Slot ${date} ${time}: ${available ? '✅ Available' : '❌ Taken'}`);
  return available;
}
