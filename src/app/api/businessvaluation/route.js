import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import BusinessValuation from '../../../../backend/models/BusinessValuation';

const calculateBusinessValuation = async (request) => {
  try {
    const { netProfit, growthRate, discountRate } = await request.json();

    // Validate input
    if (netProfit === undefined || growthRate === undefined || discountRate === undefined) {
      return NextResponse.json(
        { message: 'All inputs (net profit, growth rate, and discount rate) are required' },
        { status: 400 }
      );
    }

    if (discountRate <= growthRate) {
      return NextResponse.json(
        { message: 'Discount rate must be greater than growth rate to calculate valuation' },
        { status: 400 }
      );
    }

    // Calculate valuation
    const valuation = netProfit / (discountRate - growthRate);

    // Provide recommendations based on the valuation
    let recommendation = '';

    if (valuation < 1000000) { // Example threshold for low valuation
      recommendation += 'The calculated business valuation is relatively low. Consider strategies to enhance profitability or reduce risk factors to improve your valuation. ';
    } else if (valuation > 5000000) { // Example threshold for high valuation
      recommendation += 'The calculated business valuation is high. Ensure to maintain growth strategies and consider leveraging this strong valuation for business expansion or investment. ';
    }

    // Save the data to the database
    const businessValuation = new BusinessValuation({
      netProfit,
      growthRate,
      discountRate,
      valuation: valuation.toFixed(2),
    });

    await businessValuation.save();

    return NextResponse.json(
      {
        netProfit,
        growthRate,
        discountRate,
        valuation: valuation.toFixed(2),
        recommendation: recommendation || 'Your business valuation looks good. Continue monitoring your financial metrics and adjust strategies as needed.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating business valuation:', error);
    return NextResponse.json(
      { message: 'Calculation failed' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateBusinessValuation);
