import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const getAllPlans = async (req) => {
  try {
    const { token } = await req.json(); // Expect token in the request body

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    // Verify and decode the JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Fetch all plans for the user
    const plans = await Plan.find({ userId }).select(
      "idea.projectName idea.typeOfActivity idea.address idea.launchDate createdAt"
    );

    if (!plans || plans.length === 0) {
      return NextResponse.json({ message: "No plans found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Plans retrieved successfully",
      plans: plans.map((plan) => ({
        _id: plan._id,
        projectName: plan.idea?.projectName || "Unknown",
        typeOfActivity: plan.idea?.typeOfActivity || "Unknown",
        address: plan.idea?.address || "Unknown",
        launchDate: plan.idea?.launchDate || null,
        createdAt: plan.createdAt,
      })),
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json({ message: "Failed to fetch plans", error: error.message }, { status: 500 });
  }
};

export const POST = connectDb(getAllPlans);