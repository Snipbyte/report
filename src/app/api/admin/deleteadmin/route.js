import { NextResponse } from 'next/server';
import connectDb from '../../../../../backend/middleware/db';
import Admin from '../../../../../backend/models/admin';

const deleteAdminHandler = async (request) => {
  const { email } = await request.json();

  try {
    if (email === "admin@admin.com") {
      return NextResponse.json(
        { message: "You cannot delete this admin." },
        { status: 403 }
      );
    }

    const deletedAdmin = await Admin.findOneAndDelete({ email });
    if (!deletedAdmin) {
      return NextResponse.json(
        { message: "Admin not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Admin deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { message: "Failed to delete admin." },
      { status: 500 }
    );
  }
};

export const DELETE = connectDb(deleteAdminHandler);
