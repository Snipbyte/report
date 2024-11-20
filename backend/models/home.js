// /backend/models/homePage.js
import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  headings: {
    type: [String], 
    required: true,
  },
  paragraphs: {
    type: [String], 
    required: false,
  },
  descriptions: {
    type: [String], 
    required: false,
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

const HomePageSchema = new mongoose.Schema({
  sections: {
    type: [SectionSchema],
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.HomePage || mongoose.model("HomePage", HomePageSchema);
