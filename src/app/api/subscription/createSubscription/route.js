import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Subscription from '../../../../../backend/models/subscription';
import stripe from 'stripe';
import jwt from "jsonwebtoken";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const createSubscription = async (request) => {
  try {
    const { priceId } = await request.json();

    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(JSON.stringify(decodedToken));
    const userId = decodedToken.id;

    if (!priceId || !userId) {
      return NextResponse.json({ message: 'Price ID and User ID are required' }, { status: 400 });
    }

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/fail`,
      metadata: { userId },
    });

    const subscription = new Subscription({
      userId,
      stripeSubscriptionId: session.id,
      stripePriceId: priceId,
      status: 'pending',
      currentPeriodStart: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    });

    await subscription.save();

    return NextResponse.json({ sessionId: session.id }, { status: 200 });

  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ message: 'Failed to create subscription' }, { status: 500 });
  }
};

export const POST = connectDb(createSubscription);
