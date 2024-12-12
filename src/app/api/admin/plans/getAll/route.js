import { NextResponse } from "next/server";
import dbConnect from "../../../../../../backend/middleware/db";
import Plan from "../../../../../../backend/models/plans";

const getAllPlans = async () => {
    try {
      const plans = await Plan.find();
      return NextResponse.json({ success: true, data: plans }, { status: 200 });
    } catch (error) {
      console.error("Error fetching plans:", error);
      return NextResponse.json({ message: "Failed to fetch plans." }, { status: 500 });
    }
  };

  export const POST = dbConnect(getAllPlans);