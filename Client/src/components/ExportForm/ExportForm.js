// File: src/components/ExportForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const FormInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const FormSelect = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const ExportForm = ({ onExportCreated }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newExport = {
      id: Math.random().toString(36).substring(2, 9),
      reportName: data.reportName,
      format: data.format,
      recipients: data.recipients.split(','),
    };
    onExportCreated(newExport);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormInput {...register('reportName')} placeholder="Report Name" />
      <FormSelect {...register('format')}>
        <option value="PDF">PDF</option>
        <option value="Excel">Excel</option>
        <option value="CSV">CSV</option>
      </FormSelect>
      <FormInput {...register('recipients')} placeholder="Recipients (comma-separated emails)" />
      <SubmitButton type="submit">Export Report</SubmitButton>
    </FormContainer>
  );
};

export default ExportForm;