const express = require("express");
const router = express.Router();
const gstInvoiceController = require("../controllers/gstInvoiceController");

router.post("/generate", gstInvoiceController.generateInvoice);
router.get("/download/:invoiceId", gstInvoiceController.downloadInvoice);

module.exports = router;