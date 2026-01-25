import type { GoogleReview } from "@/types";

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!placeId || !apiKey) {
      console.error('Missing Google credentials');
      return [];
    }
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { 
        next: { revalidate: 3600 }, // Cache voor 1 uur
        cache: 'force-cache'
      }
    );
    
    if (!response.ok) {
      console.error('Google API error:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      console.error('Google API returned error:', data.status, data.error_message);
      return [];
    }
    
    console.log('✅ Google reviews fetched:', data.result?.reviews?.length || 0);
    return data.result?.reviews || [];
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return [];
  }
}