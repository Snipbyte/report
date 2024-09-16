import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import User from '../../../../backend/models/user';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic'; // Marks the route as dynamic

const verifyEmailHandler = async (request) => {
  try {
    const url = request.nextUrl; // Use nextUrl instead of request.url
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is required" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Verify the user's email
    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "Failed to verify email" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(verifyEmailHandler);
