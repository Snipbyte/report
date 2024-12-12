import mongoose from "mongoose";

const pricingCardSchema = new mongoose.Schema({
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  points: {
    type: [String],
    required: [true, "At least one point is required"],
  },
});

export default mongoose.models.PricingCard ||
  mongoose.model("PricingCard", pricingCardSchema);
