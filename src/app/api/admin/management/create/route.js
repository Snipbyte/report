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

const createSectionHandler = async (request) => {
  try {
    const { page, headings, descriptions, buttonTexts, contactInfo, images, ...sectionData } = await request.json();

    let imagePaths = [];

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

        imagePaths.push(imagePath.replace("./public", "")); 
      }
    }

    const lastSection = await Section.findOne({ page }).sort({ order: -1 });

    const order = lastSection ? lastSection.order + 1 : 1;

    const newSection = new Section({
      ...sectionData,
      page,
      order,
      headings,
      descriptions,
      buttonTexts,
      contactInfo,
      images: imagePaths,
    });

    await newSection.save();

    return NextResponse.json(
      { message: "Section created successfully.", section: newSection },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during section creation:", error);
    return NextResponse.json(
      { message: "Failed to create section." },
      { status: 500 }
    );
  }
};
 
export const POST = connectDb(createSectionHandler);
