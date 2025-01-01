import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import Finance from "../../../../../backend/models/finanicialModel";
import jwt from "jsonwebtoken";

// Function to extract userId from Authorization header
const getUserIdFromAuthHeader = (request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is required" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  return userId;
};

// Create or Update Plan
const createOrUpdatePlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, planData } = await req.json();

    // Check if planId exists
    let plan;
    if (planId) {
      plan = await Plan.findOne({ _id: planId, userId });
      if (plan) {
        // If plan exists, update it
        plan.idea = planData.idea;
        plan.presentation = planData.presentation;
        plan.visitingCard = planData.visitingCard;
        plan.carrier = planData.carrier;
        plan.services = planData.services;
        plan.market = planData.market;
        plan.competitors = planData.competitors;
        plan.customers = planData.customers;
        plan.salesPitches = planData.salesPitches;
        plan.customerAcquisitionActions = planData.customerAcquisitionActions;

        // Handle financial data
        if (planData.financialData) {
          let finance = await Finance.findById(plan.financialData);
          if (finance) {
            // Update existing financial data
            finance.set(planData.financialData.data);
            await finance.save();
          } else {
            // Create new financial data
            finance = new Finance(planData.financialData.data);
            await finance.save();
            plan.financialData = finance._id;
          }
        }

        plan = await plan.save(); // Save the updated plan
      } else {
        return NextResponse.json(
          { message: "Plan not found or not authorized" },
          { status: 404 }
        );
      }
    } else {
      // If no planId, create a new plan
      let finance;
      if (planData.financialData) {
        finance = new Finance(planData.financialData.data);
        await finance.save();
      }

      plan = new Plan({
        userId,
        idea: planData.idea,
        presentation: planData.presentation,
        visitingCard: planData.visitingCard,
        carrier: planData.carrier,
        services: planData.services,
        market: planData.market,
        competitors: planData.competitors,
        customers: planData.customers,
        salesPitches: planData.salesPitches,
        customerAcquisitionActions: planData.customerAcquisitionActions,
        financialData: finance ? finance._id : undefined,
      });
      plan = await plan.save(); // Save the new plan
    }

    // Populate the financialData field
    plan = await plan.populate('financialData'); 

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update plan" },
      {
        status: error.message === "Authorization token is required" ? 401 : 500,
      }
    );
  }
};

// Exports for handling the API routes
export const POST = connectDb(createOrUpdatePlan); // Handles creating or updating the plan
