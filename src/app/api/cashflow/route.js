import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import CashFlow from '../../../../backend/models/cashflow';

const calculateCashFlow = async (request) => {
  try {
    const { month, cashInflows, cashOutflows, initialCashBalance } = await request.json();

    // Convert inputs to numbers to avoid string inputs
    const inflows = parseFloat(cashInflows);
    const outflows = parseFloat(cashOutflows);
    const initialBalance = parseFloat(initialCashBalance);

    // Check for NaN values after parsing
    if (!month || isNaN(inflows) || isNaN(outflows) || isNaN(initialBalance)) {
      return NextResponse.json(
        { message: 'All inputs (month, cash inflows, cash outflows, and initial cash balance) must be valid numbers' },
        { status: 400 }
      );
    }

    const monthlyCashBalance = inflows - outflows;
    const cumulativeCashBalance = initialBalance + monthlyCashBalance;

    // Provide recommendations based on cash flow
    let recommendation = '';

    if (monthlyCashBalance < 0) {
      recommendation += 'Your monthly cash balance is negative. Consider strategies to reduce outflows or increase inflows to improve cash flow. ';
    }

    if (cumulativeCashBalance < 0) {
      recommendation += 'Your cumulative cash balance is negative. It may be necessary to review your overall financial strategy and seek additional funding or cost-saving measures. ';
    }

    // Save the data to the database
    const cashFlow = new CashFlow({
      month,
      cashInflows: inflows,
      cashOutflows: outflows,
      initialCashBalance: initialBalance
    });

    await cashFlow.save();

    return NextResponse.json(
      {
        month,
        monthlyCashBalance: monthlyCashBalance.toFixed(2),
        cumulativeCashBalance: cumulativeCashBalance.toFixed(2),
        recommendation: recommendation || 'Your cash flow looks healthy. Continue monitoring and managing your inflows and outflows to maintain positive cash flow.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating cash flow:', error);
    return NextResponse.json(
      { message: 'Calculation failed' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateCashFlow);
