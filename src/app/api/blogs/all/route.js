import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import BlogModel from "../../../../../backend/models/blog";

const getAllBlogs = async () => {
  try {
    const blogs = await BlogModel.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getAllBlogs);
