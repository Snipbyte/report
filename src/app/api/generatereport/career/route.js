import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Authorization function to verify JWT token
const authorizeRequest = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

// Function to create a career entry
const createCareer = async (data) => {
  const { questions, otherDetails, planId } = data;
  if (!questions || !otherDetails || !planId) {
    throw new Error("Missing required fields for creating a career entry");
  }

  const project = new Project({
    planId,
    career: { questions, otherDetails },
  });

  const savedProject = await project.save();
  return savedProject;
};

// Function to fetch career entries
const getCareers = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Missing planId");
  }

  const careers = await Project.find({ _id: planId }, "career");
  if (!careers || careers.length === 0) {
    throw new Error("No career entries found for the given planId");
  }

  return careers;
};

// POST handler function
const handlePost = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createCareer(data); // Call createCareer function
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getCareers(data); // Call getCareers function
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

// PUT handler function to update a career entry
const updateCareer = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { id, career, planId } = await req.json();

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId }, // Find the plan by ID
      { career }, // Update the career field
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Career entry not found or planId mismatch");
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to update career entry" },
      { status }
    );
  }
};

// DELETE handler function to delete a career entry
const deleteCareer = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { id, planId } = await req.json();

    const deletedProject = await Project.findOneAndDelete({ _id: id, planId });

    if (!deletedProject) {
      throw new Error("Career entry not found or planId mismatch");
    }

    return NextResponse.json(
      { message: "Career entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to delete career entry" },
      { status }
    );
  }
};

// Export handlers
export const POST = connectDb(handlePost);
export const PUT = connectDb(updateCareer);
export const DELETE = connectDb(deleteCareer);
