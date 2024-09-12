const express = require('express');
const router = express.Router();
const premiumPlanController=require('../controllers/premiumPlansController')

router.post("/",premiumPlanController.updatePlanRouting);
router.get("/",premiumPlanController.getPremiumPlansRouting)

module.exports = router;
