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
        { status: 400 },
      );
    }

    // Validate data types
    if (
      typeof data.totalWindows !== "number" ||
      typeof data.exteriorWindows !== "number" ||
      typeof data.interiorExteriorWindows !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid data types for window counts" },
        { status: 400 },
      );
    }

    // Validate reasonable ranges
    if (
      data.totalWindows < 1 ||
      data.totalWindows > 200 ||
      data.exteriorWindows < 0 ||
      data.interiorExteriorWindows < 0
    ) {
      return NextResponse.json(
        { error: "Window count out of valid range (1-200 total)" },
        { status: 400 },
      );
    }

    // Validate window count logic
    if (
      data.exteriorWindows + data.interiorExteriorWindows !==
      data.totalWindows
    ) {
      return NextResponse.json(
        {
          error:
            "Window count validation failed: exterior + interior/exterior must equal total",
        },
        { status: 400 },
      );
    }

    // Validate boolean fields if present
    if (
      (data.hardToReach !== undefined &&
        typeof data.hardToReach !== "boolean") ||
      (data.firstTimeInLong !== undefined &&
        typeof data.firstTimeInLong !== "boolean") ||
      (data.cleanFrames !== undefined && typeof data.cleanFrames !== "boolean")
    ) {
      return NextResponse.json(
        { error: "Invalid data types for boolean fields" },
        { status: 400 },
      );
    }

    // Calculate price using server-side logic
    const price = calculatePrice(data);

    // Additional sanity check on calculated price
    const minimumPrice = 2.5; // At least 1 exterior window
    const maximumPrice = 2000; // Reasonable upper limit
    if (price < minimumPrice || price > maximumPrice) {
      console.error("Price calculation resulted in unreasonable value:", {
        price,
        data,
      });
      return NextResponse.json(
        { error: "Price calculation resulted in invalid value" },
        { status: 400 },
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Price calculated:", {
        price,
        totalWindows: data.totalWindows,
        exteriorWindows: data.exteriorWindows,
        interiorExteriorWindows: data.interiorExteriorWindows,
      });
    }

    return NextResponse.json(
      {
        price,
        currency: "EUR",
        disclaimer: "Exacte prijs wordt bevestigd na inspectie.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error calculating price:", error);
    return NextResponse.json(
      { error: "Failed to calculate price" },
      { status: 500 },
    );
  }
}
