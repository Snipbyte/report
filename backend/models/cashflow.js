import mongoose from 'mongoose';

const CashFlowSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  cashInflows: {
    type: Number,
    required: true
  },
  cashOutflows: {
    type: Number,
    required: true
  },
  initialCashBalance: {
    type: Number,
    required: true
  }
});

export default mongoose.models.CashFlow || mongoose.model('CashFlow', CashFlowSchema);
