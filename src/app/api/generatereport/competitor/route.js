import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Authorization check function
const authorizeRequest = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    return decoded.id; // Extract and return the user ID
  } catch (err) {
    throw new Error("Invalid token");
  }
};

// Create a competitor (Add competitor information)
const createCompetitor = async (data) => {
  const { planId, competitorName, analysis, strengths, weaknesses } = data;
  if (!planId || !competitorName || !analysis) {
    throw new Error("Plan ID, competitor name, and analysis are required");
  }

  const project = await Project.findOne({ _id: planId });
  if (!project) {
    throw new Error("Plan not found or user is not authorized");
  }

  project.competitor.push({ competitorName, analysis, strengths, weaknesses });
  const savedProject = await project.save();
  return savedProject;
};

// Get competitors (Fetch competitor information)
const getCompetitors = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Plan ID is required");
  }

  const project = await Project.findOne({ _id: planId });
  if (!project) {
    throw new Error("Plan not found or user is not authorized");
  }

  return project.competitor;
};

// Update a competitor (Modify competitor information)
const updateCompetitor = async (data) => {
  const {
    planId,
    competitorIndex,
    competitorName,
    analysis,
    strengths,
    weaknesses,
  } = data;
  if (
    competitorIndex === undefined ||
    !planId ||
    !competitorName ||
    !analysis
  ) {
    throw new Error(
      "Plan ID, competitor index, competitor name, and analysis are required"
    );
  }

  const project = await Project.findOne({ _id: planId });
  if (!project) {
    throw new Error("Plan not found or user is not authorized");
  }

  const competitor = project.competitor[competitorIndex];
  if (!competitor) {
    throw new Error("Competitor not found");
  }

  competitor.competitorName = competitorName;
  competitor.analysis = analysis;
  competitor.strengths = strengths;
  competitor.weaknesses = weaknesses;

  await project.save();
  return project;
};

// Delete a competitor (Remove competitor from the list)
const deleteCompetitor = async (data) => {
  const { planId, competitorIndex } = data;
  if (competitorIndex === undefined || !planId) {
    throw new Error("Plan ID and competitor index are required");
  }

  const project = await Project.findOne({ _id: planId });
  if (!project) {
    throw new Error("Plan not found or user is not authorized");
  }

  const competitor = project.competitor[competitorIndex];
  if (!competitor) {
    throw new Error("Competitor not found");
  }

  project.competitor.splice(competitorIndex, 1); // Remove competitor by index
  await project.save();
  return project;
};

// Combined handler for POST requests: Switch between create, fetch, update actions
const handlePost = async (req) => {
  try {
    const userId = authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createCompetitor(data);
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getCompetitors(data);
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

// Update competitor
const handleUpdate = async (req) => {
  try {
    const userId = authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();
    const updatedProject = await updateCompetitor(data);

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to update competitor" },
      { status }
    );
  }
};

// Delete competitor
const handleDelete = async (req) => {
  try {
    const userId = authorizeRequest(req); // Authorization check
    const { action, ...data } = await req.json();
    const deletedProject = await deleteCompetitor(data);

    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to delete competitor" },
      { status }
    );
  }
};

export const POST = connectDb(handlePost);
export const PUT = connectDb(handleUpdate);
export const DELETE = connectDb(handleDelete);
