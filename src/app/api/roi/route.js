// pages/api/calculateROI.js
import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import ROI from '../../../../backend/models/ROI';

const calculateROI = async (request) => {
  try {
    const { initialCost, netGains } = await request.json();

    // Validate inputs
    if (initialCost === undefined || netGains === undefined) {
      return NextResponse.json(
        { message: 'Both initial cost and net gains are required' },
        { status: 400 }
      );
    }

    // Calculate ROI
    const roi = ((netGains - initialCost) / initialCost) * 100;

    // Provide recommendations based on ROI
    let recommendation = '';

    if (roi < 0) {
      recommendation = 'The ROI is negative, indicating a loss on the investment. Consider reviewing the investment strategy or identifying factors contributing to the loss.';
    } else if (roi >= 0 && roi <= 10) {
      recommendation = 'The ROI is positive but relatively low. Evaluate whether there are opportunities to increase returns or if the investment aligns with your financial goals.';
    } else if (roi > 10 && roi <= 50) {
      recommendation = 'The ROI is quite good. Continue monitoring the investment and consider reinvesting gains or exploring additional opportunities for growth.';
    } else {
      recommendation = 'The ROI is very high. Ensure that the returns are sustainable and consider diversifying investments to manage risk and maximize returns.';
    }

    // Save ROI data to the database
    const roiRecord = new ROI({
      initialCost,
      netGains,
      roi: roi.toFixed(2),
    });

    await roiRecord.save();

    // Return the result with recommendations
    return NextResponse.json(
      {
        message: 'ROI calculated successfully',
        roi: roi.toFixed(2) + "%",
        recommendation
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating ROI:', error);
    return NextResponse.json(
      { message: 'Calculation failed' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateROI);
