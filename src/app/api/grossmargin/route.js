import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import GrossMargin from "../../../../backend/models/GrossMargin";

const calculateGrossMargin = async (request) => {
  try {
    const { product, sellingPrice, productionCost } = await request.json();

    if (!product || sellingPrice === undefined || productionCost === undefined) {
      return NextResponse.json(
        { message: "All inputs (product name, selling price, and production cost) are required" },
        { status: 400 }
      );
    }

    const grossMarginPerUnit = sellingPrice - productionCost;
    const grossMarginPercentage = (grossMarginPerUnit / sellingPrice) * 100;

    const grossMargin = new GrossMargin({
      product,
      sellingPrice,
      productionCost,
      grossMargin: grossMarginPerUnit,
      grossMarginPercentage: grossMarginPercentage.toFixed(2),
    });

    await grossMargin.save();

    return NextResponse.json(
      {
        product,
        grossMarginPerUnit: grossMarginPerUnit.toFixed(2),
        grossMarginPercentage: grossMarginPercentage.toFixed(2)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating gross margin:", error);
    return NextResponse.json(
      { message: "Calculation failed" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateGrossMargin);
