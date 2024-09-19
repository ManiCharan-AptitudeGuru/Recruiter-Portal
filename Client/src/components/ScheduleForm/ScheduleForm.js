// File: src/components/ScheduleForm.js
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ScheduleForm = ({ onScheduleCreated }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newSchedule = {
      id: Math.random().toString(36).substring(2, 9),
      reportName: data.reportName,
      schedule: data.schedule,
      recipients: data.recipients.split(','),
      format: data.format,
    };
    onScheduleCreated(newSchedule);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormInput {...register('reportName')} placeholder="Report Name" />
      <FormInput {...register('schedule')} placeholder="Schedule (e.g., 'Every Monday at 8 AM')" />
      <FormInput {...register('recipients')} placeholder="Recipients (comma-separated emails)" />
      <FormSelect {...register('format')}>
        <option value="PDF">PDF</option>
        <option value="Excel">Excel</option>
        <option value="CSV">CSV</option>
      </FormSelect>
      <SubmitButton type="submit">Create Schedule</SubmitButton>
    </FormContainer>
  );
};

export default ScheduleForm;