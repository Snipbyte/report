import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createCommercial = async (req) => {
  try {
    const { campaignName, budget, startDate, endDate, performance } =
      await req.json();

    // Basic validation
    if (!campaignName || !budget || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Campaign name, budget, start date, and end date are required" },
        { status: 400 }
      );
    }

    const project = new Project({
      commercial: { campaignName, budget, startDate, endDate, performance },
    });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating commercial:", error);
    return NextResponse.json(
      { message: "Failed to save commercial" },
      { status: 500 }
    );
  }
};

const getCommercials = async () => {
  try {
    const commercials = await Project.find({}, "commercial");
    return NextResponse.json(commercials, { status: 200 });
  } catch (error) {
    console.error("Error fetching commercials:", error);
    return NextResponse.json(
      { message: "Failed to fetch commercials" },
      { status: 500 }
    );
  }
};

const updateCommercial = async (req) => {
  try {
    const { id, campaignName, budget, startDate, endDate, performance } =
      await req.json();

    // Basic validation
    if (!id || !campaignName || !budget || !startDate || !endDate) {
      return NextResponse.json(
        { message: "ID, campaign name, budget, start date, and end date are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        commercial: { campaignName, budget, startDate, endDate, performance },
      },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating commercial:", error);
    return NextResponse.json(
      { message: "Failed to update commercial" },
      { status: 500 }
    );
  }
};

const deleteCommercial = async (req) => {
  try {
    const { id } = await req.json();

    // Basic validation
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Commercial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting commercial:", error);
    return NextResponse.json(
      { message: "Failed to delete commercial" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createCommercial);
export const GET = connectDb(getCommercials);
export const PUT = connectDb(updateCommercial);
export const DELETE = connectDb(deleteCommercial);
