const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stripeSubscriptionId: { type: String, required: true }, 
    status: { type: String, enum: ['started', 'unlimited',null], required: true },
    currentPeriodEnd: { type: Date },
    currentPeriodStart: { type: Date },
  });
  
  module.exports = mongoose.model('Subscription', subscriptionSchema);
  