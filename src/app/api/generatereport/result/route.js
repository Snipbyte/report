import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const calculateMetricsForPlan = async (req) => {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "planId is required" }, { status: 400 });
    }

    const project = await Project.findById(planId);

    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    // Extracting the required fields based on the updated schema
    const { 
      idea,
      market,
      competitors,
      customers,
      salesPitches,
      customerAcquisitionActions 
    } = project;

    const revenue = parseFloat(project?.revenue || 0);
    const productCosts = parseFloat(project?.productCosts || 0);
    const charges = parseFloat(project?.charges || 0);
    const salaries = parseFloat(project?.salaries || 0);
    const cashFlow = parseFloat(project?.cashFlow || 0);
    const debtService = parseFloat(project?.debtService || 0);
    const marketPotentialIndex = parseFloat(project?.marketPotentialIndex || 0);

    // Calculating metrics
    const profitability = revenue - (productCosts + charges + salaries);
    const ebitda = revenue - (productCosts + charges + salaries);
    const ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;
    const debtCoverageRatio = debtService > 0 ? cashFlow / debtService : 0;
    const score = (ebitdaMargin * 50) + (debtCoverageRatio * 30) + (marketPotentialIndex * 20);

    return NextResponse.json(
      {
        projectName: idea?.projectName || "Unknown",
        profitability,
        ebitda,
        ebitdaMargin: `${ebitdaMargin.toFixed(2)}%`,
        debtCoverageRatio: debtCoverageRatio.toFixed(2),
        score,
        marketDescription: market?.get("marketDescription") || "Not available",
        competitors: Array.from(competitors?.values() || []).map((competitor) => competitor.name),
        customers: Array.from(customers?.values() || []).map((customer) => customer.name),
        salesPitches: Array.from(salesPitches?.values() || []),
        customerAcquisitionActions: Array.from(customerAcquisitionActions?.values() || []).map((action) => action.name),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to calculate metrics" }, { status: 500 });
  }
};

export const POST = connectDb(calculateMetricsForPlan);
