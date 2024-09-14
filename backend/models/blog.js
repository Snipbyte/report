const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot be more than 100 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [20, 'Description must be at least 20 characters long'],
    maxlength: [5000, 'Description cannot be more than 5000 characters long']
  },
  tags: {
    type: [String],
    default: []
  },
  thumbnail:{
    type:String,
    required:true
  },
  author: {
    type:String,
    default:"Admin"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});


export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
