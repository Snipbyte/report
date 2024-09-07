import mongoose from "mongoose";

const BusinessValuationSchema = new mongoose.Schema({
  netProfit: { type: Number, required: true },
  growthRate: { type: Number, required: true }, // as a percentage
  discountRate: { type: Number, required: true }, // as a percentage
  valuation: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BusinessValuation || mongoose.model("BusinessValuation", BusinessValuationSchema);
