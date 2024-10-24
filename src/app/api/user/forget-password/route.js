import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { sendResetPasswordEmail } from "../../../../services";
import bcrypt from "bcrypt";
import User from "../../../../../backend/models/user";

// Marks the route as dynamic
export const dynamic = "force-dynamic";

const resetPasswordHandler = async (request) => {
  // Ensure only POST requests are processed
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const { email } = await request.json();
  const newPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    user.password = hashedPassword;
    await user.save();

    await sendResetPasswordEmail(email, newPassword);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "New password sent to your email." },
    { status: 200 }
  );
};

const generateRandomPassword = () => {
  const passwordLength = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// Connect the database and export the handler
export const POST = connectDb(resetPasswordHandler);
