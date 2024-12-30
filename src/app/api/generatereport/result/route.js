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

    const {
      idea,
      market,
      competitors,
      customers,
      salesPitches,
      customerAcquisitionActions,
      financials
    } = project;

    const revenue = parseFloat(financials?.revenue || 0);
    const productCosts = parseFloat(financials?.productCosts || 0);
    const charges = parseFloat(financials?.charges || 0);
    const salaries = parseFloat(financials?.salaries || 0);
    const cashFlow = parseFloat(financials?.cashFlow || 0);
    const debtService = parseFloat(financials?.debtService || 0);
    const marketPotentialIndex = parseFloat(financials?.marketPotentialIndex || 0);

    // Calculating Profitability, Gross Margin, Added Value, and EBITDA
    const grossMargin = revenue - productCosts;
    const addedValue = grossMargin - charges;
    const ebitda = addedValue - salaries;
    const profitability = revenue - (productCosts + charges + salaries);

    // Calculating EBITDA Margin and Debt Coverage Ratio
    const ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;
    const debtCoverageRatio = debtService > 0 ? cashFlow / debtService : 0;

    // Scoring Formula
    const score = (ebitdaMargin * 50) + (debtCoverageRatio * 30) + (marketPotentialIndex * 20);

    return NextResponse.json(
      {
        projectName: idea?.projectName || "Unknown",
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
    return NextResponse.json({ message: "Failed to calculate metrics" }, { status: 500 });
  }
};

export const POST = connectDb(calculateMetricsForPlan);
