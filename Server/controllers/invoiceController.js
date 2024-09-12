const Invoice = require("../models/Invoice");
const invoiceService = require('../services/invoiceService');

exports.getAllInvoiceOfUser = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId).populate(
      "user"
    );
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    const pdfBuffer = await invoiceService.generateInvoicePDF(invoice);
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateInvoice = async (req, res) => {
  try {
    const { userId, planDetails, amount } = req.body;
    const invoice = await invoiceService.generateInvoice(
      userId,
      planDetails,
      amount
    );
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(400).json({ message: error.message });
  }
};
