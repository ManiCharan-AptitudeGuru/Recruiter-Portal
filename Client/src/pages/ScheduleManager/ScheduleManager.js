// File: src/pages/ScheduleManager.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm';

const ScheduleManagerContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const ScheduleTitle = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const ScheduleItem = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const dummySchedules = [
  {
    id: 1,
    reportName: 'Weekly Recruitment Pipeline Summary',
    schedule: 'Every Monday at 8 AM',
    recipients: ['senior.recruiter@company.com', 'hr.director@company.com'],
    format: 'PDF',
  },
  {
    id: 2,
    reportName: 'Diversity Hiring Overview',
    schedule: 'Monthly on the 1st',
    recipients: ['recruiter@company.com', 'external.consultant@consultancy.com'],
    format: 'Excel',
  },
];

const ScheduleManager = () => {
  const [schedules, setSchedules] = useState(dummySchedules);

  return (
    <ScheduleManagerContainer>
      <ScheduleTitle>Manage Schedules</ScheduleTitle>
      <ScheduleForm onScheduleCreated={(newSchedule) => setSchedules([...schedules, newSchedule])} />
      {schedules.map((schedule) => (
        <ScheduleItem key={schedule.id}>
          {schedule.reportName} - {schedule.schedule} - {schedule.format}
        </ScheduleItem>
      ))}
    </ScheduleManagerContainer>
  );
};

export default ScheduleManager;