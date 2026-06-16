import { NextResponse } from "next/server";

interface GooglePlaceReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

interface GooglePlaceDetailsResponse {
  result?: {
    reviews?: GooglePlaceReview[];
    user_ratings_total?: number;
  };
  status: string;
  error_message?: string;
}

// Echte Google reviews - hardcoded als fallback wanneer Google API niet werkt
const mockReviews = [
  {
    id: "1",
    rating: 5,
    comment:
      "Hartelijk dank voor de snelle reactie, de positieve houding en de grote beschikbaarheid.",
    author: "DailyHappyVibes LuxaladGent",
    location: "Google Reviews",
  },
  {
    id: "2",
    rating: 5,
    comment:
      "Een correcte voorafgaande inspectie met voorafgakende prijs. Snelle service, goed werk en lage prijs. Heel tevreden.",
    author: "Kurt De Taeye",
    location: "Google Reviews",
  },
  {
    id: "3",
    rating: 5,
    comment:
      "Matti is altijd stipt op zijn afspraak, ramen wassen doet hij snel en correct. Een echte topper voor je ramen.",
    author: "Wesley Filez",
    location: "Google Reviews",
  },
  {
    id: "4",
    rating: 5,
    comment:
      "Mijn ramen, deuren en rolluiken werden gewassen door een vriendelijk en vakbekwaam team aan een zeer schappelijke prijs!",
    author: "Roger Van Damme",
    location: "Google Reviews",
  },
  {
    id: "5",
    rating: 5,
    comment: "Bedankt voor uw snelle service 👌🏻",
    author: "ersan cevirgen",
    location: "Google Reviews",
  },
  {
    id: "6",
    rating: 5,
    comment: "Prijs kwaliteit op en top!",
    author: "NICO DE BUCK",
    location: "Google Reviews",
  },
  {
    id: "7",
    rating: 5,
    comment:
      "Heel tevreden over de service! De ramen zijn perfect schoon en de communicatie verliep vlot en vriendelijk!",
    author: "Jenka Barakina",
    location: "Google Reviews",
  },
  {
    id: "8",
    rating: 5,
    comment:
      "Zeer tevreden over de werkzaamheden van Panora Glazenwasser! Alles werd perfect uitgevoerd, met oog voor detail. De communicatie verliep zeer vlot.",
    author: "Toon Rombaut",
    location: "Google Reviews",
  },
  {
    id: "9",
    rating: 5,
    comment: "Professioneel, vriendelijk en bekwaam. Alles tip top in orde.",
    author: "Els Bouckaert",
    location: "Google Reviews",
  },
  {
    id: "10",
    rating: 5,
    comment:
      "Professionele service. Knap werk afgeleverd en op tijd zoals afgesproken.",
    author: "Lieven Vandecaveye",
    location: "Google Reviews",
  },
  {
    id: "11",
    rating: 5,
    comment:
      "Zeer goede en perfecte service. Maakt tijd voor een goede opstart. Heel flexibel. Ik maakte alvast mijn tweede afspraak.",
    author: "Dalila Bouchema",
    location: "Google Reviews",
  },
  {
    id: "12",
    rating: 5,
    comment:
      "Ik boekte enkele weken geleden een afspraak voor mijn ruiten. Super content met het resultaat en de service ☺️ Doe zo verder ideale ruitenwasser",
    author: "Beauty Libre",
    location: "Google Reviews",
  },
  {
    id: "13",
    rating: 5,
    comment:
      "Het was de eerste keer en ik moet zeggen ...ik ben super tevreden, ze nemen hun tijd en alles is gedaan...omlijsting..plekjes vd vliegen...alles werd grondig aangepakt en heel sympathiek...ons volgende afspraak is al gemaakt",
    author: "Cindy Uitterhaegen",
    location: "Google Reviews",
  },
  {
    id: "14",
    rating: 5,
    comment:
      "Op het afgesproken uur verscheen er een zeer vriendelijke en beleefde persoon. Ramen waren zeer vuil en zie hoe ze blinken 🥰",
    author: "San Vavo",
    location: "Google Reviews",
  },
  {
    id: "15",
    rating: 5,
    comment: "",
    author: "Baets Aissati",
    location: "Google Reviews",
  },
];

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    console.log("🔍 Checking credentials...");
    console.log("Place ID:", placeId ? "EXISTS" : "MISSING");
    console.log("API Key:", apiKey ? "EXISTS" : "MISSING");

    if (!placeId || !apiKey) {
      console.log(
        "⚠️  Missing Google credentials, using fallback mock reviews",
      );
      return NextResponse.json(mockReviews, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }

    console.log("📡 Fetching Google reviews from server-side...");

    // Gebruik Google Places API vanaf de server met Nederlandse taal en alle reviews
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&language=nl&reviews_sort=newest&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ HTTP error:", response.status, errorText);
      console.log("⚠️  Using fallback mock reviews");
      return NextResponse.json(mockReviews, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }

    const data: GooglePlaceDetailsResponse = await response.json();

    console.log("API Status:", data.status);
    if (data.error_message) {
      console.error("❌ Google API error:", data.error_message);

      // Specifieke foutmelding voor referer restrictions
      if (data.error_message.includes("referer restrictions")) {
        console.error("⚠️  API key heeft referer restrictions. Los dit op:");
        console.error("   1. Ga naar Google Cloud Console");
        console.error("   2. API & Services > Credentials");
        console.error("   3. Kies je API key");
        console.error('   4. Verwijder "HTTP referrers" restrictie OF');
        console.error(
          "   5. Maak een nieuwe key zonder restrictions voor server-side gebruik",
        );
      }
    }

    if (data.status !== "OK") {
      console.log("⚠️  Google API error, using fallback mock reviews");
      return NextResponse.json(mockReviews, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }

    if (!data.result?.reviews) {
      console.log("⚠️  No reviews found");
      return NextResponse.json([], {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }

    console.log(
      `📊 Total reviews available: ${data.result.user_ratings_total || "unknown"}`,
    );
    console.log(`📥 Reviews received from API: ${data.result.reviews.length}`);

    // Transform Google reviews to our format
    const transformedReviews = data.result.reviews.map((review, index) => ({
      id: String(index + 1),
      rating: review.rating,
      comment: review.text,
      author: review.author_name,
      location: "Google Reviews",
    }));

    console.log(`✅ Returning ${transformedReviews.length} Google reviews`);

    return NextResponse.json(transformedReviews, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    console.log("⚠️  Using fallback mock reviews");
    return NextResponse.json(mockReviews, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  }
}
