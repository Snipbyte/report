import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import Finance from "../../../../../backend/models/finanicialModel";
import jwt from "jsonwebtoken";

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

const createOrUpdatePlan = async (req) => {
  try {
    const userId = getUserIdFromAuthHeader(req);
    const { planId, planData } = await req.json();

    let plan;
    if (planId) {
      plan = await Plan.findOne({ _id: planId, userId });
      if (plan) {
        plan.idea = planData.idea || plan.idea;
        plan.presentation = planData.presentation || plan.presentation;
        plan.visitingCard = planData.visitingCard || plan.visitingCard;
        plan.carrier = planData.carrier || plan.carrier;
        plan.services = planData.services || plan.services;
        plan.market = planData.market || plan.market;
        plan.competitors = planData.competitors || plan.competitors;
        plan.customers = planData.customers || plan.customers;
        plan.salesPitches = planData.salesPitches || plan.salesPitches;
        plan.customerAcquisitionActions = 
          planData.customerAcquisitionActions || plan.customerAcquisitionActions;

        if (planData.financialData?.data) {
          let finance;
          if (plan.financialData) {
            finance = await Finance.findById(plan.financialData);
            if (finance) {
              finance.set(planData.financialData.data);
              await finance.save();
            } else {
              finance = new Finance(planData.financialData.data);
              await finance.save();
              plan.financialData = finance._id;
            }
          } else {
            finance = new Finance(planData.financialData.data);
            await finance.save();
            plan.financialData = finance._id;
          }
        }

        plan = await plan.save();
      } else {
        return NextResponse.json(
          { message: "Plan not found or not authorized" },
          { status: 404 }
        );
      }
    } else {
      let finance;
      if (planData.financialData?.data) {
        finance = new Finance(planData.financialData.data);
        await finance.save();
      }

      plan = new Plan({
        userId,
        idea: planData.idea || "",
        presentation: planData.presentation || "",
        visitingCard: planData.visitingCard || "",
        carrier: planData.carrier || "",
        services: planData.services || "",
        market: planData.market || "",
        competitors: planData.competitors || "",
        customers: planData.customers || "",
        salesPitches: planData.salesPitches || "",
        customerAcquisitionActions: planData.customerAcquisitionActions || "",
        financialData: finance ? finance._id : undefined,
      });
      plan = await plan.save();
    }

    plan = await Plan.populate(plan, { path: 'financialData' });

    return NextResponse.json({
      success: true,
      plan: {
        ...plan._doc,
        financialData: plan.financialData || null
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error in createOrUpdatePlan:", error);
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Failed to update plan",
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      {
        status: error.message === "Authorization token is required" ? 401 : 500,
      }
    );
  }
};

export const POST = connectDb(createOrUpdatePlan);