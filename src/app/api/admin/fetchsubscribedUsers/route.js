// file: /pages/api/newsletter/fetchSubscribers.js
import { NextResponse } from "next/server";
import NewsletterModel from "../../../../../backend/models/NewsLetter";
import connectDb from "../../../../../backend/middleware/db";
require("dotenv").config();

const fetchSubscribedUsersHandler = async (request) => {
  try {
    // Fetch all subscribers from the database
    const subscribers = await NewsletterModel.find({});

    return NextResponse.json(
      { subscribers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subscribed users:", error);
    return NextResponse.json(
      { message: "Failed to fetch subscribers." },
      { status: 500 }
    );
  }
};

export const POST = connectDb(fetchSubscribedUsersHandler);
