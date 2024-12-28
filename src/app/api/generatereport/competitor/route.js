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

// Create a competitor (Add competitor information)
const createCompetitor = async (userId, { planId, competitorName, analysis, strengths, weaknesses }) => {
  try {
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

// Get competitors (Fetch competitor information)
const getCompetitors = async (userId, { planId }) => {
  try {
    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

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

// Update a competitor (Modify competitor information)
const updateCompetitor = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, competitorIndex, competitorName, analysis, strengths, weaknesses } =
      await req.json();

    if (competitorIndex === undefined || competitorIndex === null || !planId || !competitorName || !analysis) {
      return NextResponse.json(
        { message: "Plan ID, competitor index, competitor name, and analysis are required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

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

// Delete a competitor (Remove competitor from the list)
const deleteCompetitor = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, competitorIndex } = await req.json();

    if (competitorIndex === undefined || competitorIndex === null || !planId) {
      return NextResponse.json({ message: "Plan ID and competitor index are required" }, { status: 400 });
    }

    const project = await Project.findOne({ _id: planId, userId });
    if (!project) {
      return NextResponse.json({ message: "Plan not found or user is not authorized" }, { status: 404 });
    }

    const competitor = project.competitor[competitorIndex];
    if (!competitor) {
      return NextResponse.json({ message: "Competitor not found" }, { status: 404 });
    }

    project.competitor.splice(competitorIndex, 1); // Remove competitor by index
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

// Combined handler for POST requests: Switch between create, fetch, update actions
const handleCompetitorRequest = async (req) => {
  try {
    const { action, planId, competitorIndex, competitorName, analysis, strengths, weaknesses } = await req.json();
    const userId = getUserIdFromAuthHeader(req);

    switch (action) {
      case "create":
        return createCompetitor(userId, { planId, competitorName, analysis, strengths, weaknesses });
      case "fetch":
        return getCompetitors(userId, { planId });
      default:
        return NextResponse.json(
          { message: "Action not supported" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error handling competitor request:", error);
    return NextResponse.json(
      { message: "Failed to process competitor request" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(handleCompetitorRequest);
export const PUT = connectDb(updateCompetitor);
export const DELETE = connectDb(deleteCompetitor);
