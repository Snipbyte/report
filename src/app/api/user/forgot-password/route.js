import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "../../../../services";
import User from "../../../../../backend/models/user"; 
import bcrypt from 'bcrypt'; 

export const POST = async (request) => {
  const { email } = await request.json();

  const newPassword = generateRandomPassword(); 
  const hashedPassword = await bcrypt.hash(newPassword, 10); 
  const expirationTime = Date.now() + 5 * 60 * 1000; 

  try {
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }

    user.password = hashedPassword;
    await user.save();

    await sendResetPasswordEmail(email, newPassword);

  } catch (error) {
    console.error('Error:', error); 
    return new NextResponse("Failed to reset password. Please try again.", {
      status: 500,
    });
  }

  return new NextResponse("New password sent to your email.", {
    status: 200,
  });
};

const generateRandomPassword = () => {
  const passwordLength = 8; 
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"; 
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
