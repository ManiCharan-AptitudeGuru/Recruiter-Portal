const PremiumPlan = require("../models/PremiumPlan");
const Recruiter = require('../models/Recruiter');

exports.updatePlanRouting = async (req, res) => {
  const { planId, userId } = req.body;
  try {
    const plan = await PremiumPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const user = await Recruiter.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.plan = plan.name;
    await user.save();
    const allPlans = await PremiumPlan.find();
    const currentPlan = allPlans.find(p => p.name === user.plan);
    const availablePlans = allPlans.filter(p => p.name !== user.plan);
    res.json({ currentPlan, availablePlans, user });
  } catch (error) {
    console.error("Failed to update plan:", error);
    res.status(500).send("Server error");
  }
};

exports.getPremiumPlansRouting = async (req, res) => {
  try {
    const user = await Recruiter.findById(req.query.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const allPlans = await PremiumPlan.find();
    const userPlan = allPlans.find(plan => plan.name === user.plan);

    if (userPlan) {
      const otherPlans = allPlans.filter(plan => plan.name !== user.plan);
      res.json({
        currentPlan: userPlan,
        availablePlans: otherPlans
      });
    } else {
      res.json({
        currentPlan: { name: "Free", price: 0, features: [] },
        availablePlans: allPlans
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};