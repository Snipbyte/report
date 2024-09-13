import connectDb from '../../../../../backend/middleware/db';
import User from '../../../../../backend/models/user';
import stripe from 'stripe';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const helper = async (request) => {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");
  
    let event;
  
    try {
      event = stripeClient.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = await stripeClient.checkout.sessions.retrieve(
            event.data.object.id,
            { expand: ["line_items"] }
          );
          const customerId = session.customer;
          const customerDetails = session.customer_details;
  
          if (customerDetails?.email) {
            const user = await User.findOne({ email: customerDetails.email });
  
            if (!user) {
              throw new Error("User not found");
            }
  
            const lineItems = session.line_items.data;
            let currentPlan;
  
            // Determine the plan based on the price ID
            for (const item of lineItems) {
              const priceId = item.price.id;
              if (priceId === process.env.STRIPE_INTRO_PRICE_ID) {
                currentPlan = 'intro';
              } else if (priceId === process.env.STRIPE_BASE_PRICE_ID) {
                currentPlan = 'base';
              } else if (priceId === process.env.STRIPE_POPULAR_PRICE_ID) {
                currentPlan = 'popular';
              } else if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
                currentPlan = 'enterprise';
              } else {
                throw new Error("Invalid priceId");
              }
            }
  
            // Update user's current plan
            user.currentPlan = currentPlan;
            await user.save();
          }
          break;
        }
  
        case "customer.subscription.deleted": {
          const subscription = event.data.object;
          const user = await User.findOne({ stripeCustomerId: subscription.customer });
  
          if (user) {
            user.currentPlan = null;
            await user.save();
          } else {
            console.error("User not found for the subscription deleted event.");
            throw new Error("User not found for the subscription deleted event.");
          }
          break;
        }
  
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error("Error handling event", error);
      return new Response("Webhook Error", { status: 400 });
    }
  
    return new Response('Success', { status: 200 });
  };

export const POST = connectDb(helper);
