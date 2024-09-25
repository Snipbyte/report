// file: /app/api/blog/deleteBlog.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import BlogModel from "../../../../../backend/models/blog";

const deleteBlogHandler = async (request) => {
  try {
    const { slug } = await request.json(); // Extract slug from the request body

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findOneAndDelete({ slug });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(deleteBlogHandler);
