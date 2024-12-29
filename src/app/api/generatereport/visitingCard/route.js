import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

const authorizeRequest = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const createVisitingCard = async (data) => {
  const { planId, firstName, lastName, title, phone, email } = data;
  if (!planId || !firstName || !lastName || !phone || !email) {
    throw new Error(
      "All fields (planId, firstName, lastName, phone, email) are required"
    );
  }

  const plan = await Project.findById(planId);
  if (!plan) {
    throw new Error("Plan not found");
  }

  plan.visitingCard = { firstName, lastName, title, phone, email };
  const updatedPlan = await plan.save();
  return updatedPlan;
};

const getVisitingCards = async (data) => {
  const { planId } = data;
  if (!planId) {
    throw new Error("Plan ID is required");
  }

  const project = await Project.findOne(
    { _id: planId },
    "visitingCard"
  );

  if (!project) {
    throw new Error("Plan not found or unauthorized");
  }

  if (!project.visitingCard) {
    throw new Error("No visiting card found");
  }

  return project.visitingCard;
};

const handlePost = async (req) => {
  try {
    authorizeRequest(req);
    const { action, ...data } = await req.json();

    let result;

    switch (action) {
      case "create":
        result = await createVisitingCard(data);
        return NextResponse.json(result, { status: 201 });
      case "fetch":
        result = await getVisitingCards(data);
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

const updateVisitingCard = async (req) => {
  try {
    authorizeRequest(req);
    const { planId, firstName, lastName, title, phone, email } = await req.json();

    if (!planId || !firstName || !lastName || !phone || !email) {
      throw new Error(
        "All fields (planId, firstName, lastName, phone, email) are required"
      );
    }

    const updatedPlan = await Project.findOneAndUpdate(
      { _id: planId },
      { visitingCard: { firstName, lastName, title, phone, email } },
      { new: true }
    );

    if (!updatedPlan) {
      throw new Error("Plan not found or unauthorized");
    }

    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to update visiting card" },
      { status }
    );
  }
};

const deleteVisitingCard = async (req) => {
  try {
    authorizeRequest(req);

    const { planId } = await req.json();

    if (!planId) {
      throw new Error("Plan ID is required");
    }

    const updatedPlan = await Project.findOneAndUpdate(
      { _id: planId },
      { $unset: { visitingCard: "" } },
      { new: true }
    );

    if (!updatedPlan) {
      throw new Error("Plan not found or unauthorized");
    }

    return NextResponse.json(
      { message: "Visiting card deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const status =
      error.message === "Unauthorized" || error.message === "Invalid token"
        ? 401
        : 500;
    return NextResponse.json(
      { message: error.message || "Failed to delete visiting card" },
      { status }
    );
  }
};

export const POST = connectDb(handlePost);
export const PUT = connectDb(updateVisitingCard);
export const DELETE = connectDb(deleteVisitingCard);
