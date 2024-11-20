// /app/api/homePage/get/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import HomePage from "../../../../../../../backend/models/home";

const getHomePageHandler = async (request) => {
  try {
    const homePage = await HomePage.findOne({}); // Assuming a single home page document
    if (!homePage) {
      return NextResponse.json(
        { message: "Home Page not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(homePage);
  } catch (error) {
    console.error("Error fetching Home Page:", error);
    return NextResponse.json(
      { message: "Failed to fetch Home Page", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getHomePageHandler);
