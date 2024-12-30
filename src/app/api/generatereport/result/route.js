import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Project from "../../../../../backend/models/Plan";

const calculateMetricsForPlan = async (req) => {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json(
        { message: "planId is required" },
        { status: 400 }
      );
    }

    const project = await Project.findById(planId);

    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    const {
      revenue,
      productCosts,
      charges,
      salaries,
      cashFlow,
      debtService,
      marketPotentialIndex,
    } = project;

    const profitability = revenue - (productCosts + charges + salaries);
    const ebitda = revenue - (productCosts + charges + salaries);
    const ebitdaMargin = (ebitda / revenue) * 100;
    const debtCoverageRatio = cashFlow / debtService;
    const score =
      ebitdaMargin * 50 + debtCoverageRatio * 30 + marketPotentialIndex * 20;

    return NextResponse.json(
      {
        projectName: project.idea.projectName,
        profitability,
        ebitda,
        ebitdaMargin: `${ebitdaMargin.toFixed(2)}%`,
        debtCoverageRatio: debtCoverageRatio.toFixed(2),
        score,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to calculate metrics" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateMetricsForPlan);
