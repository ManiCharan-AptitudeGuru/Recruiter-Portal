import React, { useState } from 'react';
import styled from 'styled-components';
import NotificationSettings from '../../components/NotificationSettings/NotificationSettings';

const AppContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Roboto', sans-serif;
  background-color: transparent;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;


const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const NotificationItem = styled.li`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    padding: 12px 15px;
    font-size: 0.9rem;
  }
`;


function NotificationSettingsPage() {
  const [notifications, setNotifications] = useState([]);

  return (
    <AppContainer>
      <NotificationSettings />
      <NotificationList>
        {notifications.map((notif, index) => (
          <NotificationItem key={index}>{notif.message}</NotificationItem>
        ))}
      </NotificationList>
    </AppContainer>
  );
}

export default NotificationSettingsPage;