import mongoose from 'mongoose';

const AboutPageSchema = new mongoose.Schema({
  heading1: {
    type: String,
    required: true,
  },
  heading2: {
    type: String,
    required: true,
  },
  heading3: {
    type: String,
    required: true,
  },
  paragraphs: {
    type: [String], // An array to store multiple paragraphs
    required: true,
  },
  file: {
    type: String, // File path (image, document, etc.)
    required: false,
  }
}, { timestamps: true });

export default mongoose.models.AboutPage || mongoose.model('AboutPage', AboutPageSchema);
