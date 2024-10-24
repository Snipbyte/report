// models/FinancingSimulation.js
import mongoose from 'mongoose';

const financingSimulationSchema = new mongoose.Schema({
  currentRevenue: {
    type: Number,
    required: true,
  },
  netProfit: {
    type: Number,
    required: true,
  },
  totalAssets: {
    type: Number,
    required: true,
  },
  totalDebts: {
    type: Number,
    required: true,
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  useOfFunds: {
    type: String,
    required: true,
  },
  debtRatio: {
    type: Number,
    required: true,
  },
  netProfitability: {
    type: Number,
    required: true,
  },
  workingCapital: {
    type: Number,
    required: true,
  },
  financingEligibilityScore: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.FinancingSimulation || mongoose.model('FinancingSimulation', financingSimulationSchema);
