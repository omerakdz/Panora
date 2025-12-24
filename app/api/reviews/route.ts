import { NextResponse } from 'next/server';

// Tijdelijke mock data (later vervangen door Google API)
export const mockReviews = [
  {
    id: "1",
    rating: 5,
    comment: "Super tevreden! Snelle service en perfecte ramen. De online booking was zo makkelijk.",
    author: "Sarah D.",
    location: "Gent"
  },
  {
    id: "2",
    rating: 5,
    comment: "Eindelijk een ramenwasser die duidelijkheid geeft over de prijs. Geen verrassingen achteraf!",
    author: "Tom V.",
    location: "Merelbeke"
  },
  {
    id: "3",
    rating: 5,
    comment: "Professioneel werk en vriendelijke service. Mijn ramen hebben nog nooit zo glanzend geweest!",
    author: "Lisa M.",
    location: "Deinze"
  }
];

export async function GET() {
  try {
    // TODO: Later vervangen door Google Reviews API call
    // const googleReviews = await getGoogleReviews();
    
    return NextResponse.json(mockReviews, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(mockReviews); // Fallback naar mock data
  }
}