import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Function to extract user ID from Bearer token in Authorization header
const getUserIdFromAuthHeader = (request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    return decoded.id; // Return user ID from decoded token
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};

// Create a new presentation
const createPresentation = async (data, userId) => {
  const { content, planId } = data;
  if (!content || !planId) {
    throw new Error("Missing required fields for creating a presentation");
  }

  const project = new Project({
    planId,
    userId,  // Associate user ID with the project
    presentation: { details: content }, // Save content in details
  });
  const savedProject = await project.save();
  return savedProject;
};

// Fetch a presentation
const getPresentation = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Missing planId");
  }

  // Correct query using _id
  const project = await Project.findOne({ _id: planId }, "presentation");
  if (!project || !project.presentation) {
    throw new Error("Presentation not found for the given planId");
  }

  return project.presentation;
};

// Handle POST requests
const handlePost = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Get user ID from the token
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createPresentation(data, userId); // Pass user ID when creating
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getPresentation(data);
        return NextResponse.json(result, { status: 200 });
      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status }
    );
  }
};

// Update a presentation
const updatePresentation = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Get user ID from the token

    const { planId, content } = await req.json();
    if (!planId || !content) {
      throw new Error("Missing required fields for updating a presentation");
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },  // Ensure the userId matches
      { presentation: { details: content } }, // Save updated content in details
      { new: true }
    );
    if (!updatedProject) {
      throw new Error("Presentation not found or planId mismatch");
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to update presentation" },
      { status }
    );
  }
};

// Delete a presentation
const deletePresentation = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Get user ID from the token

    const { planId } = await req.json();
    if (!planId) {
      throw new Error("Missing planId for deletion");
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },  // Ensure the userId matches
      { $unset: { presentation: "" } },
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Presentation not found or planId mismatch");
    }

    return NextResponse.json(
      { message: "Presentation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to delete presentation" },
      { status }
    );
  }
};

// Export routes
export const POST = connectDb(handlePost);
export const PUT = connectDb(updatePresentation);
export const DELETE = connectDb(deletePresentation);
