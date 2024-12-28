import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

const getUserIdFromAuthHeader = (request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token is required");
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

const createPresentation = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { content, planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { presentation: { content } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to save presentation" },
      { status: 500 }
    );
  }
};

const getPresentations = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    const project = await Project.findOne({ _id: planId, userId }, "presentation");

    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(project.presentation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch presentation" },
      { status: 500 }
    );
  }
};

const updatePresentation = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { planId, content } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { presentation: { content } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update presentation" },
      { status: 500 }
    );
  }
};

const deletePresentation = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $unset: { presentation: "" } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Presentation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete presentation" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createPresentation);
export const GET = connectDb(getPresentations);
export const PUT = connectDb(updatePresentation);
export const DELETE = connectDb(deletePresentation);
