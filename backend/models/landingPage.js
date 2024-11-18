import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: false, 
  },
  description: {
    type: [String], 
    required: true, 
  },
  file: {
    type: String, 
    required: false, 
  },
  buttonText: {
    type: String, 
    required: false, 
  },
});

const LandingPageSchema = new mongoose.Schema({
  sections: {
    type: [SectionSchema],
    required: true, 
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LandingPage || mongoose.model('LandingPage', LandingPageSchema);
