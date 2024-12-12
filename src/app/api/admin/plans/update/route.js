import { NextResponse } from "next/server";
import dbConnect from "../../../../../../backend/middleware/db";
import Plan from "../../../../../../backend/models/plans";

const updatePlan = async (req) => {
  try {
    const { plan_id, price, description } = await req.json();

    if (!plan_id) {
      return NextResponse.json(
        { message: "Plan ID is required." },
        { status: 400 }
      );
    }

    const updatedFields = {};
    if (price) updatedFields.price = price;
    if (description) updatedFields.description = description;

    const updatedPlan = await Plan.findByIdAndUpdate(plan_id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlan) {
      return NextResponse.json({ message: "Plan not found." }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: updatedPlan },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json(
      { message: "Failed to update plan." },
      { status: 500 }
    );
  }
};

export const POST = dbConnect(updatePlan);
