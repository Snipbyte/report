import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";


const createCareer = async (req) => {
  try {
    const { questions, otherDetails } = await req.json();
    const project = new Project({ career: { questions, otherDetails } });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save career details" }, { status: 500 });
  }
};

const getCareers = async () => {
  try {
    const careers = await Project.find({}, "career");
    return NextResponse.json(careers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch career details" }, { status: 500 });
  }
};

const updateCareer = async (req) => {
  try {
    const { id, questions, otherDetails } = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { career: { questions, otherDetails } },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update career details" }, { status: 500 });
  }
};

const deleteCareer = async (req) => {
  try {
    const { id } = await req.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Career details deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete career details" }, { status: 500 });
  }
};

export const POST = connectDb(createCareer);
export const GET = connectDb(getCareers);
export const PUT = connectDb(updateCareer);
export const DELETE = connectDb(deleteCareer);
