// pages/api/calculateInvestment.js
import { NextResponse } from 'next/server';
import connectDb from '../../../../backend/middleware/db';
import Investment from '../../../../backend/models/investment';

const calculateInvestment = async (request) => {
  try {
    const { monthlyIncome, monthlyExpenses, emergencySavings, regularContributions } = await request.json();

    // Validate inputs
    if (
      monthlyIncome === undefined ||
      monthlyExpenses === undefined ||
      emergencySavings === undefined ||
      regularContributions === undefined
    ) {
      return NextResponse.json(
        { message: 'All inputs (monthly income, expenses, emergency savings, and regular contributions) are required' },
        { status: 400 }
      );
    }

    // Calculate investment values
    const monthlySavingsCapacity = monthlyIncome - monthlyExpenses;
    const amountAvailableToInvest = Math.max(0, monthlySavingsCapacity - emergencySavings);
    const totalAnnualInvestment = (amountAvailableToInvest + regularContributions) * 12;

    // Provide recommendations based on investment calculations
    let recommendation = '';

    if (amountAvailableToInvest <= 0) {
      recommendation = 'You do not have any funds available to invest after covering your emergency savings. Consider reviewing your expenses or increasing your income to free up some funds for investment.';
    } else if (totalAnnualInvestment < 5000) {
      recommendation = 'The total annual investment is relatively low. You might want to explore additional investment opportunities or strategies to increase the amount you invest annually.';
    } else if (totalAnnualInvestment >= 5000 && totalAnnualInvestment <= 20000) {
      recommendation = 'Your total annual investment is moderate. Keep tracking your expenses and savings to ensure that you can maintain or increase this investment amount over time.';
    } else {
      recommendation = 'Your total annual investment is high. Ensure that you are diversifying your investments and considering long-term financial goals to maximize returns.';
    }

    // Save investment data to the database
    const investment = new Investment({
      monthlyIncome,
      monthlyExpenses,
      emergencySavings,
      regularContributions,
      amountAvailableToInvest,
      totalAnnualInvestment,
    });

    await investment.save();

    // Return the result with recommendations
    return NextResponse.json(
      {
        amountAvailableToInvest: amountAvailableToInvest.toFixed(2),
        totalAnnualInvestment: totalAnnualInvestment.toFixed(2),
        recommendation
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error calculating investment:', error);
    return NextResponse.json(
      { message: 'Calculation failed' },
      { status: 500 }
    );
  }
};

export const POST = connectDb(calculateInvestment);
