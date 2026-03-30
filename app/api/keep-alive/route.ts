import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Keep-alive endpoint om Supabase database actief te houden
 * Deze endpoint moet elke week automatisch aangeroepen worden
 */
export async function GET() {
  try {
    // Simpele query om database actief te houden
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Keep-alive query failed:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Database is active",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
