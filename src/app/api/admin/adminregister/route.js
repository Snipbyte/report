import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Admin from '../../../../../backend/models/admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../../../../services';

const registerAdminHandler = async (request) => {
  try {
    const { firstname, lastname, email, password } = await request.json();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin already exists with this email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const newAdmin = new Admin({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false
    });
    await newAdmin.save();

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "Admin registered successfully. Please check your email to verify your account." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering admin:", error);
    return NextResponse.json(
      { message: "Failed to register admin" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(registerAdminHandler);
