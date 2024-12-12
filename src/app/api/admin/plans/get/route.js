import { NextResponse } from "next/server";
import dbConnect from "../../../../../../backend/middleware/db";
import Plan from "../../../../../../backend/models/plans";

const getPlan = async (req) => {
  const { id } = await req.json();
  try {
    const plan = await Plan.findById(id); 
    if (!plan) {
      return NextResponse.json({ success: false, message: "Plan not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: plan }, { status: 200 });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json({ message: "Failed to fetch plan." }, { status: 500 });
  }
};

export const POST = dbConnect(getPlan);
