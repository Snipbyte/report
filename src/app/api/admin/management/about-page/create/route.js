import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import AboutPage from "../../../../../../../backend/models/aboutPage";

const createAboutPageHandler = async (request) => {
  try {
    const data = await request.json();
    const { heading1, heading2, heading3, paragraphs, file } = data;

    // Validate required fields
    if (!heading1 || !heading2 || !heading3 || !paragraphs || paragraphs.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new AboutPage document
    const newAboutPage = new AboutPage({
      heading1,
      heading2,
      heading3,
      paragraphs,
      file,
    });
    await newAboutPage.save();

    return NextResponse.json(
      { message: "About Page created successfully", aboutPage: newAboutPage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating About page:", error);
    return NextResponse.json(
      { message: "Failed to create About page", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createAboutPageHandler);
