import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import BusinessValuation from "../../../../backend/models/BusinessValuation";

const calculateBusinessValuation = async (request) => {
  try {
    const { netProfit, growthRate, discountRate } = await request.json();

    // Validate input
    if (netProfit === undefined || growthRate === undefined || discountRate === undefined) {
      return NextResponse.json(
        { message: "All inputs (net profit, growth rate, and discount rate) are required" },
        { status: 400 }
      );
    }

    // Ensure discount rate is greater than growth rate to avoid division by zero or negative numbers
    if (discountRate <= growthRate) {
      return NextResponse.json(
        { message: "Discount rate must be greater than growth rate to calculate valuation" },
        { status: 400 }
      );
    }

    // Calculate valuation
    const valuation = netProfit / (discountRate - growthRate);

    // Save the data to the database
    const businessValuation = new BusinessValuation({
      netProfit,
      growthRate,
      discountRate,
      valuation: valuation.toFixed(2),
    });

    await businessValuation.save();

    // Return the result
    return NextResponse.json(
      {
        netProfit,
        growthRate,
        discountRate,
        valuation: valuation.toFixed(2)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating business valuation:", error);
    return NextResponse.json(
      { message: "Calculation failed" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateBusinessValuation);
