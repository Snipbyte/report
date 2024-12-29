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

// Function to create an offer
const createOffer = async (data) => {
  const { Category, title, description, planId } = data;
  if (!Category || !title || !description || !planId) {
    throw new Error("Missing required fields for creating an offer");
  }

  const project = new Project({
    planId,
    offer: { Category, title, description },
  });

  const savedProject = await project.save();
  return savedProject;
};

// Function to fetch offers
const getOffers = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Missing planId");
  }

  const offers = await Project.find({ _id: planId }, "offer");
  if (!offers || offers.length === 0) {
    throw new Error("No offers found for the given planId");
  }

  return offers;
};

// POST handler function
const handlePost = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createOffer(data); // Call createOffer function
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getOffers(data); // Call getOffers function
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

// PUT handler function to update an offer
const updateOffer = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { id, offer, planId } = await req.json();

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId }, // Find the plan by ID
      { offer }, // Update the offer field
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Offer not found or planId mismatch");
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to update offer" },
      { status }
    );
  }
};

// DELETE handler function to delete an offer
const deleteOffer = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { id, planId } = await req.json();

    const deletedProject = await Project.findOneAndDelete({ _id: id, planId });

    if (!deletedProject) {
      throw new Error("Offer not found or planId mismatch");
    }

    return NextResponse.json(
      { message: "Offer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to delete offer" },
      { status }
    );
  }
};

// Export handlers
export const POST = connectDb(handlePost);
export const PUT = connectDb(updateOffer);
export const DELETE = connectDb(deleteOffer);
