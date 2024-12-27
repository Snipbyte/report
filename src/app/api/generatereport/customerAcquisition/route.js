import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const createCustomerAcquisition = async (req) => {
  try {
    const { strategyName, targetAudience, cost, channels, successRate } =
      await req.json();

    // Basic validation
    if (!strategyName || !targetAudience || !cost || !channels) {
      return NextResponse.json(
        {
          message:
            "Strategy name, target audience, cost, and channels are required",
        },
        { status: 400 }
      );
    }

    const project = new Project({
      customerAcquisition: {
        strategyName,
        targetAudience,
        cost,
        channels,
        successRate,
      },
    });
    const savedProject = await project.save();
    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating customer acquisition:", error);
    return NextResponse.json(
      { message: "Failed to save customer acquisition" },
      { status: 500 }
    );
  }
};

const getCustomerAcquisitions = async () => {
  try {
    const acquisitions = await Project.find({}, "customerAcquisition");
    return NextResponse.json(acquisitions, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer acquisitions:", error);
    return NextResponse.json(
      { message: "Failed to fetch customer acquisitions" },
      { status: 500 }
    );
  }
};

const updateCustomerAcquisition = async (req) => {
  try {
    const { id, strategyName, targetAudience, cost, channels, successRate } =
      await req.json();

    // Basic validation
    if (!id || !strategyName || !targetAudience || !cost || !channels) {
      return NextResponse.json(
        {
          message:
            "ID, strategy name, target audience, cost, and channels are required",
        },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        customerAcquisition: {
          strategyName,
          targetAudience,
          cost,
          channels,
          successRate,
        },
      },
      { new: true }
    );
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating customer acquisition:", error);
    return NextResponse.json(
      { message: "Failed to update customer acquisition" },
      { status: 500 }
    );
  }
};

const deleteCustomerAcquisition = async (req) => {
  try {
    const { id } = await req.json();

    // Basic validation
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Customer acquisition deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting customer acquisition:", error);
    return NextResponse.json(
      { message: "Failed to delete customer acquisition" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createCustomerAcquisition);
export const GET = connectDb(getCustomerAcquisitions);
export const PUT = connectDb(updateCustomerAcquisition);
export const DELETE = connectDb(deleteCustomerAcquisition);
