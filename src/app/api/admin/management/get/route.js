import { NextResponse } from "next/server";
import Section from "../../../../../../backend/models/section";
import connectDb from "../../../../../../backend/middleware/db";

const getAllSectionsHandler = async (request) => {
  try {
    // Accessing 'type' from the body in a POST request
    const { type } = await request.json();

    if (!type) {
      return NextResponse.json(
        { message: "Page type is required." },
        { status: 400 }
      );
    }

    const sections = await Section.find({ page: type }).sort({ order: 1 });

    if (!sections || sections.length === 0) {
      return NextResponse.json(
        { message: `No sections found for type: ${type}.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { sections },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during section fetch:", error);
    return NextResponse.json(
      { message: "Failed to fetch sections." },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getAllSectionsHandler);
