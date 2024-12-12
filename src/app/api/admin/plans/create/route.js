import { NextResponse } from "next/server";
import dbConnect from "../../../../../../backend/middleware/db";
import Plan from "../../../../../../backend/models/plans";

const createPlan = async (req) => {
  try {
    const { price, description, isPopular, points, productLink } = await req.json();

    if (!price || !description || !points || !productLink) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const newPlan = await Plan.create({
      price,
      description,
      isPopular: isPopular || false,
      points,
      productLink,
    });

    return NextResponse.json({ success: true, data: newPlan }, { status: 201 });
  } catch (error) {
    console.error("Error creating plan:", error);
    return NextResponse.json({ message: "Failed to create plan." }, { status: 500 });
  }
};

export const POST = dbConnect(createPlan);