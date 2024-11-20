// /app/api/contactUs/create/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import ContactUs from "../../../../../../../backend/models/contactUs";

const createContactUsHandler = async (request) => {
  try {
    const data = await request.json();
    const { heading, description, file, buttonText, email } = data;

    if (!description || description.length === 0) {
      return NextResponse.json(
        { message: "Description is required to create a contact page" },
        { status: 400 }
      );
    }

    const newContactUs = new ContactUs({ heading, description, file, buttonText, email });
    await newContactUs.save();

    return NextResponse.json(
      { message: "Contact page created successfully", contactUs: newContactUs },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact page:", error);
    return NextResponse.json(
      { message: "Failed to create contact page", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createContactUsHandler);
