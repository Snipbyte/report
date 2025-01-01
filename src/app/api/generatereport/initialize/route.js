import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import Finance from "../../../../../backend/models/finanicialModel";
import jwt from "jsonwebtoken";

const getUserIdFromAuthHeader = (request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  return userId;
};

const createPlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);

    const hardcodedPlanData = {
      userId,
      idea: {
        typeOfActivity: "Placeholder Activity",
        projectName: "Placeholder Project",
        address: "Placeholder Address",
        launchDate: new Date(),
      },
      presentation: {
        "6770cc9a588fc3dbba11c8a0": "<p>Placeholder Presentation Details</p>",
      },
      visitingCard: {
        "6770cc9a588fc3dbba11c8a0": {
          firstName: "Placeholder",
          lastName: "Name",
          title: "Placeholder Title",
          contact: "0000000000",
          email: "placeholder@example.com",
          selectedCountry: {
            code: "+33",
            flag: "🇫🇷",
            name: "France",
          },
        },
      },
      carrier: {
        "6770cc9a588fc3dbba11c8a0": {
          businessLeader: "yes",
          industryExperience: "no",
          familySituation: "no",
          editorContent: "<p>Placeholder career details</p>",
        },
      },
      services: {
        "6770cc9a588fc3dbba11c8a0": {
          name: "Placeholder Service",
          description: "<p>Placeholder Service Description</p>",
        },
      },
      market: {
        "6770cc9a588fc3dbba11c8a0": {
          marketDescription: "<p>Placeholder market description</p>",
          responses: {
            row1: "Positive",
            row2: "Negative",
            row3: "Positive",
            row4: "Neutral",
            row5: "Positive",
          },
        },
      },
      competitors: {
        "6770cc9a588fc3dbba11c8a0": [
          {
            name: "Placeholder Competitor",
            priceStatus: "more-expensive",
          },
        ],
      },
      customers: {
        "6770cc9a588fc3dbba11c8a0": {
          name: "Placeholder Customer",
          description: "<p>Placeholder Customer Description</p>",
          type: "Private - BtoC",
        },
      },
      salesPitches: {
        "6770cc9a588fc3dbba11c8a0": "<p>Placeholder Sales Pitch</p>",
      },
      customerAcquisitionActions: {
        "6770cc9a588fc3dbba11c8a0": [
          {
            id: Date.now(),
            name: "Placeholder Action",
            description: "<p>Placeholder Description</p>",
          },
        ],
      },
    };

    const newFinance = new Finance({
      revenue: { productLines: [], period: { startYear: 2024, endYear: 2026 } },
      expenses: { generalExpenses: { cost: 1000, annualGrowthRate: 5, frequency: "monthly" } },
      investments: { investments: [] },
      financialResults: { totalRevenue: 50000, totalProductCosts: 20000, grossMargin: 30000, EBITDA: 15000, profitability: { isProfitable: true, EBITDAMargin: 25, debtCoverageRatio: 1.5 }, scoring: { marketPotentialIndex: 80, recommendation: "High Potential" } },
    });
    await newFinance.save();

    hardcodedPlanData.financialData = newFinance._id;

    const newPlan = new Plan(hardcodedPlanData);
    const savedPlan = await newPlan.save();

    return NextResponse.json(savedPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to create plan" },
      {
        status: error.message === "Authorization token is required" ? 401 : 500,
      }
    );
  }
};

export const POST = connectDb(createPlan);
