// components/NotificationSystem.js
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { getNotifications } from '../../services/api'; 
import { Container, Title, NotificationItem, NotificationMessage, NotificationDate } from '../../styles/styled';

const NotificationSystem = ({ recruiterId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(recruiterId);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    // Set up polling for new notifications
    const interval = setInterval(fetchNotifications, 60000); // Poll every minute

    return () => clearInterval(interval);
  }, [recruiterId]);

  return (
    <Container>
      <Title>
        <FaBell /> Notifications
      </Title>
      {notifications.map((notification) => (
        <NotificationItem key={notification._id} read={notification.read}>
          <NotificationMessage>{notification.message}</NotificationMessage>
          <NotificationDate>
            {new Date(notification.date).toLocaleString()}
          </NotificationDate>
        </NotificationItem>
      ))}
    </Container>
  );
};

export default NotificationSystem;