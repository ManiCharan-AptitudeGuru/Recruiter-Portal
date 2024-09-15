import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InvoiceList from "../../components/InvoiceList/InvoiceList";
import { getInvoices } from "../../services/api";
import Cookies from "js-cookie";
import "../../App.css";

const ModalBackdrop = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 400px;
  margin: 100px auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 95%;
`;

const CloseButton = styled.button`
  background-color: #ff5e5e;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const GstButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

function Invoice() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm();

  // GST validation logic
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  // Custom submit handler
  const onSubmit = (data) => {
    if (!gstRegex.test(data.gstNumber)) {
      // Set error if GST is invalid
      setError("gstNumber", {
        type: "manual",
        message: "Invalid GST number",
      });
    } else {
      console.log("GST Number:", data.gstNumber);
      clearErrors("gstNumber");
      setShowModal(false); // Close modal only on successful validation
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Invoice System</h1>
        <GstButton onClick={() => setShowModal(true)}>
          Enter GST Number
        </GstButton>
        <InvoiceList invoices={invoices} />
      </div>

      <ModalBackdrop show={showModal}>
        <ModalContent>
          <h2>Enter GST Number</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>GST Number:</label>
            <Input
              type="text"
              {...register("gstNumber", {
                required: "GST Number is required",
              })}
            />
            {errors.gstNumber && (
              <p style={{ color: "red" }}>{errors.gstNumber.message}</p>
            )}

            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
          <CloseButton onClick={() => setShowModal(false)}>Close</CloseButton>
        </ModalContent>
      </ModalBackdrop>
    </div>
  );
}

export default Invoice;
