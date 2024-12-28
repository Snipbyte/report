const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  idea: {
    typeOfActivity: { type: String, required: true },
    projectName: { type: String, required: true },
    address: { type: String, required: true },
    launchDate: { type: Date, required: true },
  },
  presentation: {
    details: { type: String, required: true },
  },
  visitingCard: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  career: {
    questions: {
      confidentToRunBusiness: { type: Boolean, required: true },
      industryExperience: { type: Boolean, required: true },
      timeAndEnergy: { type: Boolean, required: true },
    },
    otherDetails: { type: String },
  },
  offer: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  walk: [
    {
      question: { type: String, required: true },
      options: {
        neutral: { type: Boolean, required: true },
        negative: { type: Boolean, required: true },
        positive: { type: Boolean, required: true },
      },
    },
  ],
  competitor: [
    {
      competitorName: { type: String, required: true },
      pricingComparison: {
        cheaper: { type: Boolean, required: true },
        moreExpensive: { type: Boolean, required: true },
        aligned: { type: Boolean, required: true },
      },
    },
  ],
  customer: [
    {
      customerType: { type: String, enum: ['Professional B2B', 'Private B2C'], required: true },
      description: { type: String, required: true },
    },
  ],
  commercial: {
    salesPitch: { type: String, required: true },
  },
  customerAcquisition: [
    {
      actionName: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});


const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

export default Plan;