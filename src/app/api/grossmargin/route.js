import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import GrossMargin from '../../../../backend/models/GrossMargin';

const calculateGrossMargin = async (request) => {
  try {
    const { product, sellingPrice, productionCost } = await request.json();

    // Validate inputs
    if (!product || sellingPrice === undefined || productionCost === undefined) {
      return NextResponse.json(
        { message: "All inputs (product name, selling price, and production cost) are required" },
        { status: 400 }
      );
    }

    // Calculate gross margin
    const grossMarginPerUnit = sellingPrice - productionCost;
    const grossMarginPercentage = (grossMarginPerUnit / sellingPrice) * 100;

    // Provide recommendations based on gross margin
    let recommendation = '';

    if (grossMarginPercentage < 20) {
      recommendation = 'The gross margin percentage is low. Consider increasing the selling price or reducing production costs to improve profitability.';
    } else if (grossMarginPercentage >= 20 && grossMarginPercentage <= 40) {
      recommendation = 'The gross margin percentage is moderate. Review your cost structure periodically to ensure continued profitability.';
    } else {
      recommendation = 'The gross margin percentage is high. This is a strong position. Continue to optimize costs and explore opportunities for increasing sales.';
    }

    // Save the gross margin data to the database
    const grossMargin = new GrossMargin({
      product,
      sellingPrice,
      productionCost,
      grossMargin: grossMarginPerUnit,
      grossMarginPercentage: grossMarginPercentage.toFixed(2),
    });

    await grossMargin.save();

    // Return the result with recommendations
    return NextResponse.json(
      {
        product,
        grossMarginPerUnit: grossMarginPerUnit.toFixed(2),
        grossMarginPercentage: grossMarginPercentage.toFixed(2),
        recommendation
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
