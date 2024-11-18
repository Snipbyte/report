import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import AboutPage from "../../../../../../../backend/models/aboutPage";

const updateAboutPageHandler = async (request) => {
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

    // Find and update the AboutPage document
    const aboutPage = await AboutPage.findOneAndUpdate(
      {}, // Find the first document (assuming one About page)
      { heading1, heading2, heading3, paragraphs, file },
      { new: true }
    );

    if (!aboutPage) {
      return NextResponse.json({ message: "About page not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "About Page updated successfully", aboutPage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating About page:", error);
    return NextResponse.json(
      { message: "Failed to update About page", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = connectDb(updateAboutPageHandler);
