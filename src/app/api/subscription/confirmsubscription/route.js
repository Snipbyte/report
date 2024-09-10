import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Subscription from '../../../../../backend/models/subscription';
import stripe from 'stripe';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const confirmSubscription = async (request) => {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ message: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripeClient.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ message: 'Payment not successful' }, { status: 400 });
    }

    const subscription = await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: sessionId },
      {
        $set: {
          status: 'active',
          currentPeriodStart: new Date(session.current_period_start * 1000),
          currentPeriodEnd: new Date(session.current_period_end * 1000),
        },
      },
      { new: true }
    );

    if (!subscription) {
      return NextResponse.json({ message: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Error confirming subscription:', error);
    return NextResponse.json({ message: 'Failed to confirm subscription' }, { status: 500 });
  }
};

export const POST = connectDb(confirmSubscription);
