import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import Finance from "../../../../../backend/models/finanicialModel";
import User from "../../../../../backend/models/user";

const getPlanData = async (req) => {
  try {
    const { planId, userId } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "planId is required" }, { status: 400 });
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
    console.log("User current plan:", user.currentPlan, "Has current plan:", hasCurrentPlan);
    const numberOfYears = hasCurrentPlan ? 5 : 2;
    
    console.log(`Generating ${numberOfYears}-year financial plan starting from`, startYear);

    const yearlyPlan = [];

    const productLines = JSON.parse(JSON.stringify(finance.revenue.productLines || []));
    const expensesCategories = JSON.parse(JSON.stringify(finance.expenses || {}));

    let currentYear = startYear;

    for (let i = 0; i < numberOfYears; i++) {
      let yearRevenue = 0;
      let yearExpenses = 0;

      for (let product of productLines) {
        const unitPrice = Number(product.unitPrice) || 0;
        const volume = Number(product.volume) || 0;
        const growthRate = Number(product.annualGrowthRate) || 0;
        
        const revenueThisYear = unitPrice * volume;
        yearRevenue += revenueThisYear;
        
        product.unitPrice = unitPrice * (1 + growthRate / 100);
      }

      for (let category in expensesCategories) {
        if (expensesCategories[category] && typeof expensesCategories[category] === 'object') {
          const expense = expensesCategories[category];
          const cost = Number(expense.cost) || 0;
          const growthRate = Number(expense.annualGrowthRate) || 0;
          
          if (cost > 1e10) {
            console.warn(`Extremely high cost detected in ${category}: ${cost}. Capping at 1e10.`);
            expense.cost = 1e10;
          }
          
          const yearlyCost = cost * 12;
          yearExpenses += yearlyCost;

          expense.cost = cost * (1 + growthRate / 100);
        }
      }

      const productCosts = Math.min(Number(finance.expenses?.productCosts?.cost || 0) * 12, 1e12);
      const grossMargin = yearRevenue - productCosts;
      const salaries = Math.min(Number(finance.expenses?.salaries?.cost || 0) * 12, 1e12);
      const addedValue = grossMargin - yearExpenses;
      const EBITDA = addedValue - salaries;
      const cashFlow = yearRevenue - yearExpenses;

      yearlyPlan.push({
        year: currentYear,
        revenue: yearRevenue,
        expenses: yearExpenses,
        grossMargin,
        addedValue,
        EBITDA,
        cashFlow,
      });

      console.log(`Year ${currentYear} calculations: Revenue=${yearRevenue}, Expenses=${yearExpenses}, EBITDA=${EBITDA}`);
      currentYear++;
    }

    console.log(`${numberOfYears}-year plan generated with`, yearlyPlan.length, "entries");

    const totalRevenue = yearlyPlan.reduce((sum, y) => sum + y.revenue, 0);
    const totalExpenses = yearlyPlan.reduce((sum, y) => sum + y.expenses, 0);
    const grossMarginTotal = yearlyPlan.reduce((sum, y) => sum + y.grossMargin, 0);
    const addedValueTotal = yearlyPlan.reduce((sum, y) => sum + y.addedValue, 0);
    const EBITDA_Total = yearlyPlan.reduce((sum, y) => sum + y.EBITDA, 0);
    const cashFlowTotal = yearlyPlan.reduce((sum, y) => sum + y.cashFlow, 0);

    const Principal = Number(finance.Principal) || 0;
    const Interest = Number(finance.Interest) || 0;
    
    const debtService = Principal + Interest;
    const debtCoverageRatio = debtService !== 0 ? cashFlowTotal / debtService : 0;

    const marketPotentialScore = 40;
    let fundingRecommendation = '';
    if (marketPotentialScore > 80) {
      fundingRecommendation = 'Highly likely to secure funding';
    } else if (marketPotentialScore > 50) {
      fundingRecommendation = 'Moderately likely to secure funding';
    } else {
      fundingRecommendation = 'Unlikely to secure funding';
    }

    const EBITDAMargin = totalRevenue !== 0 ? (EBITDA_Total / totalRevenue) * 100 : 0;

    const financialResults = {
      yearlyPlan,
      totalRevenue,
      grossMargin: grossMarginTotal,
      totalCharges: totalExpenses,
      addedValue: addedValueTotal,
      totalSalaries: Number(finance.expenses?.salaries?.cost || 0) * 12,
      EBITDA: EBITDA_Total,
      profitability: {
        isProfitable: EBITDA_Total > 0,
        EBITDAMargin: EBITDAMargin,
        debtCoverageRatio: debtCoverageRatio
      },
      scoring: {
        marketPotentialIndex: marketPotentialScore,
        recommendation: fundingRecommendation,
      },
    };

    console.log("Financial results summary:", {
      yearlyPlanLength: financialResults.yearlyPlan.length,
      totalRevenue: financialResults.totalRevenue,
      totalCharges: financialResults.totalCharges,
      EBITDA: financialResults.EBITDA
    });

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
      financialResults: {
        yearlyPlan: financialResults.yearlyPlan,
        totalRevenue: financialResults.totalRevenue,
        grossMargin: financialResults.grossMargin,
        totalCharges: financialResults.totalCharges,
        addedValue: financialResults.addedValue,
        totalSalaries: financialResults.totalSalaries,
        EBITDA: financialResults.EBITDA,
        profitability: financialResults.profitability,
        scoring: financialResults.scoring
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ message: "Failed to fetch plan data", error: error.message }, { status: 500 });
  }
};

export const POST = connectDb(getPlanData);
