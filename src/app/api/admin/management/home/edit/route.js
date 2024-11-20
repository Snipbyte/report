// /app/api/homePage/update/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import HomePage from "../../../../../../../backend/models/home";

const patchHomePageHandler = async (request) => {
  try {
    const data = await request.json();
    const { sections } = data;

    if (!sections || sections.length === 0) {
      return NextResponse.json(
        { message: "Sections are required to update the Home Page" },
        { status: 400 }
      );
    }

    const updatedHomePage = await HomePage.findOneAndUpdate(
      {}, // Assuming a single home page document
      { sections, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedHomePage) {
      return NextResponse.json(
        { message: "Home Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Home Page updated successfully", homePage: updatedHomePage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Home Page:", error);
    return NextResponse.json(
      { message: "Failed to update Home Page", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = connectDb(patchHomePageHandler);
