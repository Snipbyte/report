import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import BusinessPlan from "../../../../backend/models/BusinessPlan";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic'; // Marks the route as dynamic

const getBusinessPlansByUser = async (request) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Extract token from the Bearer scheme
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token: User ID not found" },
        { status: 400 }
      );
    }

    // Find business plans associated with the user
    const businessPlans = await BusinessPlan.find({ user: userId });

    if (!businessPlans || businessPlans.length === 0) {
      return NextResponse.json(
        { message: "No business plans found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Business plans retrieved successfully", businessPlans },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error retrieving business plans:", error);

    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to retrieve business plans" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getBusinessPlansByUser);
