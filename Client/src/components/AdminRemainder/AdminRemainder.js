// components/AdminReminder.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Title, ReminderContainer, Message } from '../styles/styled';

const AdminReminder = ({ dueDate, amount }) => {
  return (
    <ReminderContainer>
      <Title>
        <FaExclamationTriangle /> Admin GST Payment Reminder
      </Title>
      <Message>
        GST payment of ${amount} is due on {dueDate}.
      </Message>
      <Message>Please ensure timely payment to the government.</Message>
    </ReminderContainer>
  );
};

export default AdminReminder;