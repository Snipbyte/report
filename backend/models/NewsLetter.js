import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const NewsletterModel = mongoose.models.newsletters || mongoose.model("newsletters", newsletterSchema);

export default NewsletterModel;
