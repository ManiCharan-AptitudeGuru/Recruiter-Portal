const express = require("express");
const router = express.Router();
const invoiceController = require("../models/Invoice");

router.get("/recruiterId",invoiceController.getA);
router.get("/:invoiceId/download",invoiceController);
router.post("/generate",invoiceController);

module.exports = router;
