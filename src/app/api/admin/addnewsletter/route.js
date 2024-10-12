import { NextResponse } from "next/server";
import NewsletterModel from "../../../../../backend/models/NewsLetter";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const subscribeNewsletterHandler = async (request) => {
  try {
    const { email } = await request.json();

    // Check if the email already exists
    const existingSubscriber = await NewsletterModel.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Email is already subscribed." },
        { status: 400 }
      );
    }

    // Save new subscriber
    const newSubscriber = new NewsletterModel({
      email,
    });

    await newSubscriber.save();

    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during newsletter subscription:", error);
    return NextResponse.json(
      { message: "Failed to subscribe to the newsletter." },
      { status: 500 }
    );
  }
};

export const POST = connectDb(subscribeNewsletterHandler);
