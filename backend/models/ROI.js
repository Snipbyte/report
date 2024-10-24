import mongoose from 'mongoose';

const ROISchema = new mongoose.Schema({
  initialCost: {
    type: Number,
    required: true
  },
  netGains: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.ROI || mongoose.model('ROI', ROISchema);
