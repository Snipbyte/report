import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import BusinessPlan from '../../../../backend/models/BusinessPlan';

// Helper functions to calculate financial metrics
const calculateAnnualRevenues = (unitPrice, quantitySold, salesGrowth) => {
  return unitPrice * quantitySold * (1 + salesGrowth);
};

const calculateAnnualExpenses = (fixedCosts, variableCost, quantity, costGrowth) => {
  return fixedCosts + (variableCost * quantity * (1 + costGrowth));
};

const calculateNetIncome = (revenues, expenses, taxRate) => {
  return revenues - expenses - ((revenues - expenses) * taxRate);
};

const calculateCashFlow = (totalInflows, totalOutflows) => {
  return totalInflows - totalOutflows;
};

const calculateLoanAmortization = (loanAmount, interestRate, n) => {
  return loanAmount * (interestRate * Math.pow(1 + interestRate, n)) / (Math.pow(1 + interestRate, n) - 1);
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
      otherFinancialAssumptions
    } = await request.json();

    // Validate inputs
    if (
      !companyName || !industrySector || !dateOfEstablishment || !location ||
      !revenues || !costs || !investmentsAndFinancing || !otherFinancialAssumptions
    ) {
      return NextResponse.json(
        { message: 'All inputs are required' },
        { status: 400 }
      );
    }

    // Calculate financial metrics
    const annualRevenues = calculateAnnualRevenues(
      revenues.unitPrice[0], 
      revenues.expectedMonthlySalesQuantity[0], 
      revenues.estimatedSalesGrowth
    );
    const annualExpenses = calculateAnnualExpenses(
      costs.monthlyFixedCosts, 
      costs.variableUnitCosts[0], 
      revenues.expectedMonthlySalesQuantity[0], 
      costs.costGrowth
    );
    const netIncome = calculateNetIncome(
      annualRevenues, 
      annualExpenses, 
      otherFinancialAssumptions.taxRate
    );
    const cashFlow = calculateCashFlow(
      annualRevenues, 
      annualExpenses + investmentsAndFinancing.initialInvestments
    );
    const loanAmortization = investmentsAndFinancing.loanDuration ? 
      calculateLoanAmortization(
        investmentsAndFinancing.initialInvestments,
        investmentsAndFinancing.interestRates[0] / 100,
        investmentsAndFinancing.loanDuration * 12
      ) : 0;

    // Calculate financial ratios
    const liquidityRatio = 1; // Example value
    const profitabilityRatio = netIncome / annualRevenues;
    const debtRatio = investmentsAndFinancing.initialInvestments / (investmentsAndFinancing.initialInvestments + netIncome);

    // Calculate company rating
    const creditworthinessScore = 80; // Example score
    const riskAssessmentScore = 70; // Example score
    const growthPotentialScore = 90; // Example score
    const compositeRatingScore = 0.4 * creditworthinessScore + 0.3 * riskAssessmentScore + 0.3 * growthPotentialScore;

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
        loanAmortization
      },
      financialRatios: {
        liquidityRatio,
        profitabilityRatio,
        debtRatio
      },
      companyRating: {
        creditworthinessScore,
        riskAssessmentScore,
        growthPotentialScore,
        compositeRatingScore
      }
    });

    // Save to the database
    await businessPlan.save();

    // Return success response
    return NextResponse.json(
      { message: 'Business plan generated successfully', businessPlan },
      { status: 200 }
    );
  } catch (error) {
     console.error('Error generating business plan:', error);
    return NextResponse.json(
      { message: 'Failed to generate business plan' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(generateBusinessPlan);
