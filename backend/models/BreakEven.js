import mongoose from 'mongoose';

const BreakEvenSchema = new mongoose.Schema({
  fixedCosts: {
    type: Number,
    required: true
  },
  variableCostPerUnit: {
    type: Number,
    required: true
  },
  sellingPricePerUnit: {
    type: Number,
    required: true
  },
});

export default mongoose.models.BreakEven || mongoose.model('BreakEven', BreakEvenSchema);

