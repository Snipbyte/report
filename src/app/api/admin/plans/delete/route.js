import { NextResponse } from "next/server";
import dbConnect from "../../../../../../backend/middleware/db";
import Plan from "../../../../../../backend/models/plans";

const deletePlan = async (req) => {
    try {
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ message: "Plan ID is required." }, { status: 400 });
      }
  
      const deletedPlan = await Plan.findByIdAndDelete(id);
  
      if (!deletedPlan) {
        return NextResponse.json({ message: "Plan not found." }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Plan deleted successfully." }, { status: 200 });
    } catch (error) {
      console.error("Error deleting plan:", error);
      return NextResponse.json({ message: "Failed to delete plan." }, { status: 500 });
    }
  };

  export const DELETE = dbConnect(deletePlan);