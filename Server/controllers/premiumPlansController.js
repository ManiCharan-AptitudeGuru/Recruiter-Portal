const PremiumPlan = require("../models/PremiumPlan");
const Recruiter = require('../models/Recruiter');

exports.updatePlanRouting = async (req, res) => {
  const { planId,userId } = req.body;
  try {
    const plan = await PremiumPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const user = await Recruiter.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is upgrading to a higher plan
    const currentPlan = await PremiumPlan.findOne({ name: user.plan });
    if (currentPlan && plan.price > currentPlan.price) {
      // Implement upgrade logic here (e.g., payment processing)
      // For now, we'll just update the plan
      user.plan = plan.name;
      await user.save();
    } else if (!currentPlan || plan.price <= currentPlan.price) {
      // If downgrading or selecting the same plan, just update
      user.plan = plan.name;
      await user.save();
    }

    const remainingPlans = await PremiumPlan.find({ _id: { $ne: planId } });

    res.json({ remainingPlans, user });
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

    // Fetch all plans
    const allPlans = await PremiumPlan.find();

    // Find the user's current plan
    const userPlan = allPlans.find(plan => plan.name === user.plan);

    if (userPlan) {
      // If the user has a plan, return all plans except the current one
      const otherPlans = allPlans.filter(plan => plan.name !== user.plan);
      res.json({
        currentPlan: userPlan,
        availablePlans: otherPlans
      });
    } else {
      // If the user doesn't have a plan (e.g., on free plan), return all plans
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