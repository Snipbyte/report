import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Authorization middleware
const authorizeRequest = (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

// Create a walk
const createWalk = async (data) => {
  const { planId, question, options } = data;
  if (!planId || !question || !options) {
    throw new Error("Missing required fields for creating a walk");
  }

  const project = await Project.findOne({ _id: planId });
  if (!project) {
    throw new Error("Plan not found");
  }

  project.walk.push({ question, options });
  await project.save();

  return project;
};

// Fetch walks
const getWalks = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Missing planId");
  }

  const project = await Project.findOne({ _id: planId }, "walk");
  if (!project) {
    throw new Error("Plan not found");
  }

  return project.walk;
};

// Update a walk
const updateWalk = async (data) => {
  const { planId, index, question, options } = data;
  if (typeof index !== "number" || !question || !options) {
    throw new Error("Missing required fields for updating a walk");
  }

  const project = await Project.findOne({ _id: planId });
  if (!project || !project.walk[index]) {
    throw new Error("Walk not found");
  }

  // Update the walk at the specified index
  project.walk[index] = { question, options };
  await project.save();

  return project;
};

// Delete a walk
const deleteWalk = async (data) => {
  const { planId, index } = data;
  if (typeof index !== "number") {
    throw new Error("Missing index for deleting a walk");
  }

  const project = await Project.findOne({ _id: planId });
  if (!project || !project.walk[index]) {
    throw new Error("Walk not found");
  }

  // Remove the walk at the specified index
  project.walk.splice(index, 1);
  await project.save();

  return project;
};

// Handle POST requests (create or fetch actions)
const handlePost = async (req) => {
  try {
    const userId = authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createWalk(data);
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getWalks(data);
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

// Handle PUT requests (update walk)
const handlePut = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    if (action === "update") {
      const result = await updateWalk(data);
      return NextResponse.json(result, { status: 200 });
    }

    throw new Error("Invalid action");
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

// Handle DELETE requests (delete walk)
const handleDelete = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    if (action === "delete") {
      const result = await deleteWalk(data);
      return NextResponse.json(result, { status: 200 });
    }

    throw new Error("Invalid action");
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

export const POST = connectDb(handlePost);
export const PUT = connectDb(handlePut);
export const DELETE = connectDb(handleDelete);
