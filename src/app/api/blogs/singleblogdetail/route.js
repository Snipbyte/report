import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import BlogModel from "../../../../../backend/models/blog";
require("dotenv").config();

const getBlogDetailHandler = async (request) => {
  try {
    const { slug } = await request.json();

    const blog = await BlogModel.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        blog,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch blog detail",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = connectDb(getBlogDetailHandler);
