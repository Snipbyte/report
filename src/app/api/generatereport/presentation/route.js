import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createPresentation = async (req) => {
  try {
    const { content } = await req.json();
    const project = new Project({ presentation: { content } });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating presentation:", error);
    return NextResponse.json({ message: "Failed to save presentation" }, { status: 500 });
  }
};

const getPresentations = async () => {
  try {
    const presentations = await Project.find({}, "presentation");
    return NextResponse.json(presentations, { status: 200 });
  } catch (error) {
    console.error("Error fetching presentations:", error);
    return NextResponse.json({ message: "Failed to fetch presentations" }, { status: 500 });
  }
};

const updatePresentation = async (req) => {
  try {
    const { id, content } = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { presentation: { content } },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating presentation:", error);
    return NextResponse.json({ message: "Failed to update presentation" }, { status: 500 });
  }
};

const deletePresentation = async (req) => {
  try {
    const { id } = await req.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Presentation deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting presentation:", error);
    return NextResponse.json({ message: "Failed to delete presentation" }, { status: 500 });
  }
};

export const POST = connectDb(createPresentation);
export const GET = connectDb(getPresentations);
export const PUT = connectDb(updatePresentation);
export const DELETE = connectDb(deletePresentation);
