// file: /pages/api/blogs/edit.js
import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import connectDb from "../../../../../backend/middleware/db";
import BlogModel from "../../../../../backend/models/blog";

const pump = promisify(pipeline);

// Function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
};

const editBlogHandler = async (request) => {
  try {
    const { slug, title, description, tags, thumbnailImage, publishDate } =
      await request.json();

    // Find the existing blog post by slug
    const blog = await BlogModel.findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    // Update blog fields
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.tags = tags || blog.tags;
    blog.publishDate = publishDate || blog.publishDate;

    // Update slug if title changes
    if (title) {
      blog.slug = generateSlug(title);
    }

    // If a new thumbnail image is provided, process it
    if (thumbnailImage) {
      const thumbnailImageData = thumbnailImage.split(",")[1];
      const thumbnailImageBuffer = Buffer.from(thumbnailImageData, "base64");
      const uniqueFilename = `${generateSlug(title)}_${Date.now()}.png`;
      const thumbnailImagePath = `./public/blogthumbnails/${uniqueFilename}`;
      await pump(
        Readable.from(thumbnailImageBuffer),
        fs.createWriteStream(thumbnailImagePath)
      );
      blog.thumbnailImage = thumbnailImagePath.replace("./public", "");
    }

    await blog.save();

    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during blog update:", error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(editBlogHandler);
