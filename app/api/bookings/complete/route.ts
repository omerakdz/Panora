import { NextResponse } from 'next/server';
// import { sendReviewRequest } from '@/lib/send-review-email'; // Disabled - no automatic review emails

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

    // Review emails zijn uitgeschakeld - admin wil geen automatische emails
    // const emailResult = await sendReviewRequest({
    //   bookingId,
    //   customerEmail,
    //   customerName
    // });

    return NextResponse.json({ 
      success: true,
      message: 'Booking marked as complete'
    });

  } catch (error) {
    console.error('Error completing booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}