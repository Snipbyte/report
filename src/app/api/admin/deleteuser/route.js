// pages/api/admin/deleteuser.js
import { NextResponse } from "next/server";
import User from "../../../../../backend/models/user";
import connectDb from "../../../../../backend/middleware/db";

// API handler to delete a user
const deleteUserHandler = async (req) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { id } = await req.json(); // Read user ID from request body

  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
};

// Export the POST request handler
export const POST = connectDb(deleteUserHandler);
