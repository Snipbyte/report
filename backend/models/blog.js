import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  thumbnailImage: { type: String, required: false },
  publishDate: { type: Date, default: Date.now },
  slug: { type: String, unique: true }
});

const BlogModel = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default BlogModel;
