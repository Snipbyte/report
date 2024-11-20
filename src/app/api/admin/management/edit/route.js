import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import Section from "../../../../../../backend/models/section";
import connectDb from "../../../../../../backend/middleware/db"; 
require("dotenv").config();

const pump = promisify(pipeline);

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
};

const updateSectionHandler = async (request) => {
  try {
    const { sectionId, page, headings, descriptions, buttonTexts, contactInfo, images, ...sectionData } = await request.json();

    if (!sectionId) {
      return NextResponse.json(
        { message: "Section ID is required." },
        { status: 400 }
      );
    }

    // Find the section by ID
    const section = await Section.findById(sectionId);
    if (!section) {
      return NextResponse.json(
        { message: "Section not found." },
        { status: 404 }
      );
    }

    let imagePaths = [...section.images]; // Keep existing images

    // Handle image uploads
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageData = images[i].split(",")[1];
        const imageBuffer = Buffer.from(imageData, "base64");
        const uniqueFilename = `${generateSlug(page)}_${Date.now()}_${i}.png`; // Generate unique filename
        const imagePath = `./public/sectionimages/${uniqueFilename}`;

        await pump(
          Readable.from(imageBuffer),
          fs.createWriteStream(imagePath)
        );

        imagePaths.push(imagePath.replace("./public", "")); // Add the image path to the list
      }
    }

    // Update the section with new data
    section.set({
      ...sectionData,
      page,
      headings,
      descriptions,
      buttonTexts,
      contactInfo,
      images: imagePaths,
    });

    await section.save(); // Save the updated section

    return NextResponse.json(
      { message: "Section updated successfully.", section },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during section update:", error);
    return NextResponse.json(
      { message: "Failed to update section." },
      { status: 500 }
    );
  }
};

export const PATCH = connectDb(updateSectionHandler);
