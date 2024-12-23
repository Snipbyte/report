import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createCompetitor = async (req) => {
  try {
    const { competitorName, analysis, strengths, weaknesses } = await req.json();

    // Basic validation
    if (!competitorName || !analysis) {
      return NextResponse.json(
        { message: "Competitor name and analysis are required" },
        { status: 400 }
      );
    }

    const project = new Project({
      competitor: { competitorName, analysis, strengths, weaknesses },
    });
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

const getCompetitors = async () => {
  try {
    const competitors = await Project.find({}, "competitor");
    return NextResponse.json(competitors, { status: 200 });
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
    const { id, competitorName, analysis, strengths, weaknesses } =
      await req.json();

    // Basic validation
    if (!id || !competitorName || !analysis) {
      return NextResponse.json(
        { message: "ID, competitor name, and analysis are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { competitor: { competitorName, analysis, strengths, weaknesses } },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
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
    const { id } = await req.json();

    // Basic validation
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Competitor deleted successfully" },
      { status: 200 }
    );
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
