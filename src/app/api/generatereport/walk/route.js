import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createWalk = async (req) => {
  try {
    const { customer, details } = await req.json();

    // Basic validation
    if (!customer || !details) {
      return NextResponse.json(
        { message: "Customer and details are required" },
        { status: 400 }
      );
    }

    const project = new Project({ walk: { customer, details } });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating walk:", error);
    return NextResponse.json({ message: "Failed to save walk" }, { status: 500 });
  }
};

const getWalks = async () => {
  try {
    const walks = await Project.find({}, "walk");
    return NextResponse.json(walks, { status: 200 });
  } catch (error) {
    console.error("Error fetching walks:", error);
    return NextResponse.json({ message: "Failed to fetch walks" }, { status: 500 });
  }
};

const updateWalk = async (req) => {
  try {
    const { id, customer, details } = await req.json();

    // Basic validation
    if (!id || !customer || !details) {
      return NextResponse.json(
        { message: "ID, customer, and details are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { walk: { customer, details } },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating walk:", error);
    return NextResponse.json({ message: "Failed to update walk" }, { status: 500 });
  }
};

const deleteWalk = async (req) => {
  try {
    const { id } = await req.json();

    // Basic validation
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Walk deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting walk:", error);
    return NextResponse.json({ message: "Failed to delete walk" }, { status: 500 });
  }
};

export const POST = connectDb(createWalk);
export const GET = connectDb(getWalks);
export const PUT = connectDb(updateWalk);
export const DELETE = connectDb(deleteWalk);
