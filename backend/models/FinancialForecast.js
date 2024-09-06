import mongoose from "mongoose";

const FinancialForecastSchema = new mongoose.Schema({
  revenues: [
    {
      source: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  fixedExpenses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  variableExpenses: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ]
});

export default mongoose.models.FinancialForecast || mongoose.model("FinancialForecast", FinancialForecastSchema);
