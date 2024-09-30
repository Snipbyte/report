// pages/api/admin/edituser.js
import { NextResponse } from "next/server";
import User from "../../../../../backend/models/user";
import connectDb from "../../../../../backend/middleware/db";

// API handler to edit a user
const editUserHandler = async (req) => {
  const { id, firstname, lastname, email, currentPlan } = await req.json();

  if (!id || !firstname || !lastname || !email) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Update the user details
    const user = await User.findByIdAndUpdate(
      id,
      { firstname, lastname, email, currentPlan },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
};

// Export the PUT request handler
export const PUT = connectDb(editUserHandler);
