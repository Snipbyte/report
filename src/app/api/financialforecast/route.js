import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db";
import FinancialForecast from "../../../../backend/models/FinancialForecast";

const financialForecastHandler = async (request) => {
  try {
    const { revenues, fixedExpenses, variableExpenses } = await request.json();

    // Convert all inputs to numbers
    const parsedRevenues = Number(revenues);
    const parsedFixedExpenses = Number(fixedExpenses);
    const parsedVariableExpenses = Number(variableExpenses);

    // Ensure revenues, fixedExpenses, and variableExpenses are valid numbers
    if (
      isNaN(parsedRevenues) ||
      isNaN(parsedFixedExpenses) ||
      isNaN(parsedVariableExpenses)
    ) {
      return NextResponse.json(
        {
          message:
            "All inputs (revenues, fixed expenses, and variable expenses) must be valid numbers",
        },
        { status: 400 }
      );
    }

    // Calculate totals
    const totalRevenue = parsedRevenues;
    const totalFixedExpenses = parsedFixedExpenses;
    const totalVariableExpenses = parsedVariableExpenses;
    const totalExpenses = totalFixedExpenses + totalVariableExpenses;
    const cashFlow = totalRevenue - totalExpenses;

    // Provide recommendations based on financial forecast
    let recommendation = "";

    if (cashFlow < 0) {
      recommendation +=
        "Your forecast shows a negative cash flow. Consider increasing revenue streams or reducing expenses to achieve a positive cash flow. ";
    } else if (cashFlow > totalRevenue * 0.2) {
      // Example threshold for a healthy cash flow
      recommendation +=
        "Your forecast shows a strong positive cash flow. This is a good position to consider reinvesting in the business or expanding operations. ";
    } else {
      recommendation +=
        "Your forecast shows a positive cash flow. Continue to monitor and manage your revenues and expenses to maintain a healthy financial position. ";
    }

    // Save the data to the database
    const forecast = new FinancialForecast({
      revenues: parsedRevenues,
      fixedExpenses: parsedFixedExpenses,
      variableExpenses: parsedVariableExpenses,
    });
    await forecast.save();

    // Return the result with recommendations
    return NextResponse.json(
      {
        totalRevenue,
        totalExpenses,
        cashFlow,
        recommendation:
          recommendation ||
          "Your financial forecast looks balanced. Continue to monitor your financial metrics regularly.",
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
