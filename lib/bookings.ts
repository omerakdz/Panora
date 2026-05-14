import { supabaseAdmin } from "./supabase";
import type { Booking } from "@/types";

// Get all VALID bookings (with date and time)
export async function getBookings(): Promise<Booking[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error reading bookings from Supabase:", error);
      return [];
    }

    // Convert database format to Booking type
    const validBookings = (data || []).map((record: any) => ({
      id: record.id,
      customerName: record.customer_name,
      customerEmail: record.customer_email,
      customerPhone: record.customer_phone,
      customerAddress: record.customer_address,
      date: record.selected_date,
      time: record.selected_time,
      propertyType: record.property_type,
      totalWindows: record.total_windows,
      exteriorWindows: record.exterior_windows,
      interiorExteriorWindows: record.interior_exterior_windows,
      hardToReach: record.hard_to_reach,
      firstTimeInLong: record.first_time_in_long,
      cleanFrames: record.clean_frames,
      calculatedPrice: record.calculated_price,
      customerNotes: record.customer_notes,
      createdAt: record.created_at,
    }));

    return validBookings;
  } catch (error) {
    console.error("Error reading bookings:", error);
    return [];
  }
}

export async function getBookingsByDateRange(
  startDate: Date,
  endDate: Date,
): Promise<Booking[]> {
  try {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .gte("selected_date", start)
      .lte("selected_date", end)
      .order("selected_date", { ascending: true });

    if (error) {
      console.error("Error fetching bookings by date range:", error);
      return [];
    }

    return (data || []).map((record: any) => ({
      id: record.id,
      customerName: record.customer_name,
      customerEmail: record.customer_email,
      customerPhone: record.customer_phone,
      customerAddress: record.customer_address,
      date: record.selected_date,
      time: record.selected_time,
      propertyType: record.property_type,
      totalWindows: record.total_windows,
      exteriorWindows: record.exterior_windows,
      interiorExteriorWindows: record.interior_exterior_windows,
      hardToReach: record.hard_to_reach,
      firstTimeInLong: record.first_time_in_long,
      cleanFrames: record.clean_frames,
      calculatedPrice: record.calculated_price,
      customerNotes: record.customer_notes,
      createdAt: record.created_at,
    }));
  } catch (error) {
    console.error("Error in getBookingsByDateRange:", error);
    return [];
  }
}

export async function getBookingsByDate(date: string): Promise<Booking[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("selected_date", date)
      .order("selected_time", { ascending: true });

    if (error) {
      console.error("Error fetching bookings for date:", error);
      return [];
    }

    return (data || []).map((record: any) => ({
      id: record.id,
      customerName: record.customer_name,
      customerEmail: record.customer_email,
      customerPhone: record.customer_phone,
      customerAddress: record.customer_address,
      date: record.selected_date,
      time: record.selected_time,
      propertyType: record.property_type,
      totalWindows: record.total_windows,
      exteriorWindows: record.exterior_windows,
      interiorExteriorWindows: record.interior_exterior_windows,
      hardToReach: record.hard_to_reach,
      firstTimeInLong: record.first_time_in_long,
      cleanFrames: record.clean_frames,
      calculatedPrice: record.calculated_price,
      customerNotes: record.customer_notes,
      createdAt: record.created_at,
    }));
  } catch (error) {
    console.error("Error in getBookingsByDate:", error);
    return [];
  }
}

export async function getBookedSlotsForDate(date: string): Promise<string[]> {
  const bookings = await getBookingsByDate(date);
  return bookings.map((b) => b.time);
}

export async function isSlotAvailable(
  date: string,
  time: string,
): Promise<boolean> {
  const bookedSlots = await getBookedSlotsForDate(date);
  return !bookedSlots.includes(time);
}
