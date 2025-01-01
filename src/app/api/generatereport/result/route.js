import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import Plan from "../../../../../backend/models/Plan";
import Finance from "../../../../../backend/models/finanicialModel";

// Function to fetch plan and finance data
const getPlanData = async (req) => {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return NextResponse.json({ message: "planId is required" }, { status: 400 });
    }

    const project = await Plan.findById(planId);
    if (!project) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    const financialData = project.financialData;
    const finance = await Finance.findById(financialData);
    console.log(finance.financialResults)
    if (!finance) {
      return NextResponse.json({ message: "Finance data not found" }, { status: 404 });
    }

    const period = finance.revenue.period;

    // Revenue calculation
    const revenueResults = finance.revenue.productLines.map((product) => {
      let totalRevenue = 0;
      let yearlyRevenue = [];

      for (let year = period.startYear; year <= period.endYear; year++) {
        const revenueYear = product.unitPrice * product.volume;
        yearlyRevenue.push(revenueYear);
        totalRevenue += revenueYear;

        // Apply annual growth rate to unit price for next year
        product.unitPrice *= (1 + product.annualGrowthRate / 100);
      }

      return { product: product.name, yearlyRevenue, totalRevenue };
    });

    // Expenses calculation
    const expenseResults = Object.keys(finance.expenses).map((category) => {
      const expenseData = finance.expenses[category];
      let totalExpense = 0;
      let yearlyExpense = [];

      for (let year = period.startYear; year <= period.endYear; year++) {
        const yearlyCost = expenseData.cost * 12 * (1 + expenseData.annualGrowthRate / 100);
        yearlyExpense.push(yearlyCost);
        totalExpense += yearlyCost;

        // Apply annual growth rate to cost for next year
        expenseData.cost *= (1 + expenseData.annualGrowthRate / 100);
      }

      return { category, yearlyExpense, totalExpense };
    });

    const totalProductCosts = finance.expenses.productCosts.cost * period.endYear;

    const totalRevenue = revenueResults.reduce((acc, product) => acc + product.totalRevenue, 0);

    const grossMargin = totalRevenue - totalProductCosts;

    const totalExpenses = expenseResults.reduce((acc, cat) => acc + (cat.totalExpense || 0), 0);

    const totalSalaries = finance.expenses.salaries.cost * (1 + finance.expenses.salaries.annualGrowthRate / 100);

    const addedValue = grossMargin - totalExpenses;

    const EBITDA = addedValue - totalSalaries;

    const EBITDA_MARGIN = EBITDA / totalRevenue * 100;

    const cashFlow = totalRevenue - totalExpenses;  
    const Principal = finance.Principal; 
    const Interest = finance.Interest;  
    const debtService = Principal - Interest;
    const debtCoverageRatio = cashFlow / debtService;

    const marketPotentialScore = 40 ; // estimate karo 
    let fundingRecommendation = '';
    if (marketPotentialScore > 80) {
      fundingRecommendation = 'Highly likely to secure funding';
    } else if (marketPotentialScore > 50) {
      fundingRecommendation = 'Moderately likely to secure funding';
    } else {
      fundingRecommendation = 'Unlikely to secure funding';
    }
      
     finance.financialResults = {
      totalRevenue,
      totalProductCosts,
      grossMargin,
      totalCharges: totalExpenses,
      addedValue,
      totalSalaries,
      EBITDA,
      profitability: {
        isProfitable: EBITDA > 0,
        EBITDAMargin: EBITDA_MARGIN,
        debtCoverageRatio,
      },
      scoring: {
        marketPotentialIndex: marketPotentialScore,
        recommendation: fundingRecommendation,
      },
    }

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
        totalRevenue,
        totalProductCosts,
        grossMargin,
        totalCharges: totalExpenses,
        addedValue,
        totalSalaries,
        EBITDA,
        profitability: {
          isProfitable: EBITDA > 0,
          EBITDAMargin: EBITDA_MARGIN,
          debtCoverageRatio,
        },
        scoring: {
          marketPotentialIndex: marketPotentialScore,
          recommendation: fundingRecommendation,
        },
      },
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch plan data" }, { status: 500 });
  }
};

export const POST = connectDb(getPlanData);
