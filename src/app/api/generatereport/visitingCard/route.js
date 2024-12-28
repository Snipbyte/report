import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";


const createVisitingCard = async (req) => {
  try {
    const { firstName, lastName, title, phone, email } = await req.json();
    const project = new Project({ visitingCard: { firstName, lastName, title, phone, email } });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save visiting card" }, { status: 500 });
  }
};

const getVisitingCards = async () => {
  try {
    const visitingCards = await Project.find({}, "visitingCard");
    return NextResponse.json(visitingCards, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch visiting cards" }, { status: 500 });
  }
};

const updateVisitingCard = async (req) => {
  try {
    const { id, firstName, lastName, title, phone, email } = await req.json();
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { visitingCard: { firstName, lastName, title, phone, email } },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update visiting card" }, { status: 500 });
  }
};

const deleteVisitingCard = async (req) => {
  try {
    const { id } = await req.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Visiting card deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete visiting card" }, { status: 500 });
  }
};

export const POST = connectDb(createVisitingCard);
export const GET = connectDb(getVisitingCards);
export const PUT = connectDb(updateVisitingCard);
export const DELETE = connectDb(deleteVisitingCard);
