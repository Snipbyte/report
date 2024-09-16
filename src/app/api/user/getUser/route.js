import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import User from "../../../../../backend/models/user";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic'; // Marks the route as dynamic

const getUserByIdHandler = async (request, { params }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; 
    const user = await User.findById(userId).select('-password'); 

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return the user data
    return NextResponse.json(
      { 
        message: "User retrieved successfully",
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          currentPlan: user.currentPlan
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getUserByIdHandler);
