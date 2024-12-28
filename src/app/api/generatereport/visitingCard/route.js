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

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, // Ensure the plan belongs to the authenticated user
      { visitingCard: { firstName, lastName, title, phone, email } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 201 });
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
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne(
      { _id: planId, userId }, // Ensure the plan belongs to the authenticated user
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

export const POST = connectDb(createVisitingCard);
export const GET = connectDb(getVisitingCards);
export const PUT = connectDb(updateVisitingCard);
export const DELETE = connectDb(deleteVisitingCard);
