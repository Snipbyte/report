import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

const authorizeRequest = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET); // Replace with your secret
    return decoded; // Return decoded user info if needed
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const createIdea = async (data) => {
  const { typeOfActivity, projectName, address, launchDate, planId } = data;
  if (!typeOfActivity || !projectName || !address || !launchDate || !planId) {
    throw new Error("Missing required fields for creating an idea");
  }

  const project = new Project({
    planId,
    idea: { typeOfActivity, projectName, address, launchDate },
  });
  const savedProject = await project.save();
  return savedProject;
};

const getIdeas = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Missing planId");
  }

  // Correct query using `_id`
  const ideas = await Project.find({ _id: planId }, "idea");
  if (!ideas || ideas.length === 0) {
    throw new Error("No ideas found for the given planId");
  }

  return ideas;
};

const handlePost = async (req) => {
  try {
    authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createIdea(data);
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getIdeas(data);
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

const updateIdea = async (req) => {
  try {
    authorizeRequest(req); // Authorization check

    const { id, idea, planId } = await req.json();
    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId },
      { idea },
      { new: true }
    );
    const ideas = await Project.find({ _id: planId }, "idea");
    if (!updatedProject) {
      throw new Error("Idea not found or planId mismatch");
    }
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to update idea" },
      { status }
    );
  }
};

const deleteIdea = async (req) => {
  try {
    authorizeRequest(req);

    const { id, planId } = await req.json();
    const deletedProject = await Project.findOneAndDelete({ _id: id, planId });
    if (!deletedProject) {
      throw new Error("Idea not found or planId mismatch");
    }
    return NextResponse.json(
      { message: "Idea deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to delete idea" },
      { status }
    );
  }
};

export const POST = connectDb(handlePost);
export const PUT = connectDb(updateIdea);
export const DELETE = connectDb(deleteIdea);
