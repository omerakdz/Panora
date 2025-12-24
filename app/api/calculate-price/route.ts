import { NextResponse } from "next/server";
import { calculatePrice } from "@/lib/pricing";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (
      data.propertyType === undefined ||
      data.totalWindows === undefined ||
      data.exteriorWindows === undefined ||
      data.interiorExteriorWindows === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate window count logic
    if (data.exteriorWindows + data.interiorExteriorWindows !== data.totalWindows) {
      return NextResponse.json(
        { error: "Window count validation failed: exterior + interior/exterior must equal total" },
        { status: 400 }
      );
    }

    // Calculate price using server-side logic
    const price = calculatePrice(data);

    return NextResponse.json(
      {
        price,
        currency: "EUR",
        disclaimer: "Exacte prijs wordt bevestigd na inspectie.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating price:", error);
    return NextResponse.json(
      { error: "Failed to calculate price" },
      { status: 500 }
    );
  }
}
