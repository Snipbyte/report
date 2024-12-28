import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

const authorizeRequest = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    return decoded; // Return decoded user info if needed
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const createIdea = async (req) => {
  try {
    authorizeRequest(req); // Authorization check

    const { typeOfActivity, projectName, address, launchDate, planId } = await req.json();
    const project = new Project({ planId, idea: { typeOfActivity, projectName, address, launchDate } });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    const status = error.message === "Unauthorized" || error.message === "Invalid token" ? 401 : 500;
    return NextResponse.json({ message: error.message || "Failed to save idea" }, { status });
  }
};

const getIdeas = async (req) => {
  try {
    authorizeRequest(req); // Authorization check

    const { planId } = await req.json(); 
    if (!planId) {
      throw new Error("Missing planId");
    }

    const ideas = await Project.find({ planId }, "idea");
    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    const status = error.message === "Unauthorized" || error.message === "Invalid token" ? 401 : 500;
    return NextResponse.json({ message: error.message || "Failed to fetch ideas" }, { status });
  }
};

const updateIdea = async (req) => {
  try {
    authorizeRequest(req); // Authorization check

    const { id, idea, planId } = await req.json();
    const updatedProject = await Project.findOneAndUpdate({ _id: id, planId }, { idea }, { new: true });
    if (!updatedProject) {
      throw new Error("Idea not found or planId mismatch");
    }
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const status = error.message === "Unauthorized" || error.message === "Invalid token" ? 401 : 500;
    return NextResponse.json({ message: error.message || "Failed to update idea" }, { status });
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
    return NextResponse.json({ message: "Idea deleted successfully" }, { status: 200 });
  } catch (error) {
    const status = error.message === "Unauthorized" || error.message === "Invalid token" ? 401 : 500;
    return NextResponse.json({ message: error.message || "Failed to delete idea" }, { status });
  }
};

export const POST = connectDb(createIdea);
export const GET = connectDb(getIdeas);
export const PUT = connectDb(updateIdea);
export const DELETE = connectDb(deleteIdea);
