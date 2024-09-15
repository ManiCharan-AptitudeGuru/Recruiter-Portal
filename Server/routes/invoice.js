const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/invoices/:userId", invoiceController.getAllInvoiceOfUser);
router.get("/:invoiceId/download", invoiceController.downloadInvoice);
router.post("/generate", invoiceController.generateInvoice);

module.exports = router;
