import { NextResponse } from 'next/server';
import BreakEven from '../../../../backend/models/BreakEven';
import connectDb from '../../../../backend/middleware/db';

const calculateBreakEven = async (request) => {
  try {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit } = await request.json();

    if (!fixedCosts || !variableCostPerUnit || !sellingPricePerUnit) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const breakEvenUnits = fixedCosts / (sellingPricePerUnit - variableCostPerUnit);
    const breakEvenMonetaryValue = breakEvenUnits * sellingPricePerUnit;

    // Provide recommendations
    let recommendation = '';

    if (breakEvenUnits > 1000) { 
      recommendation += 'Consider finding ways to reduce your fixed costs or variable costs to lower your break-even point. Alternatively, increasing your selling price might help reduce the number of units needed to break even. ';
    }

    if (breakEvenMonetaryValue > 50000) { 
      recommendation += 'The break-even monetary value is quite high. It might be beneficial to explore ways to boost sales volume or diversify your revenue streams. ';
    }

    return NextResponse.json(
      {
        breakEvenUnits: breakEvenUnits.toFixed(2),
        breakEvenMonetaryValue: breakEvenMonetaryValue.toFixed(2),
        recommendation: recommendation || 'Your break-even analysis looks good. Continue monitoring your costs and pricing strategy.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating break-even point:', error);
    return NextResponse.json(
      { message: 'Calculation failed' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateBreakEven);
