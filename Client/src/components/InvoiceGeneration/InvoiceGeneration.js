// components/InvoiceGeneration.js
import React from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { generateInvoice, downloadGstInvoice } from '../../services/api';
import { Title, InvoiceContainer, GenerateButton } from '../../styles/styled';

const InvoiceGeneration = ({ recruiterId, onInvoiceGenerated }) => {
  const handleGenerateInvoice = async () => {
    try {
      const response = await generateInvoice({ recruiterId, amount: 1000 }); // Example amount
      onInvoiceGenerated(response.data.invoice);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  const handleDownloadInvoice = async (invoiceId) => {
    try {
      await downloadGstInvoice(invoiceId);
      alert('Invoice downloaded successfully');
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

  return (
    <InvoiceContainer>
      <Title>
        <FaFileInvoiceDollar /> Invoice Generation
      </Title>
      <GenerateButton onClick={handleGenerateInvoice}>
        Generate Invoice
      </GenerateButton>
    </InvoiceContainer>
  );
};

export default InvoiceGeneration;