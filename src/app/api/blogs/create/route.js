import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import connectDb from "../../../../../backend/middleware/db";
import BlogModel from "../../../../../backend/models/blog";
require("dotenv").config();

const pump = promisify(pipeline);

// Function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
};

const uploadBlogHandler = async (request) => {
  try {
    const { title, description, tags, thumbnailImage, publishDate } =
      await request.json();

    let thumbnailImagePath;
    if (thumbnailImage) {
      const thumbnailImageData = thumbnailImage.split(",")[1];
      const thumbnailImageBuffer = Buffer.from(thumbnailImageData, "base64");
      const uniqueFilename = `${generateSlug(title)}_${Date.now()}.png`; // Generate slug from title
      thumbnailImagePath = `./public/blogthumbnails/${uniqueFilename}`;

      await pump(
        Readable.from(thumbnailImageBuffer),
        fs.createWriteStream(thumbnailImagePath)
      );
    }

    // Generate slug for the blog
    const slug = generateSlug(title);

    // Create a new blog post with the generated slug
    const newBlog = new BlogModel({
      title,
      description,
      tags,
      thumbnailImage: thumbnailImagePath
        ? thumbnailImagePath.replace("./public", "")
        : undefined,
      publishDate,
      slug, 
    });

    await newBlog.save();

    return NextResponse.json(
      {
        message: "Blog uploaded successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error during blog upload:", error);
    return NextResponse.json(
      {
        message: "Failed to upload blog",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(uploadBlogHandler);
