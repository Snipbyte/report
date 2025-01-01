const mongoose = require("mongoose");


const FinanceModelSchema = new mongoose.Schema({
    revenue: {
      productLines: [
        {
          name: String,
          unitPrice: Number,
          volume: Number,
          annualGrowthRate: Number,
        },
      ],
      period: {
        startYear: Number,
        endYear: Number,
      },
    },
    
    expenses: {
      generalExpenses: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      lease: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      productCosts: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      financialCharges: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      salaries: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      variableCosts: {
        percentageOfRevenue: Number,
      },
      insurance: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      marketing: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      maintenance: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      utilities: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      professionalServices: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      training: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      itSoftwareSubscriptions: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
      travel: {
        cost: Number,
        annualGrowthRate: Number,
        frequency: String,
      },
    },
    Principal : Number,
    Interest : Number,
    financialResults: {
      totalRevenue: Number,
      totalProductCosts: Number,
      grossMargin: Number,
      totalCharges: Number,
      addedValue: Number,
      totalSalaries: Number,
      EBITDA: Number,
      profitability: {
        isProfitable: Boolean,
        EBITDAMargin: Number,
        debtCoverageRatio: Number,
      },
      scoring: {
        marketPotentialIndex: Number,
        recommendation: String,
      },
    },
  });
  

  const Finance = mongoose.models.Finance || mongoose.model("Finance", FinanceModelSchema);

  export default Finance;
  