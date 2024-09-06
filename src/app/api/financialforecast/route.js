import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import FinancialForecast from "../../../../backend/models/FinancialForecast";

const financialForecastHandler = async (request) => {
  try {
    const { revenues, fixedExpenses, variableExpenses } = await request.json();
    
    const totalRevenue = revenues.reduce((acc, revenue) => acc + revenue.amount, 0);
    const totalFixedExpenses = fixedExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalVariableExpenses = variableExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalExpenses = totalFixedExpenses + totalVariableExpenses;
    const cashFlow = totalRevenue - totalExpenses;

    const forecast = new FinancialForecast({ revenues, fixedExpenses, variableExpenses });
    await forecast.save();

    return NextResponse.json(
      { 
        totalRevenue, 
        totalExpenses, 
        cashFlow 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating financial forecast:", error);
    return NextResponse.json(
      { message: "Error calculating financial forecast" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(financialForecastHandler);
