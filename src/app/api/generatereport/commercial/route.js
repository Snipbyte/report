import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Helper function to get user ID from the Authorization header
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

// Create a commercial (Update the sales pitch)
const createCommercial = async (userId, { planId, salesPitch }) => {
  try {
    // Basic validation
    if (!planId || !salesPitch) {
      return NextResponse.json(
        { message: "Plan ID and sales pitch are required" },
        { status: 400 }
      );
    }

    // Ensure the planId belongs to the user
    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

    // Update the sales pitch in the project
    project.commercial.salesPitch = salesPitch;
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating commercial:", error);
    return NextResponse.json(
      { message: "Failed to save commercial" },
      { status: 500 }
    );
  }
};

// Get commercials (Fetch the commercial field)
const getCommercials = async (userId, { planId }) => {
  try {
    // Basic validation
    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    const commercials = await Project.find({ _id: planId, userId }, "commercial");
    if (!commercials.length) {
      return NextResponse.json({ message: "No commercials found or user is not authorized" }, { status: 404 });
    }

    return NextResponse.json(commercials, { status: 200 });
  } catch (error) {
    console.error("Error fetching commercials:", error);
    return NextResponse.json(
      { message: "Failed to fetch commercials" },
      { status: 500 }
    );
  }
};

// Update a commercial (Update the sales pitch)
const updateCommercial = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, salesPitch } = await req.json();

    // Basic validation
    if (!planId || !salesPitch) {
      return NextResponse.json(
        { message: "Plan ID and sales pitch are required" },
        { status: 400 }
      );
    }

    // Ensure the planId belongs to the user
    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { commercial: { salesPitch } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Commercial not found or user is not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating commercial:", error);
    return NextResponse.json(
      { message: "Failed to update commercial" },
      { status: 500 }
    );
  }
};

// Delete a commercial (Remove the commercial field)
const deleteCommercial = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();

    // Basic validation
    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    // Ensure the planId belongs to the user
    const deletedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $unset: { commercial: "" } }, // Removes the commercial field
      { new: true }
    );

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Commercial not found or user is not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Commercial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting commercial:", error);
    return NextResponse.json(
      { message: "Failed to delete commercial" },
      { status: 500 }
    );
  }
};

// Combined handler for POST requests: Switch between create and get actions
const handleCommercialRequest = async (req) => {
  try {
    const { action, planId, salesPitch } = await req.json();
    const userId = getUserIdFromAuthHeader(req);  // Get the user ID from the header

    switch (action) {
      case "create":
        return createCommercial(userId, { planId, salesPitch });
      case "fetch":
        return getCommercials(userId, { planId });
      default:
        return NextResponse.json(
          { message: "Action not supported" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error handling commercial request:", error);
    return NextResponse.json(
      { message: "Failed to process commercial request" },
      { status: 500 }
    );
  }
};

// Export the API methods for POST, GET, PUT, DELETE
export const POST = connectDb(handleCommercialRequest);
export const PUT = connectDb(updateCommercial);
export const DELETE = connectDb(deleteCommercial);
