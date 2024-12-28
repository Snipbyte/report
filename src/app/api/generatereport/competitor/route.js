import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Function to extract userId from Authorization header
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

const createCompetitor = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); 
    const { planId, competitorName, analysis, strengths, weaknesses } = await req.json();

    if (!planId || !competitorName || !analysis) {
      return NextResponse.json(
        { message: "Plan ID, competitor name, and analysis are required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

    project.competitor.push({ competitorName, analysis, strengths, weaknesses });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating competitor:", error);
    return NextResponse.json(
      { message: "Failed to save competitor" },
      { status: 500 }
    );
  }
};

const getCompetitors = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId } = await req.json(); // Expect planId in the body

    // Basic validation
    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    // Ensure the planId belongs to the user
    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

    return NextResponse.json(project.competitor, { status: 200 });
  } catch (error) {
    console.error("Error fetching competitors:", error);
    return NextResponse.json(
      { message: "Failed to fetch competitors" },
      { status: 500 }
    );
  }
};

const updateCompetitor = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract userId from token
    const { planId, competitorIndex, competitorName, analysis, strengths, weaknesses } =
      await req.json();

    // Basic validation
    if (competitorIndex === undefined || competitorIndex === null || !planId || !competitorName || !analysis) {
      return NextResponse.json(
        { message: "Plan ID, competitor index, competitor name, and analysis are required" },
        { status: 400 }
      );
    }

    // Ensure the planId belongs to the user
    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

    // Find and update the competitor by index
    const competitor = project.competitor[competitorIndex];
    if (!competitor) {
      return NextResponse.json({ message: "Competitor not found" }, { status: 404 });
    }

    competitor.competitorName = competitorName;
    competitor.analysis = analysis;
    competitor.strengths = strengths;
    competitor.weaknesses = weaknesses;

    await project.save();
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error updating competitor:", error);
    return NextResponse.json(
      { message: "Failed to update competitor" },
      { status: 500 }
    );
  }
};

const deleteCompetitor = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req); // Extract userId from token
    const { planId, competitorIndex } = await req.json();

    // Basic validation
    if (competitorIndex === undefined || competitorIndex === null || !planId) {
      return NextResponse.json({ message: "Plan ID and competitor index are required" }, { status: 400 });
    }

    // Ensure the planId belongs to the user
    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

    // Remove the competitor from the plan by index
    const competitor = project.competitor[competitorIndex];
    if (!competitor) {
      return NextResponse.json({ message: "Competitor not found" }, { status: 404 });
    }

    project.competitor.splice(competitorIndex, 1);  // Remove competitor by index
    await project.save();
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error deleting competitor:", error);
    return NextResponse.json(
      { message: "Failed to delete competitor" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createCompetitor);
export const GET = connectDb(getCompetitors);
export const PUT = connectDb(updateCompetitor);
export const DELETE = connectDb(deleteCompetitor);
