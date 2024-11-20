// /app/api/contactUs/get/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import ContactUs from "../../../../../../../backend/models/contactUs";

const getContactUsHandler = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const contactUs = await ContactUs.findById(id);
      if (!contactUs) {
        return NextResponse.json(
          { message: "Contact page not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(contactUs);
    } else {
      const contactPages = await ContactUs.find({});
      return NextResponse.json(contactPages);
    }
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return NextResponse.json(
      { message: "Failed to fetch contact page", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getContactUsHandler);
