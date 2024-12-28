import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";

const getUserIdFromAuthHeader = (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token is required");
  }
  const token = authHeader.split(" ")[1];
  const userId = decodeToken(token); 
  if (!userId) {
    throw new Error("Invalid token");
  }
  return userId;
};

const createPlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
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
      walk: [],
      competitor: [],
      customer: [],
      commercial: {
        salesPitch: "Placeholder Sales Pitch",
      },
      customerAcquisition: [],
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

const getPlanById = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = req.params;
    const plan = await Plan.findOne({ _id: planId, userId }); // Ensure the plan belongs to the user
    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch plan" },
      { status: error.message === "Authorization token is required" ? 401 : 500 }
    );
  }
};

const updatePlanSection = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, section, data } = await req.json();
    const updatedPlan = await Plan.findOneAndUpdate(
      { _id: planId, userId }, 
      { [section]: data },
      { new: true }
    );
    if (!updatedPlan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update plan" },
      { status: error.message === "Authorization token is required" ? 401 : 500 }
    );
  }
};

const deletePlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();
    const deletedPlan = await Plan.findOneAndDelete({ _id: planId, userId }); 
    if (!deletedPlan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Plan deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete plan" },
      { status: error.message === "Authorization token is required" ? 401 : 500 }
    );
  }
};

export const POST = connectDb(createPlan); 
export const GET = connectDb(getPlanById); 
export const PUT = connectDb(updatePlanSection); 
export const DELETE = connectDb(deletePlan);