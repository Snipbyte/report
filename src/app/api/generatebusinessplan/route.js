import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import BusinessPlan from "../../../../backend/models/BusinessPlan";

// Helper functions to calculate financial metrics
const calculateAnnualRevenues = (unitPrice, quantitySold, salesGrowth) => {
  return unitPrice * quantitySold * (1 + salesGrowth);
};

const calculateAnnualExpenses = (fixedCosts, variableCost, quantity, costGrowth) => {
  return fixedCosts + variableCost * quantity * (1 + costGrowth);
};

const calculateNetIncome = (revenues, expenses, taxRate) => {
  return revenues - expenses - (revenues - expenses) * taxRate;
};

const calculateCashFlow = (totalInflows, totalOutflows) => {
  return totalInflows - totalOutflows;
};

const calculateLoanAmortization = (loanAmount, interestRate, n) => {
  if (!loanAmount || !interestRate || !n || loanAmount <= 0 || interestRate <= 0 || n <= 0) {
    return 0; // Return 0 or a default value if inputs are invalid
  }
  return (
    (loanAmount * (interestRate * Math.pow(1 + interestRate, n))) /
    (Math.pow(1 + interestRate, n) - 1)
  );
};

// Handler function for the API route
const generateBusinessPlan = async (request) => {
  try {
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

    // Validate inputs
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

    // Ensure the required fields are numbers and convert them if necessary
    const initialInvestments = typeof investmentsAndFinancing.initialInvestments === 'string'
      ? Number(investmentsAndFinancing.initialInvestments.trim())
      : Number(investmentsAndFinancing.initialInvestments);

    const loanDuration = typeof investmentsAndFinancing.loanDuration === 'string'
      ? Number(investmentsAndFinancing.loanDuration.trim())
      : Number(investmentsAndFinancing.loanDuration);

    // Check if interestRates is defined and is an array
    let interestRate = 0; // Default to 0 or a suitable value
    if (Array.isArray(investmentsAndFinancing.interestRates) && investmentsAndFinancing.interestRates.length > 0) {
      interestRate = typeof investmentsAndFinancing.interestRates[0] === 'string'
        ? Number(investmentsAndFinancing.interestRates[0].trim()) / 100 // Convert percentage to decimal
        : Number(investmentsAndFinancing.interestRates[0]) / 100; // Convert percentage to decimal
    } else {
      console.log('No interest rates provided or interestRates is not an array.');
    }

    // Log the values
    console.log('Initial Investments:', initialInvestments);
    console.log('Loan Duration:', loanDuration);
    console.log('Interest Rate:', interestRate);

    if (isNaN(initialInvestments) || isNaN(loanDuration) || isNaN(interestRate)) {
      if (isNaN(initialInvestments)) console.log("Invalid initialInvestments");
      if (isNaN(loanDuration)) console.log("Invalid loanDuration");
      if (isNaN(interestRate)) console.log("Invalid interestRate");

      return NextResponse.json(
        { message: "Invalid financial inputs" },
        { status: 400 }
      );
    }

    // Calculate financial metrics with type checks
    const unitPrice = typeof revenues.unitPrice === 'string' ? Number(revenues.unitPrice.trim()) : Number(revenues.unitPrice);
    const expectedMonthlySalesQuantity = typeof revenues.expectedMonthlySalesQuantity === 'string' ? Number(revenues.expectedMonthlySalesQuantity.trim()) : Number(revenues.expectedMonthlySalesQuantity);
    const estimatedSalesGrowth = typeof revenues.estimatedSalesGrowth === 'string' ? Number(revenues.estimatedSalesGrowth.trim()) : Number(revenues.estimatedSalesGrowth);
    
    const annualRevenues = calculateAnnualRevenues(unitPrice, expectedMonthlySalesQuantity, estimatedSalesGrowth);

    const monthlyFixedCosts = typeof costs.monthlyFixedCosts === 'string' ? Number(costs.monthlyFixedCosts.trim()) : Number(costs.monthlyFixedCosts);
    const variableUnitCosts = typeof costs.variableUnitCosts === 'string' ? Number(costs.variableUnitCosts.trim()) : Number(costs.variableUnitCosts);
    const costGrowth = typeof costs.costGrowth === 'string' ? Number(costs.costGrowth.trim()) : Number(costs.costGrowth);
    
    const annualExpenses = calculateAnnualExpenses(monthlyFixedCosts, variableUnitCosts, expectedMonthlySalesQuantity, costGrowth);

    const taxRate = typeof otherFinancialAssumptions.taxRate === 'string' ? Number(otherFinancialAssumptions.taxRate.trim()) : Number(otherFinancialAssumptions.taxRate);
    const netIncome = calculateNetIncome(annualRevenues, annualExpenses, taxRate);

    const cashFlow = calculateCashFlow(annualRevenues, annualExpenses + initialInvestments);

    const loanAmortization = loanDuration ? calculateLoanAmortization(initialInvestments, interestRate, loanDuration * 12) : 0;

    // Calculate financial ratios
    const liquidityRatio = 1; // Example value
    const profitabilityRatio = netIncome / (annualRevenues || 1); // Prevent division by zero
    const debtRatio = initialInvestments / (initialInvestments + netIncome || 1); // Prevent division by zero

    // Calculate company rating
    const creditworthinessScore = 80; // Example score
    const riskAssessmentScore = 70; // Example score
    const growthPotentialScore = 90; // Example score
    const compositeRatingScore =
      0.4 * creditworthinessScore +
      0.3 * riskAssessmentScore +
      0.3 * growthPotentialScore;

    // Create a new business plan document
    const businessPlan = new BusinessPlan({
      companyName,
      industrySector,
      dateOfEstablishment,
      location,
      revenues,
      costs,
      investmentsAndFinancing,
      otherFinancialAssumptions,
      financialProjections: {
        annualRevenues,
        annualExpenses,
        netIncome,
        cashFlow,
        loanAmortization,
      },
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
    });

    // Save to the database
    await businessPlan.save();

    // Return success response
    return NextResponse.json(
      { message: "Business plan generated successfully", businessPlan },
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
