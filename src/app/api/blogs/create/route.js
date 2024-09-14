import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Blog from '../../../../../backend/models/blog';

const createBlog = async (request) => {
  try {
    const { title, description, tags } = await request.json();

    if (!title || !description || !thumbnail) {
      return NextResponse.json({ message: 'Title, description, and thumbnail are required' }, { status: 400 });
    }

    const newBlog = new Blog({
      title,
      description,
      tags,
      thumbnail
    });

    await newBlog.save();

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ message: 'Failed to create blog' }, { status: 500 });
  }
};

export const POST = connectDb(createBlog);
