import { NextResponse } from "next/server";
import dbConnect from "../../../../../../backend/middleware/db";
import Plan from "../../../../../../backend/models/plans";

const updatePlan = async (req) => {
    try {
        const {plan_id} = req.query;
        const id = plan_id;
      const { price, description } = await req.json();
  
      if (!id) {
        return NextResponse.json({ message: "Plan ID is required." }, { status: 400 });
      }
  
      const updatedFields = {};
      if (price) updatedFields.price = price;
      if (description) updatedFields.description = description;
  
      const updatedPlan = await Plan.findByIdAndUpdate(id, updatedFields, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
  
      if (!updatedPlan) {
        return NextResponse.json({ message: "Plan not found." }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: updatedPlan }, { status: 200 });
    } catch (error) {
      console.error("Error updating plan:", error);
      return NextResponse.json({ message: "Failed to update plan." }, { status: 500 });
    }
  };

  export const PUT = dbConnect(updatePlan);