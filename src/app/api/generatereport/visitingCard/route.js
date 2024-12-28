import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
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
  return decoded.id; 
};

const createVisitingCard = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { firstName, lastName, title, phone, email, planId } = await req.json();

    if (!planId || !firstName || !lastName || !phone || !email) {
      return NextResponse.json(
        { message: "All fields (planId, firstName, lastName, phone, email) are required" },
        { status: 400 }
      );
    }

    // Fetch the plan first
    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    // Ensure that the plan belongs to the authenticated user
    if (plan.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Update the visitingCard field of the plan
    plan.visitingCard = { firstName, lastName, title, phone, email };
    const updatedPlan = await plan.save();

    return NextResponse.json(updatedPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to save visiting card" },
      { status: 500 }
    );
  }
};

// Fetch visiting cards
const getVisitingCards = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne(
      { _id: planId, userId }, 
      "visitingCard"
    );

    if (!project) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(project.visitingCard, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch visiting cards" },
      { status: 500 }
    );
  }
};

// Update a visiting card
const updateVisitingCard = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId, firstName, lastName, title, phone, email } = await req.json();

    if (!planId || !firstName || !lastName || !phone || !email) {
      return NextResponse.json(
        { message: "All fields (planId, firstName, lastName, phone, email) are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, // Ensure the plan belongs to the authenticated user
      { visitingCard: { firstName, lastName, title, phone, email } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update visiting card" },
      { status: 500 }
    );
  }
};

// Delete a visiting card
const deleteVisitingCard = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, // Ensure the plan belongs to the authenticated user
      { $unset: { visitingCard: "" } }, // Remove the visitingCard field
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Visiting card deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete visiting card" },
      { status: 500 }
    );
  }
};

const handlePost = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    if(!userId) {
      return NextResponse.json({ message: "Authorization} required" }, { status: 401 });
      }
    const { action, ...data } = await req.json();
    let result;

    switch (action) {
      case "create":
        result = await createVisitingCard(req); 
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getVisitingCards(req); 
        return NextResponse.json(result, { status: 200 });  // Added return for fetch case
      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
    
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(handlePost);
export const PUT = connectDb(updateVisitingCard);
export const DELETE = connectDb(deleteVisitingCard);
