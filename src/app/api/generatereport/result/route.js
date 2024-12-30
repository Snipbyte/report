import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";

// Function to get the full plan data and calculate financial metrics
const getPlanData = async (req) => {
  try {
    const { planId } = await req.json();

    // Ensure the planId is provided
    if (!planId) {
      return NextResponse.json(
        { message: "planId is required" },
        { status: 400 }
      );
    }

    // Find the plan by ID
    const project = await Plan.findById(planId);

    // If the plan is not found, return a 404 error
    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    // Destructure the financials object
    const {
      revenue = 0,
      productCosts = 0,
      charges = 0,
      salaries = 0,
      cashFlow = 0,
      debtService = 0,
      marketPotentialIndex = 0
    } = project.financials || {};

    // Financial Calculations
    const revenueValue = parseFloat(revenue);
    const productCostsValue = parseFloat(productCosts);
    const chargesValue = parseFloat(charges);
    const salariesValue = parseFloat(salaries);
    const cashFlowValue = parseFloat(cashFlow);
    const debtServiceValue = parseFloat(debtService);
    const marketPotentialIndexValue = parseFloat(marketPotentialIndex);

    // Calculating Profitability, Gross Margin, Added Value, and EBITDA
    const grossMargin = revenueValue - productCostsValue;
    const addedValue = grossMargin - chargesValue;
    const ebitda = addedValue - salariesValue;
    const profitability = revenueValue - (productCostsValue + chargesValue + salariesValue);

    // Calculating EBITDA Margin and Debt Coverage Ratio
    const ebitdaMargin = revenueValue > 0 ? (ebitda / revenueValue) * 100 : 0;
    const debtCoverageRatio = debtServiceValue > 0 ? cashFlowValue / debtServiceValue : 0;

    // Scoring Formula
    const score = (ebitdaMargin * 50) + (debtCoverageRatio * 30) + (marketPotentialIndexValue * 20);

    // Return full plan data and financial metrics
    return NextResponse.json(
      {
        projectName: project.idea?.projectName || "Unknown",
        typeOfActivity: project.idea?.typeOfActivity || "Unknown",
        address: project.idea?.address || "Unknown",
        launchDate: project.idea?.launchDate || "Unknown",
        presentation: project.presentation || {},
        visitingCard: project.visitingCard || {},
        carrier: project.carrier || {},
        services: project.services || {},
        market: project.market || {},
        competitors: project.competitors || {},
        customers: project.customers || {},
        salesPitches: project.salesPitches || {},
        customerAcquisitionActions: project.customerAcquisitionActions || {},
        financials: project.financials || {},
        createdAt: project.createdAt || "Unknown",

        // Calculated financial metrics
        profitability,
        grossMargin,
        addedValue,
        ebitda,
        ebitdaMargin: `${ebitdaMargin.toFixed(2)}%`,
        debtCoverageRatio: debtCoverageRatio.toFixed(2),
        score,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch plan data" }, { status: 500 });
  }
};

// Export the POST method for API request handling
export const POST = connectDb(getPlanData);
