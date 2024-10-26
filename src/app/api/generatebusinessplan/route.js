import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import BusinessPlan from "../../../../backend/models/BusinessPlan";
import User from "../../../../backend/models/user";
import jwt from "jsonwebtoken";

// Helper functions to calculate financial metrics (same as before)
const calculateAnnualRevenues = (unitPrice, quantitySold, salesGrowth) => {
  return unitPrice * quantitySold * (1 + salesGrowth);
};

const calculateAnnualExpenses = (
  fixedCosts,
  variableCost,
  quantity,
  costGrowth
) => {
  return fixedCosts + variableCost * quantity * (1 + costGrowth);
};

const calculateNetIncome = (revenues, expenses, taxRate) => {
  return revenues - expenses - (revenues - expenses) * taxRate;
};

const calculateCashFlow = (totalInflows, totalOutflows) => {
  return totalInflows - totalOutflows;
};

const calculateLoanAmortization = (loanAmount, interestRate, n) => {
  if (
    !loanAmount ||
    !interestRate ||
    !n ||
    loanAmount <= 0 ||
    interestRate <= 0 ||
    n <= 0
  ) {
    return 0; // Return 0 or a default value if inputs are invalid
  }
  return (
    (loanAmount * (interestRate * Math.pow(1 + interestRate, n))) /
    (Math.pow(1 + interestRate, n) - 1)
  );
};

const generateBusinessPlan = async (request) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: "Authorization token is required" },
        { status: 401 }
      );
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; 

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    const userPlan = user.currentPlan; 
    const allowedPlans = ['starter', 'unlimited'];

    const {
      companyName,
      industrySector,
      dateOfEstablishment,
      location,
      revenues,
      costs,
      investmentsAndFinancing,
      otherFinancialAssumptions,
    } = await request.json();

    if (
      !companyName ||
      !industrySector ||
      !dateOfEstablishment ||
      !location ||
      !revenues ||
      !costs ||
      !investmentsAndFinancing ||
      !otherFinancialAssumptions
    ) {
      return NextResponse.json(
        { message: "All inputs are required" },
        { status: 400 }
      );
    }

    const initialInvestments = Number(investmentsAndFinancing.initialInvestments);
    const loanDuration = Number(investmentsAndFinancing.loanDuration);
    let interestRate = 0; 
    if (Array.isArray(investmentsAndFinancing.interestRates) && investmentsAndFinancing.interestRates.length > 0) {
      interestRate = Number(investmentsAndFinancing.interestRates[0]) / 100;
    }

    if (isNaN(initialInvestments) || isNaN(loanDuration) || isNaN(interestRate)) {
      return NextResponse.json(
        { message: "Invalid financial inputs" },
        { status: 400 }
      );
    }

    const financialProjections = [];

    for (let year = 1; year <= 5; year++) {
      const unitPrice = Number(revenues.unitPrice);
      const expectedYearlySalesQuantity = Number(revenues.expectedYearlySalesQuantity);
      const estimatedSalesGrowth = Number(revenues.estimatedSalesGrowth);
      
      const annualRevenues = calculateAnnualRevenues(unitPrice, expectedYearlySalesQuantity, estimatedSalesGrowth * year);
      const yearlyFixedCosts = Number(costs.yearlyFixedCosts);
      const variableUnitCosts = Number(costs.variableUnitCosts);
      const costGrowth = Number(costs.costGrowth);
      
      const annualExpenses = calculateAnnualExpenses(yearlyFixedCosts, variableUnitCosts, expectedYearlySalesQuantity, costGrowth * year);
      const taxRate = Number(otherFinancialAssumptions.taxRate);
      const netIncome = calculateNetIncome(annualRevenues, annualExpenses, taxRate);
      const cashFlow = calculateCashFlow(annualRevenues, annualExpenses + initialInvestments);
      const loanAmortization = loanDuration ? calculateLoanAmortization(initialInvestments, interestRate, loanDuration * 12) : 0;

      financialProjections.push({
        year,
        annualRevenues,
        annualExpenses,
        netIncome,
        cashFlow,
        loanAmortization,
      });
    }

    if(user.businessPlans.length >= 3 &&  userPlan == 'starter') {
      return NextResponse.json(
        { message: "You have reached the limit of Starter Plan Generation . Please update your Plan" },
        { status: 403 }
      );
    }

    // Handle null plan or unrecognized plan - show only two years and first three fields
    let limitedData = null;
    if (!userPlan || !allowedPlans.includes(userPlan)) {
      limitedData = financialProjections.slice(0, 2).map(projection => ({
        year: projection.year,
        annualRevenues: projection.annualRevenues,
        annualExpenses: projection.annualExpenses,
        netIncome: projection.netIncome,
      }));
    }

    const liquidityRatio = 1; 
    const profitabilityRatio = financialProjections[4].netIncome / (financialProjections[4].annualRevenues || 1);
    const debtRatio = initialInvestments / (initialInvestments + financialProjections[4].netIncome || 1);

    const creditworthinessScore = 80;
    const riskAssessmentScore = 70;
    const growthPotentialScore = 90;
    const compositeRatingScore =
      0.4 * creditworthinessScore +
      0.3 * riskAssessmentScore +
      0.3 * growthPotentialScore;

    // Save the full business plan to the database regardless of user plan
    const businessPlan = new BusinessPlan({
      companyName,
      industrySector,
      dateOfEstablishment,
      location,
      revenues,
      costs,
      investmentsAndFinancing,
      otherFinancialAssumptions,
      financialProjections,
      financialRatios: {
        liquidityRatio,
        profitabilityRatio,
        debtRatio,
      },
      companyRating: {
        creditworthinessScore,
        riskAssessmentScore,
        growthPotentialScore,
        compositeRatingScore,
      },
      user: user._id
    });

    await businessPlan.save();

    if (limitedData) {
      return NextResponse.json(
        { 
          message: "Limited access. Showing data for 2 years with limited fields.",
          limitedData, // Return only limited data to the user
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        message: "Business plan generated successfully", 
        financialProjections 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating business plan:", error);
    return NextResponse.json(
      { message: "Failed to generate business plan" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(generateBusinessPlan);
