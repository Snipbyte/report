// /backend/models/contactUs.js
import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: false,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ContactUs || mongoose.model("ContactUs", ContactUsSchema);
