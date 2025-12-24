import type { GoogleReview } from "@/types";

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache voor 1 uur
    );
    
    const data = await response.json();
    return data.result?.reviews || [];
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return [];
  }
}