import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import User from "../../../../../backend/models/user";
import BusinessPlan from "../../../../../backend/models/BusinessPlan";

// API handler to fetch all business plans (reports)
const getAllBusinessPlansHandler = async () => {
  try {
    // Fetch all business plans and populate the user field, excluding the password
    const businessPlans = await BusinessPlan.find()
      .populate({
        path: 'user',
        select: '-password -email' // Exclude password and email
      })
      .exec();

    // Check if any business plans exist
    if (!businessPlans.length) {
      return NextResponse.json(
        { message: "No business plans found" },
        { status: 404 }
      );
    }

    // Return the list of business plans
    return NextResponse.json(
      {
        message: "Business plans retrieved successfully",
        businessPlans
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching business plans:", error);
    return NextResponse.json(
      { message: "Error fetching business plans" },
      { status: 500 }
    );
  }
};

// Export the GET request handler
export const GET = connectDb(getAllBusinessPlansHandler);
