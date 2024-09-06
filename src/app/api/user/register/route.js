import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import User from "../../../../../backend/models/user";
import bcrypt from "bcryptjs";

const registerUserHandler = async (request) => {
  try {
    const { firstname, lastname, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(registerUserHandler);
