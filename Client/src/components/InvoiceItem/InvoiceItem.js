import React from 'react';
import { downloadInvoice } from ''

const InvoiceItem = ({ invoice }) => {
  const handleDownload = async () => {
    console.log(invoice)
    await downloadInvoice(invoice._id);
  };

  return (
    <div className="invoice-item">
      <div className="invoice-details">
        <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Plan:</strong> {invoice.planDetails}</p>
        <p><strong>Amount:</strong> ₹{invoice.totalAmount.toFixed(2)}</p>
        <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
      </div>
      <button onClick={handleDownload} className="download-btn">Download PDF</button>
    </div>
  );
};

export default InvoiceItem;