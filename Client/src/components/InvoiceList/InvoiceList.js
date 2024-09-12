import React from 'react';
import InvoiceItem from '../InvoiceItem/InvoiceItem';

const InvoiceList = ({ invoices }) => {
  return (
    <div className="invoice-list">
      <h2>Your Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices found. Your invoices will appear here once generated.</p>
      ) : (
        invoices.map(invoice => (
          <InvoiceItem key={invoice._id} invoice={invoice} />
        ))
      )}
    </div>
  );
};

export default InvoiceList;