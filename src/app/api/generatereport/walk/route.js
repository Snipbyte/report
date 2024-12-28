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

// Create a walk
const createWalk = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, question, options } = await req.json();

    // Basic validation
    if (!planId || !question || !options) {
      return NextResponse.json(
        { message: "Plan ID, question, and options are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $push: { walk: { question, options } } }, 
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

// Update a walk using the index
const updateWalk = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId, index, question, options } = await req.json();

    // Basic validation
    if (typeof index !== "number" || !question || !options) {
      return NextResponse.json(
        { message: "Plan ID, index, question, and options are required" },
        { status: 400 }
      );
    }

    // Find the plan and update the walk at the given index
    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $set: { [`walk.${index}.question`]: question, [`walk.${index}.options`]: options } }, 
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Plan not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating walk:", error);
    return NextResponse.json({ message: "Failed to update walk" }, { status: 500 });
  }
};

// Delete a walk using the index
const deleteWalk = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract user ID
    const { planId, index } = await req.json();

    if (typeof index !== "number") {
      return NextResponse.json(
        { message: "Plan ID and index are required" },
        { status: 400 }
      );
    }

    // Find the plan and remove the walk at the given index
    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $pull: { walk: { _id: { $eq: null } } } }, 
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

// Handle POST requests (create or fetch actions)
const handlePost = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }
    const { action, ...data } = await req.json();
    let result;

    switch (action) {
      case "create":
        result = await createWalk(req); 
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getWalks(req); 
        return NextResponse.json(result, { status: 200 });  
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
export const PUT = connectDb(updateWalk);
export const DELETE = connectDb(deleteWalk);
