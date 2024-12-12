import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../../../../backend/models/user";
import Plan from "../../../../../../backend/models/plans";
import dbConnect from "../../../../../../backend/middleware/db";

const assignPlanToUser = async (req) => {
  try {
    await dbConnect();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Extract token from the Bearer scheme
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token: User ID not found" },
        { status: 400 }
      );
    }

    // Parse request body
    const { planId } = await req.json();
    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    // Fetch the user and plan
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json(
        { message: "Plan not found" },
        { status: 404 }
      );
    }

    // Assign the plan to the user
    user.plan = planId;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Plan assigned to user successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning plan to user:", error);
    return NextResponse.json(
      { message: "Failed to assign plan to user" },
      { status: 500 }
    );
  }
};

export const POST = assignPlanToUser;
