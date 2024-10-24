import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  monthlyIncome: {
    type: Number,
    required: true,
  },
  monthlyExpenses: {
    type: Number,
    required: true,
  },
  emergencySavings: {
    type: Number,
    required: true,
  },
  regularContributions: {
    type: Number,
    required: true,
  },
  amountAvailableToInvest: {
    type: Number,
    required: true,
  },
  totalAnnualInvestment: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Investment || mongoose.model('Investment', investmentSchema);
