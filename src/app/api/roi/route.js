import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import ROI from "../../../../backend/models/ROI";

const calculateROI = async (request) => {
  try {
    const { initialCost, netGains } = await request.json();

    if (initialCost === undefined || netGains === undefined) {
      return NextResponse.json(
        { message: "Both initial cost and net gains are required" },
        { status: 400 }
      );
    }

    const roi = ((netGains - initialCost) / initialCost) * 100;

    const roiRecord = new ROI({
      initialCost,
      netGains
    });

    await roiRecord.save();

    return NextResponse.json(
      {
        message: "ROI calculated successfully",
        roi: roi.toFixed(2) + "%"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating ROI:", error);
    return NextResponse.json(
      { message: "Calculation failed" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateROI);
