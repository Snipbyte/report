import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import Finance from "../../../../../backend/models/finanicialModel";
import User from "../../../../../backend/models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const getPlanData = async (req) => {
  try {
    const { planId, userId } = await req.json();

    if (!planId && !userId) {
      return NextResponse.json({ message: "planId OR userId is required" }, { status: 400 });
    }


    const project = await Plan.findById(planId);
    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    const financialData = project.financialData;
    const finance = await Finance.findById(financialData);
    if (!finance) {
      return NextResponse.json({ message: "Finance data not found" }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentDate = new Date();
    const startYear = currentDate.getFullYear();
    const hasCurrentPlan = user && user.currentPlan && Object.keys(user.currentPlan).length > 0;
    const numberOfYears = hasCurrentPlan ? 5 : 2;

    const yearlyPlan = [];
    const productLines = JSON.parse(JSON.stringify(finance.revenue.productLines || []));
    const expensesCategories = JSON.parse(JSON.stringify(finance.expenses || {}));

    let currentYear = startYear;

    for (let i = 0; i < numberOfYears; i++) {
      // Calculate Revenue
      let yearRevenue = 0;
      for (let product of productLines) {
        const unitPrice = Number(product.unitPrice) || 0;
        const volume = Number(product.volume) || 0;
        const growthRate = Number(product.annualGrowthRate) || 0;

        const revenueThisYear = unitPrice * volume;
        yearRevenue += revenueThisYear;

        // Apply growth for next year
        product.unitPrice = unitPrice * (1 + growthRate / 100);
      }

      // Calculate Expenses
      let yearExpenses = 0;
      let intermediateConsumption = 0; // For Value Added calculation
      let staffCosts = 0; // For EBITDA calculation
      
      for (let category in expensesCategories) {
        if (expensesCategories[category] && typeof expensesCategories[category] === "object") {
          const expense = expensesCategories[category];
          const cost = Number(expense.cost) || 0;
          const growthRate = Number(expense.annualGrowthRate) || 0;

          if (cost > 1e10) {
            console.warn(`Extremely high cost detected in ${category}: ${cost}. Capping at 1e10.`);
            expense.cost = 1e10;
          }

          const yearlyCost = cost * (expense.frequency === 'yearly' ? 1 : 12);
          yearExpenses += yearlyCost;

          // Track specific expense categories for financial metrics
          if (category === 'salaries') {
            staffCosts = yearlyCost;
          }
          if (category !== 'salaries') {
            intermediateConsumption += yearlyCost;
          }

          expense.cost = cost * (1 + growthRate / 100);
        }
      }

      // Calculate Financial Metrics
      const productCosts = Math.min(Number(finance.expenses?.productCosts?.cost || 0) * 
                         (finance.expenses?.productCosts?.frequency === 'yearly' ? 1 : 12), 1e12);
      
      // 1. Gross Margin = Sales Revenue - Cost of Goods Sold (COGS)
      // COGS = Purchases of goods + Procurement costs - Inventory variation
      // Simplified: Using productCosts as COGS
      const grossMargin = yearRevenue - productCosts;

      // 2. Value Added = Gross Margin + Production for the year - Intermediate consumption
      // Simplified for trading company: Value Added = Sales Revenue - Consumed purchases
      const valueAdded = grossMargin - intermediateConsumption;

      // 3. EBITDA = Value Added + Operating subsidies - Taxes and duties - Staff costs
      // Simplified: EBITDA = Value Added - Staff costs (assuming no subsidies/taxes in this model)
      const EBITDA = valueAdded - staffCosts;

      // Cash Flow (simplified)
      const cashFlow = yearRevenue - yearExpenses;

      yearlyPlan.push({
        year: currentYear,
        revenue: yearRevenue,
        expenses: yearExpenses,
        productCosts,
        intermediateConsumption,
        staffCosts,
        grossMargin,
        valueAdded,
        EBITDA,
        cashFlow,
      });

      currentYear++;
    }

    // Calculate Totals
    const totalRevenue = yearlyPlan.reduce((sum, y) => sum + y.revenue, 0);
    const totalExpenses = yearlyPlan.reduce((sum, y) => sum + y.expenses, 0);
    const totalProductCosts = yearlyPlan.reduce((sum, y) => sum + y.productCosts, 0);
    const totalGrossMargin = yearlyPlan.reduce((sum, y) => sum + y.grossMargin, 0);
    const totalValueAdded = yearlyPlan.reduce((sum, y) => sum + y.valueAdded, 0);
    const EBITDA_Total = yearlyPlan.reduce((sum, y) => sum + y.EBITDA, 0);
    const cashFlowTotal = yearlyPlan.reduce((sum, y) => sum + y.cashFlow, 0);
    const totalStaffCosts = yearlyPlan.reduce((sum, y) => sum + y.staffCosts, 0);

    // Debt Calculations
    const Principal = Number(finance.Principal) || 0;
    const Interest = Number(finance.Interest) || 0;
    const debtService = Principal + Interest;
    const debtCoverageRatio = debtService !== 0 ? EBITDA_Total / debtService : 0;

    // Profitability Metrics
    const EBITDAMargin = totalRevenue !== 0 ? (EBITDA_Total / totalRevenue) * 100 : 0;
    const grossMarginPercentage = totalRevenue !== 0 ? (totalGrossMargin / totalRevenue) * 100 : 0;
    const valueAddedPercentage = totalRevenue !== 0 ? (totalValueAdded / totalRevenue) * 100 : 0;

    // Scoring (simplified example)
    const marketPotentialScore = Math.min(Math.max(
      Math.floor(
        (grossMarginPercentage / 2) + 
        (EBITDAMargin * 1.5) + 
        (debtCoverageRatio * 20)
      , 0), 100));

    let fundingRecommendation = "";
    if (marketPotentialScore > 80) {
      fundingRecommendation = "Highly likely to secure funding";
    } else if (marketPotentialScore > 50) {
      fundingRecommendation = "Moderately likely to secure funding";
    } else {
      fundingRecommendation = "Unlikely to secure funding";
    }
  
    // Prepare final financial results
    const financialResults = {
      yearlyPlan,
      totalRevenue,
      totalProductCosts,
      grossMargin: totalGrossMargin,
      grossMarginPercentage,
      totalCharges: totalExpenses,
      valueAdded: totalValueAdded,
      valueAddedPercentage,
      totalSalaries: totalStaffCosts,
      EBITDA: EBITDA_Total,
      profitability: {
        isProfitable: EBITDA_Total > 0,
        EBITDAMargin,
        grossMarginPercentage,
        valueAddedPercentage,
        debtCoverageRatio,
      },
      scoring: {
        marketPotentialIndex: marketPotentialScore,
        recommendation: fundingRecommendation,
      },
    };

    // Save updated financial results
    finance.financialResults = financialResults;
    await finance.save();

    return NextResponse.json({
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
      financialResults,
    }, { status: 200 });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ message: "Failed to fetch plan data", error: error.message }, { status: 500 });
  }
};

export const POST = connectDb(getPlanData);