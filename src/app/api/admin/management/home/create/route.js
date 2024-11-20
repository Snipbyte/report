// /app/api/homePage/create/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import HomePage from "../../../../../../../backend/models/home";

const createHomePageHandler = async (request) => {
  try {
    const data = await request.json();
    const { sections } = data;

    if (!sections || sections.length === 0) {
      return NextResponse.json(
        { message: "Sections are required to create the Home Page" },
        { status: 400 }
      );
    }

    // Validate sections and save
    const newHomePage = new HomePage({ sections });
    await newHomePage.save();

    return NextResponse.json(
      { message: "Home Page created successfully", homePage: newHomePage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Home Page:", error);
    return NextResponse.json(
      { message: "Failed to create Home Page", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createHomePageHandler);
