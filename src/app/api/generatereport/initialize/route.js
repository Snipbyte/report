import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Function to extract userId from Authorization header
const getUserIdFromAuthHeader = (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 }
    );
  }
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  return userId;
};

// Create Plan with dummy data for all arrays
const createPlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);

    // Create new plan with dummy data added to all arrays
    const newPlan = new Plan({
      userId,
      idea: {
        typeOfActivity: "Placeholder Activity",
        projectName: "Placeholder Project",
        address: "Placeholder Address",
        launchDate: new Date(),
      },
      presentation: {
        details: "Placeholder Presentation Details",
      },
      visitingCard: {
        firstName: "Placeholder",
        lastName: "Name",
        title: "Placeholder Title",
        phone: "0000000000",
        email: "placeholder@example.com",
      },
      career: {
        questions: {
          confidentToRunBusiness: false,
          industryExperience: false,
          timeAndEnergy: false,
        },
        otherDetails: "Placeholder Career Details",
      },
      offer: {
        title: "Placeholder Offer Title",
        description: "Placeholder Offer Description",
      },
      walk: [
        {
          question: "Dummy question for walk",
          options: {
            positive: true,  // Changed to Boolean
            negative: false, // Changed to Boolean
            neutral: true,   // Changed to Boolean
          },
        },
      ],
      competitor: [
        {
          competitorName: "Dummy Competitor",
          analysis: "Dummy competitor analysis",
          strengths: "Dummy strengths",
          weaknesses: "Dummy weaknesses",
          pricingComparison: {
            aligned: false,
            moreExpensive: true,
            cheaper: false,
          },
        },
      ],
      customer: [
        {
          customerName: "Dummy Customer",
          description: "Dummy customer description",
          customerType: "Professional B2B",  // Valid enum value
          feedback: "Placeholder feedback",
        },
      ],
      commercial: {
        salesPitch: "Placeholder Sales Pitch",
        targetMarket: "Dummy target market",
        competitorsAnalysis: "Dummy competitors analysis",
      },
      customerAcquisition: [
        {
          description: "Dummy acquisition description",
          actionName: "Dummy action name",
          strategy: "Dummy strategy details",
          outcome: "Dummy outcome details",
        },
      ],
    });

    const savedPlan = await newPlan.save();
    return NextResponse.json(savedPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to create plan" },
      { status: error.message === "Authorization token is required" ? 401 : 500 }
    );
  }
};

// Delete Plan by ID
const deletePlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();

    // Find the plan by ID and userId
    const deletedPlan = await Plan.findOneAndDelete({ _id: planId, userId });

    if (!deletedPlan) {
      return NextResponse.json({ message: "Plan not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Plan deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete plan" },
      { status: error.message === "Authorization token is required" ? 401 : 500 }
    );
  }
};

// Exports for handling the API routes
export const POST = connectDb(createPlan); // Handles creating the plan
export const DELETE = connectDb(deletePlan); // Handles deleting the plan
