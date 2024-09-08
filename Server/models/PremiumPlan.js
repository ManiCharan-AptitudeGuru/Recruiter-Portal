// models/PremiumPlan.js
const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  text: { type: String, required: true },
  included: { type: Boolean, required: true },
});

const premiumPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: { type: [featureSchema], required: true },
});

const PremiumPlan = mongoose.model('PremiumPlan', premiumPlanSchema);
module.exports = PremiumPlan;
