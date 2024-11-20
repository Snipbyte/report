const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  page: {
    type: String, 
    required: true,
  },
  headings: [
    {
      en: { type: String, required: true }, 
      fr: { type: String, required: false }, 
    },
  ],
  descriptions: [
    {
      en: { type: String, required: true },
      fr: { type: String, required: false },
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  buttonTexts: [
    {
      en: { type: String, required: false }, 
      fr: { type: String, required: false }, 
    },
  ],
  contactInfo: {
    contactNumber: {
      en: { type: String, required: false },
      fr: { type: String, required: false }, 
    },
    emailAddress: {
      en: { type: String, required: false }, 
      fr: { type: String, required: false }, 
    },
  },
  order: {
    type: Number, 
  },
});

export default mongoose.models.Section || mongoose.model('Section', sectionSchema);