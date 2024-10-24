import mongoose from "mongoose";

const GrossMarginSchema = new mongoose.Schema({
  product: { type: String, required: true },
  sellingPrice: { type: Number, required: true },
  productionCost: { type: Number, required: true },
  grossMargin: { type: Number, required: true },
  grossMarginPercentage: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GrossMargin || mongoose.model("GrossMargin", GrossMarginSchema);
