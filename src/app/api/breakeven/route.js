import { NextResponse } from "next/server";
import BreakEven from "../../../../backend/models/BreakEven";
import connectDb from "../../../../backend/middleware/db";

const calculateBreakEven = async (request) => {
  try {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit } = await request.json();

    if (!fixedCosts || !variableCostPerUnit || !sellingPricePerUnit) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const breakEvenUnits = fixedCosts / (sellingPricePerUnit - variableCostPerUnit);
    const breakEvenMonetaryValue = breakEvenUnits * sellingPricePerUnit;

    return NextResponse.json(
      {
        breakEvenUnits: breakEvenUnits.toFixed(2),
        breakEvenMonetaryValue: breakEvenMonetaryValue.toFixed(2)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating break-even point:", error);
    return NextResponse.json(
      { message: "Calculation failed" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateBreakEven);
