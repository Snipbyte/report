import mongoose from 'mongoose';

const businessPlanSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industrySector: { type: String, required: true },
  dateOfEstablishment: { type: Date, required: true },
  location: { type: String, required: true },
  
  revenues: {
    products: [{ type: String }],
    unitPrice: [{ type: Number }],
    expectedYearlySalesQuantity: [{ type: Number }],
    estimatedSalesGrowth: { type: Number }
  },

  costs: {
    initialCapitalExpenditures: { type: Number },
    yearlyFixedCosts: { type: Number },
    variableUnitCosts: [{ type: Number }],
    costGrowth: { type: Number }
  },

  investmentsAndFinancing: {
    initialInvestments: { type: Number },
    sourcesOfFinancing: [{ type: String }],
    interestRates: [{ type: Number }],
    loanDuration: { type: Number }
  },

  otherFinancialAssumptions: {
    taxRate: { type: Number },
    expectedProfitability: { type: Number }
  },

  financialProjections: {
    annualRevenues: [{ type: Number }],
    annualExpenses: [{ type: Number }],
    netIncome: [{ type: Number }],
    cashFlow: [{ type: Number }],
    loanAmortization: [{ type: Number }]
  },

  financialRatios: {
    liquidityRatio: { type: Number, default: 0 },
    profitabilityRatio: { type: Number, default: 0 },
    debtRatio: { type: Number, default: 0 }
  },

  companyRating: {
    creditworthinessScore: { type: Number },
    riskAssessmentScore: { type: Number },
    growthPotentialScore: { type: Number },
    compositeRatingScore: { type: Number }
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
});

export default mongoose.models.BusinessPlan || mongoose.model('BusinessPlan', businessPlanSchema);
