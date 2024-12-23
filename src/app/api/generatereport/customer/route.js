import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createCustomer = async (req) => {
  try {
    const { name, email, phone, address, preferences } = await req.json();

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const project = new Project({
      customer: { name, email, phone, address, preferences },
    });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { message: "Failed to save customer" },
      { status: 500 }
    );
  }
};

const getCustomers = async () => {
  try {
    const customers = await Project.find({}, "customer");
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { message: "Failed to fetch customers" },
      { status: 500 }
    );
  }
};

const updateCustomer = async (req) => {
  try {
    const { id, name, email, phone, address, preferences } = await req.json();

    // Basic validation
    if (!id || !name || !email || !phone) {
      return NextResponse.json(
        { message: "ID, name, email, and phone are required" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { customer: { name, email, phone, address, preferences } },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { message: "Failed to update customer" },
      { status: 500 }
    );
  }
};

const deleteCustomer = async (req) => {
  try {
    const { id } = await req.json();

    // Basic validation
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Customer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { message: "Failed to delete customer" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createCustomer);
export const GET = connectDb(getCustomers);
export const PUT = connectDb(updateCustomer);
export const DELETE = connectDb(deleteCustomer);
