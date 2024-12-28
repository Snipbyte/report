import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createIdea = async (req) => {
  try {
    const { typeOfActivity, projectName, address, launchDate } = await req.json();
    const project = new Project({ idea: { typeOfActivity, projectName, address, launchDate } });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save idea" }, { status: 500 });
  }
};

const getIdeas = async () => {
  try {
    const ideas = await Project.find({}, "idea");
    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch ideas" }, { status: 500 });
  }
};

const updateIdea = async (req) => {
  try {
    const { id, idea } = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(id, { idea }, { new: true });
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update idea" }, { status: 500 });
  }
};

const deleteIdea = async (req) => {
  try {
    const { id } = await req.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Idea deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete idea" }, { status: 500 });
  }
};

export const POST = connectDb(createIdea);
export const GET = connectDb(getIdeas);
export const PUT = connectDb(updateIdea);
export const DELETE = connectDb(deleteIdea);
