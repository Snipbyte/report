import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { pipeline } from "stream";
import connectDb from "../../../../../../../backend/middleware/db";
import LandingPage from "../../../../../../../backend/models/landingPage";

const pump = promisify(pipeline);

const updateLandingPageHandler = async (request) => {
  try {
    const { id } = request.query;  // Get the landing page ID from query params
    const data = await request.json();
    const { sections } = data;

    // Validate required fields
    if (!sections || sections.length === 0) {
      return NextResponse.json(
        { message: "Sections are required to update the landing page" },
        { status: 400 }
      );
    }

    const landingPageSections = [];

    for (const section of sections) {
      const { heading, description, file, buttonText } = section;

      let filePath = null;

      if (file) {
        const fileData = file.split(",")[1];  // Extract base64 string
        const fileBuffer = Buffer.from(fileData, "base64");
        const uniqueFilename = `${Date.now()}.png`;  // Generate unique filename
        const fileDir = path.join("./public/landingPageImages", uniqueFilename);

        await pump(Readable.from(fileBuffer), fs.createWriteStream(fileDir));
        filePath = fileDir.replace("./public", "");  // Store relative path
      }

      landingPageSections.push({
        heading,
        description,
        file: filePath,
        buttonText
      });
    }

    // Update the existing landing page document
    const updatedLandingPage = await LandingPage.findByIdAndUpdate(
      id, 
      { sections: landingPageSections }, 
      { new: true }
    );

    return NextResponse.json(
      { message: "Landing page updated successfully", landingPage: updatedLandingPage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating landing page:", error);
    return NextResponse.json(
      { message: "Failed to update landing page", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = connectDb(updateLandingPageHandler);
