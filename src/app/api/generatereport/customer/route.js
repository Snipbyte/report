import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

// Helper function to extract userId from Authorization header
const getUserIdFromAuthHeader = (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 }
    );
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};

// Create a new customer in the 'customer' array
const createCustomer = async (req) => {
  try {
    const { planId, customerType, description } = await req.json();
    const userId = getUserIdFromAuthHeader(req); // Get userId from token

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    // Basic validation
    if (!planId || !customerType || !description) {
      return NextResponse.json({ message: "planId, customerType, and description are required" }, { status: 400 });
    }

    // Find the plan by planId and userId
    const updatedPlan = await Plan.findOneAndUpdate(
      { _id: planId, userId }, 
      { $push: { customer: { customerType, description } } },
      { new: true }
    );

    if (!updatedPlan) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedPlan, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ message: "Failed to create customer" }, { status: 500 });
  }
};

// Get all customers from the 'customer' array
const getCustomers = async (req) => {
  try {
    const { planId } = req.query;
    const userId = getUserIdFromAuthHeader(req); // Get userId from token

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    if (!planId) {
      return NextResponse.json({ message: "planId is required" }, { status: 400 });
    }

    // Find the plan by planId and userId
    const plan = await Plan.findOne({ _id: planId, userId });

    if (!plan) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(plan.customer, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ message: "Failed to fetch customers" }, { status: 500 });
  }
};

// Update a customer at a specific index in the 'customer' array
const updateCustomer = async (req) => {
  try {
    const { planId, customerIndex, customerType, description } = await req.json();
    const userId = getUserIdFromAuthHeader(req); // Get userId from token

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    // Basic validation
    if (!planId || customerIndex === undefined || !customerType || !description) {
      return NextResponse.json({ message: "planId, customerIndex, customerType, and description are required" }, { status: 400 });
    }

    // Find the plan and update the customer at the specific index
    const updatedPlan = await Plan.findOneAndUpdate(
      { _id: planId, userId },
      { $set: { [`customer.${customerIndex}`]: { customerType, description } } },
      { new: true }
    );

    if (!updatedPlan) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json({ message: "Failed to update customer" }, { status: 500 });
  }
};

// Delete a customer at a specific index in the 'customer' array
const deleteCustomer = async (req) => {
  try {
    const { planId, customerIndex } = await req.json();
    const userId = getUserIdFromAuthHeader(req); // Get userId from token

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    // Basic validation
    if (!planId || customerIndex === undefined) {
      return NextResponse.json({ message: "planId and customerIndex are required" }, { status: 400 });
    }

    // Find and update the plan by removing the customer at the specific index
    const updatedPlan = await Plan.findOneAndUpdate(
      { _id: planId, userId },
      { $pull: { customer: { _id: planId } } },
      { new: true }
    );

    if (!updatedPlan) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json({ message: "Failed to delete customer" }, { status: 500 });
  }
};

export const POST = connectDb(createCustomer);
export const GET = connectDb(getCustomers);
export const PUT = connectDb(updateCustomer);
export const DELETE = connectDb(deleteCustomer);
