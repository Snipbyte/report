import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Admin from '../../../../../backend/models/admin';

const fetchAdminsHandler = async (request) => {
  try {
    const admins = await Admin.find();
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { message: "Failed to fetch admins" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(fetchAdminsHandler);
