import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import CashFlow from "../../../../backend/models/cashflow";

const calculateCashFlow = async (request) => {
  try {
    const { month, cashInflows, cashOutflows, initialCashBalance } = await request.json();

    if (!month || cashInflows === undefined || cashOutflows === undefined || initialCashBalance === undefined) {
      return NextResponse.json(
        { message: "All inputs (month, cash inflows, cash outflows, and initial cash balance) are required" },
        { status: 400 }
      );
    }

    const monthlyCashBalance = cashInflows - cashOutflows;

    const cumulativeCashBalance = initialCashBalance + monthlyCashBalance;

    // Save the data to the database
    const cashFlow = new CashFlow({
      month,
      cashInflows,
      cashOutflows,
      initialCashBalance
    });

    await cashFlow.save();

    return NextResponse.json(
      {
        month,
        monthlyCashBalance: monthlyCashBalance.toFixed(2),
        cumulativeCashBalance: cumulativeCashBalance.toFixed(2)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating cash flow:", error);
    return NextResponse.json(
      { message: "Calculation failed" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateCashFlow);
