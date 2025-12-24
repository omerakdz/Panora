import { Resend } from 'resend';
import type { BookingData } from '@/types';
import ReviewRequestEmail from '@/emails/ReviewRequest';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReviewRequest(booking: BookingData) {
  const googleReviewUrl = process.env.GOOGLE_REVIEW_URL || 'https://g.page/r/YOUR_BUSINESS_REVIEW_LINK';

  try {
    const { data, error } = await resend.emails.send({
      from: 'Panora <noreply@panora.be>',
      to: booking.customerEmail,
      subject: 'Hoe was onze service? 🌟',
      react: ReviewRequestEmail({
        customerName: booking.customerName,
        reviewUrl: googleReviewUrl
      })
    });

    if (error) {
      console.error('Error sending review email:', error);
      throw error;
    }

    console.log('Review email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send review email:', error);
    return { success: false, error };
  }
}