const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idea: {
    typeOfActivity: { type: String, required: true },
    projectName: { type: String, required: true },
    address: { type: String, required: true },
    launchDate: { type: Date, required: true },
  },
  presentation: {
    type: Map,
    of: String, 
  },
  visitingCard: {
    type: Map,
    of: new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      title: { type: String, required: true },
      contact: { type: String, required: true },
      email: { type: String, required: true },
      selectedCountry: {
        code: { type: String, required: true },
        flag: { type: String, required: true },
        name: { type: String, required: true },
      },
    }),
  },
  carrier: {
    type: Map,
    of: new mongoose.Schema({
      businessLeader: { type: String},
      industryExperience: { type: String, required: true },
      familySituation: { type: String},
      editorContent: { type: String, required: true },
    }),
  },
  services: {
    type: Map,
    of: new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
    }),
  },
  market: {
    type: Map,
    of: new mongoose.Schema({
      marketDescription: { type: String, required: true },
      responses: {
        row1: { type: String, required: true },
        row2: { type: String, required: true },
        row3: { type: String, required: true },
        row4: { type: String, required: true },
        row5: { type: String, required: true },
      },
    }),
  },
  competitors: {
    type: Map,
    of: [
      new mongoose.Schema({
        name: { type: String, required: true },
        priceStatus: { type: String, required: true },
      }),
    ],
  },
  customers: {
    type: Map,
    of: new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      type: { type: String, enum: ['Private - BtoC','Proffesional - BtoB'], required: true },
    }),
  },
  salesPitches: {
    type: Map,
    of: String, 
  },
  customerAcquisitionActions: {
    type: Map,
    of: [
      new mongoose.Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
      }),
    ],
  },
  financialData: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Finance', 
  },
  createdAt: { type: Date, default: Date.now },
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

export default Plan;

