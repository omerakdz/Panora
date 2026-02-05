import { createClient } from "@supabase/supabase-js";

// Client voor browser/client-side gebruik
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client voor server-side gebruik (met service_role key)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database types
export interface BookingRecord {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_postal_code: string;
  customer_notes: string;
  selected_date: string;
  selected_time: string;
  property_type: string;
  total_windows: number;
  exterior_windows: number;
  interior_exterior_windows: number;
  hard_to_reach: boolean;
  first_time_in_long: boolean;
  clean_frames: boolean;
  calculated_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}
