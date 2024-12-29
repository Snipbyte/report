import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Function to extract userId from Authorization header
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
    });

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

// Delete Plan by ID
const deletePlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();

    // Find the plan by ID and userId
    const deletedPlan = await Plan.findOneAndDelete({ _id: planId, userId });

    if (!deletedPlan) {
      return NextResponse.json(
        { message: "Plan not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Plan deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete plan" },
      {
        status: error.message === "Authorization token is required" ? 401 : 500,
      }
    );
  }
};

// Exports for handling the API routes
export const POST = connectDb(createPlan); // Handles creating the plan
export const DELETE = connectDb(deletePlan); // Handles deleting the plan
