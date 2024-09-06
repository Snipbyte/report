import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import BreakEven from "../../../../backend/models/GrossMargin";


const calculateGrossMargin = async (request) => {
  try {
    const { sellingPricePerUnit, costOfProductionPerUnit } = await request.json();

    if (sellingPricePerUnit === undefined || costOfProductionPerUnit === undefined) {
      return NextResponse.json(
        { message: "Both selling price and cost of production are required" },
        { status: 400 }
      );
    }

    // Gross margin calculations
    const grossMarginPerUnit = sellingPricePerUnit - costOfProductionPerUnit;
    const grossMarginPercentage = (grossMarginPerUnit / sellingPricePerUnit) * 100;

    return NextResponse.json(
      {
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
