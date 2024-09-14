import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Blog from '../../../../../backend/models/blog';

const getBlogDetailBySlug = async (request, { params }) => {
  try {
    const { slug } = params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json({ message: 'Failed to fetch blog' }, { status: 500 });
  }
};

export const GET = connectDb(getBlogDetailBySlug);
