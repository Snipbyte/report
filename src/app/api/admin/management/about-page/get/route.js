import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import AboutPage from "../../../../../../../backend/models/aboutPage";

const getAboutPageHandler = async () => {
  try {
    // Fetch the latest About Page
    const aboutPage = await AboutPage.findOne().sort({ createdAt: -1 });

    if (!aboutPage) {
      return NextResponse.json({ message: "About page not found" }, { status: 404 });
    }

    return NextResponse.json({ aboutPage }, { status: 200 });
  } catch (error) {
    console.error("Error fetching About page:", error);
    return NextResponse.json(
      { message: "Failed to fetch About page", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getAboutPageHandler);
