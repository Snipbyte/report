import { NextResponse } from "next/server";
import User from "../../../../../backend/models/user";
import connectDb from "../../../../../backend/middleware/db";

// API handler to fetch all users
const getAllUsersHandler = async () => {
  try {
    // Fetch all users, excluding the password field
    const users = await User.find().select('-password');
    
    // Check if any users exist
    if (!users.length) {
      return NextResponse.json(
        { message: "No users found" },
        { status: 404 }
      );
    }

    // Return the list of users
    return NextResponse.json(
      { 
        message: "Users retrieved successfully",
        users
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
};

// Export the GET request handler
export const GET = connectDb(getAllUsersHandler);
