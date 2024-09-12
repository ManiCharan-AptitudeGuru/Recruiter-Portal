const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/recruiterId", invoiceController.getAllInvoiceOfUser);
router.get("/:invoiceId/download", invoiceController.downloadInvoice);
router.post("/generate", invoiceController.generateInvoice);

module.exports = router;
