import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";
import jwt from "jsonwebtoken";

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

// Function to create a customer acquisition
const createCustomerAcquisition = async (req, body) => {
  try {
    const { planId, strategyName, targetAudience, cost, channels, successRate } = body;

    const userId = getUserIdFromAuthHeader(req);

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    if (!planId || !strategyName || !targetAudience || !cost || !channels) {
      return NextResponse.json(
        {
          message: "Plan ID, strategy name, target audience, cost, and channels are required",
        },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      {
        $push: {
          customerAcquisition: {
            strategyName,
            targetAudience,
            cost,
            channels,
            successRate,
          },
        },
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 201 });
  } catch (error) {
    console.error("Error creating customer acquisition:", error);
    return NextResponse.json(
      { message: "Failed to save customer acquisition" },
      { status: 500 }
    );
  }
};

// Function to get all customer acquisitions for a project
const getCustomerAcquisitions = async (req, body) => {
  try {
    const { planId } = body;
    const userId = getUserIdFromAuthHeader(req);

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    const project = await Project.findOne({ _id: planId, userId });

    if (!project) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(project.customerAcquisition, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer acquisitions:", error);
    return NextResponse.json(
      { message: "Failed to fetch customer acquisitions" },
      { status: 500 }
    );
  }
};

// Function to update an existing customer acquisition
const updateCustomerAcquisition = async (req) => {
  try {
    const { planId, customerAcquisitionIndex, strategyName, targetAudience, cost, channels, successRate } = await req.json();

    const userId = getUserIdFromAuthHeader(req);

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    if (!planId || customerAcquisitionIndex === undefined || !strategyName || !targetAudience || !cost || !channels) {
      return NextResponse.json(
        {
          message: "Plan ID, customer acquisition index, strategy name, target audience, cost, and channels are required",
        },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      {
        $set: {
          [`customerAcquisition.${customerAcquisitionIndex}`]: {
            strategyName,
            targetAudience,
            cost,
            channels,
            successRate,
          },
        },
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating customer acquisition:", error);
    return NextResponse.json(
      { message: "Failed to update customer acquisition" },
      { status: 500 }
    );
  }
};

// Function to delete an existing customer acquisition
const deleteCustomerAcquisition = async (req) => {
  try {
    const { planId, customerAcquisitionIndex } = await req.json();

    const userId = getUserIdFromAuthHeader(req);

    if (!userId) {
      return NextResponse.json({ message: "Authorization required" }, { status: 401 });
    }

    if (!planId || customerAcquisitionIndex === undefined) {
      return NextResponse.json({ message: "Plan ID and customer acquisition index are required" }, { status: 400 });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: planId, userId },
      { $pull: { customerAcquisition: { _id: planId } } },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ message: "Plan not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error deleting customer acquisition:", error);
    return NextResponse.json(
      { message: "Failed to delete customer acquisition" },
      { status: 500 }
    );
  }
};

// Main request handler function
const handleRequest = async (req) => {
  try {
    const body = await req.json();  
    const { action } = body;

    switch (action) {
      case "create":
        return await createCustomerAcquisition(req, body);
      case "fetch":
        return await getCustomerAcquisitions(req, body);
      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ message: "Failed to parse request body" }, { status: 400 });
  }
};

// Exporting POST, PUT, DELETE methods with DB connection
export const POST = connectDb(handleRequest);
export const PUT = connectDb(updateCustomerAcquisition);
export const DELETE = connectDb(deleteCustomerAcquisition);
