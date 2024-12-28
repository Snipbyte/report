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

const createCareer = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { questions, otherDetails, planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, 
      { career: { questions, otherDetails } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to save career details" },
      { status: 500 }
    );
  }
};

const getCareers = async (req) => {
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
      "career" 
    );

    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(project.career, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch career details" },
      { status: 500 }
    );
  }
};

const updateCareer = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { planId, questions, otherDetails } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, 
      { career: { questions, otherDetails } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update career details" },
      { status: 500 }
    );
  }
};

const deleteCareer = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId }, // Ensure the plan belongs to the authenticated user
      { $unset: { career: "" } }, // Remove the career field
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Career details deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete career details" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createCareer);
export const GET = connectDb(getCareers);
export const PUT = connectDb(updateCareer);
export const DELETE = connectDb(deleteCareer);
