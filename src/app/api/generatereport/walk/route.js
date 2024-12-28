import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Extract the user ID from the Authorization header
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
  return decoded.id; // Assuming `decoded.id` contains the user ID
};

// Create a walk
const createWalk = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, customer, details } = await req.json();

    // Basic validation
    if (!planId || !customer || !details) {
      return NextResponse.json(
        { message: "Plan ID, customer, and details are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $push: { walk: { customer, details } } }, 
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Plan not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating walk:", error);
    return NextResponse.json({ message: "Failed to save walk" }, { status: 500 });
  }
};

// Fetch walks
const getWalks = async (req) => {
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
      "walk"
    );

    if (!project) {
      return NextResponse.json(
        { message: "Plan not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(project.walk, { status: 200 });
  } catch (error) {
    console.error("Error fetching walks:", error);
    return NextResponse.json({ message: "Failed to fetch walks" }, { status: 500 });
  }
};

// Update a walk
const updateWalk = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId, walkId, customer, details } = await req.json();

    // Basic validation
    if (!planId || !walkId || !customer || !details) {
      return NextResponse.json(
        { message: "Plan ID, walk ID, customer, and details are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId, "walk._id": walkId }, // Ensure the walk belongs to the authenticated user's plan
      { $set: { "walk.$": { customer, details } } }, // Update the specific walk in the array
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Walk not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating walk:", error);
    return NextResponse.json({ message: "Failed to update walk" }, { status: 500 });
  }
};

// Delete a walk
const deleteWalk = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId, walkId } = await req.json();

    if (!planId || !walkId) {
      return NextResponse.json(
        { message: "Plan ID and walk ID are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, 
      { $pull: { walk: { _id: walkId } } }, 
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Walk not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Walk deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting walk:", error);
    return NextResponse.json({ message: "Failed to delete walk" }, { status: 500 });
  }
};

export const POST = connectDb(createWalk);
export const GET = connectDb(getWalks);
export const PUT = connectDb(updateWalk);
export const DELETE = connectDb(deleteWalk);
