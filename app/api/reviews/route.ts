import { NextResponse } from 'next/server';

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
  };
  status: string;
  error_message?: string;
}

// Tijdelijke mock data als fallback
// export const mockReviews = [
//   {
//     id: "1",
//     rating: 5,
//     comment: "Super tevreden! Snelle service en perfecte ramen. De online booking was zo makkelijk.",
//     author: "Sarah D.",
//     location: "Gent"
//   },
//   {
//     id: "2",
//     rating: 5,
//     comment: "Eindelijk een ramenwasser die duidelijkheid geeft over de prijs. Geen verrassingen achteraf!",
//     author: "Tom V.",
//     location: "Merelbeke"
//   },
//   {
//     id: "3",
//     rating: 5,
//     comment: "Professioneel werk en vriendelijke service. Mijn ramen hebben nog nooit zo glanzend geweest!",
//     author: "Lisa M.",
//     location: "Deinze"
//   },
//   {
//     id: "4",
//     rating: 5,
//     comment: "Zeer correct en netjes gewerkt. De communicatie verliep vlot en de afspraak was precies op tijd!",
//     author: "Jan P.",
//     location: "Gentbrugge"
//   },
//   {
//     id: "5",
//     rating: 5,
//     comment: "Fantastisch resultaat! Ik boek zeker opnieuw. De osmose-techniek maakt echt een verschil.",
//     author: "Emma L.",
//     location: "Sint-Amandsberg"
//   },
//   {
//     id: "6",
//     rating: 5,
//     comment: "Heel tevreden over de service. Punctueel, professioneel en betaalbaar. Aanrader!",
//     author: "Kevin B.",
//     location: "Destelbergen"
//   },
//   {
//     id: "7",
//     rating: 5,
//     comment: "Uitstekende ervaring van begin tot eind. De calculator werkt perfect en het eindresultaat is top!",
//     author: "Sophie W.",
//     location: "Lochristi"
//   },
//   {
//     id: "8",
//     rating: 5,
//     comment: "Zeer vakkundig werk. Mijn ramen zijn kraakhelder en de service was vriendelijk en efficiënt.",
//     author: "Marc T.",
//     location: "Melle"
//   },
//   {
//     id: "9",
//     rating: 5,
//     comment: "Top service! Snel, betrouwbaar en perfect resultaat. De foto's na afloop zijn een leuke bonus.",
//     author: "Nina K.",
//     location: "De Pinte"
//   }
// ];

export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    console.log('🔍 Checking credentials...');
    console.log('Place ID:', placeId ? 'EXISTS' : 'MISSING');
    console.log('API Key:', apiKey ? 'EXISTS' : 'MISSING');
    
    if (!placeId || !apiKey) {
      console.error('❌ Missing Google credentials');
      return NextResponse.json({ error: 'Missing credentials', placeId: !!placeId, apiKey: !!apiKey });
    }
    
    console.log('📡 Fetching Google reviews...');
    
    // Haal echte Google reviews op
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    console.log('URL:', url.substring(0, 100) + '...');
    
    const response = await fetch(url, { 
      next: { revalidate: 3600 }
    });
    
    console.log('Response status:', response.status);
    
    const data: GooglePlaceDetailsResponse = await response.json();
    
    console.log('API Status:', data.status);
    if (data.error_message) {
      console.log('Error message:', data.error_message);
    }
    console.log('Reviews count:', data.result?.reviews?.length || 0);
    
    if (data.status !== 'OK' || !data.result?.reviews) {
      return NextResponse.json({ 
        error: 'Google API error', 
        status: data.status, 
        message: data.error_message,
        data: data
      });
    }
    
    // Transform Google reviews to our format
    const transformedReviews = data.result.reviews.map((review, index) => ({
      id: String(index + 1),
      rating: review.rating,
      comment: review.text,
      author: review.author_name,
      location: "Google Reviews"
    }));
    
    console.log(`✅ Returning ${transformedReviews.length} Google reviews`);
    
    return NextResponse.json(transformedReviews, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    return NextResponse.json({ error: 'Fetch failed', details: String(error) });
  }
}