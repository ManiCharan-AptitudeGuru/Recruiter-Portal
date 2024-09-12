import React, { useState, useEffect } from 'react';
import InvoiceList from '../../components/InvoiceList/InvoiceList';
import { getInvoices } from '../../services/api';
import Cookies from "js-cookie";
import '../../App.css';

function Invoice() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  const userId = Cookies.get("id");

  useEffect(() => {
     fetchInvoices();
  }, [user]);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoices(userId);
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Invoice System</h1>
          <InvoiceList invoices={invoices} />
      </div>
    </div>
  );
}

export default Invoice;