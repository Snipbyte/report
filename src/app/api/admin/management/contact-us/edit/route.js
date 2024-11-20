// /app/api/contactUs/update/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import ContactUs from "../../../../../../../backend/models/contactUs";

const patchContactUsHandler = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID is required to update a contact page" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const { heading, description, file, buttonText, email } = data;

    const updatedContactUs = await ContactUs.findByIdAndUpdate(
      id,
      { heading, description, file, buttonText, email },
      { new: true, runValidators: true }
    );

    if (!updatedContactUs) {
      return NextResponse.json(
        { message: "Contact page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact page updated successfully", contactUs: updatedContactUs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact page:", error);
    return NextResponse.json(
      { message: "Failed to update contact page", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = connectDb(patchContactUsHandler);
