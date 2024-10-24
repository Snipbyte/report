import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Admin from "../../../../../backend/models/admin"; // Import the Admin model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const loginAdminHandler = async (request) => {
  try {
    const { email, password } = await request.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        admin: {
          id: admin._id,
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
          isVerified: admin.isVerified,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during admin login:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(loginAdminHandler);
