import { NextResponse } from 'next/server';
import { sendReviewRequest } from '@/lib/send-review-email';

export async function POST(request: Request) {
  try {
    const { bookingId, customerEmail, customerName } = await request.json();

    // Validatie
    if (!bookingId || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Update booking status in database
    // await prisma.booking.update({
    //   where: { id: bookingId },
    //   data: { status: 'completed' }
    // });

    // Verstuur review verzoek direct (of gebruik een scheduler voor later)
    const emailResult = await sendReviewRequest({
      bookingId,
      customerEmail,
      customerName
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send review email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Booking marked as complete and review email sent'
    });

  } catch (error) {
    console.error('Error completing booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}