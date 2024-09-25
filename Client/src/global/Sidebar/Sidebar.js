import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Dashboard, Work, People, Assignment, Settings, Logout } from '@styled-icons/material';
import { FaFileInvoiceDollar } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import styled, { css } from 'styled-components';
import Cookies from 'js-cookie';

const NavContainer = styled.nav`
  background-color: #34495e;
  color: #ecf0f1;
  width: 270px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  overflow-x: hidden;
`;

const TopSection = styled.div`
  padding: 20px;
  background-color: #34495e;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
  text-align: left;
  color: #3498db;
  font-weight: bold;
  letter-spacing: 1px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#3498db' : '#ecf0f1'};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: all 0.3s ease-in-out;
  border-left: 4px solid ${props => props.active ? '#3498db' : 'transparent'};
  margin-bottom: 5px;

  &:hover {
    background-color: #2c3e50;
    color: #3498db;
  }

  ${props => props.active && css`
    background-color: #2c3e50;
  `}
`;

const SubNavList = styled.ul`
  list-style-type: none;
  padding-left: 40px;
`;

const IconWrapper = styled.span`
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const LinkText = styled.span`
  white-space: nowrap;
  font-size: 14px;
`;

const BottomSection = styled.div`
  padding: 20px;
  background-color: #2c3e50;
  margin-top: auto;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 290px;
  right: 30px;
  border-radius:40px;
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const NotificationText = styled.span`
  margin-right: 20px;
`;

const NotificationButton = styled.button`
  background-color: white;
  color: #3498db;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ecf0f1;
  }
`;

const navItems = [
  { path: '/', icon: Dashboard, text: 'Dashboard' },
  { path: '/job-postings', icon: Work, text: 'Job Postings' },
  { path: '/candidates', icon: People, text: 'Candidates' },
  { path: '/subscription', icon: Assignment, text: 'Subscription' },
  { path: '/billing', icon: FaFileInvoiceDollar, text: 'Billing' },
  { path: '/reports', icon: SiSimpleanalytics, text: 'Reports', subItems: [
      { path: '/reports/dashboard', text: 'Dashboard' },
      {path:'/reports/custom-report', text:"Custom Reports"},
      { path: '/reports/schedule', text: 'Schedule Reports' },
      { path: '/reports/exports', text: 'Exports' },
    ]},
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/welcome');
  };

  const isActive = (path) => location.pathname === path;

  const toggleExpand = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  return (
    <>
      <NavContainer>
        <TopSection>
          <Logo>Recruiter Portal</Logo>
        </TopSection>
        <NavList>
          {navItems.map(item => (
            <div key={item.path}>
              <NavLink 
                to={item.subItems ? '#' : item.path} 
                active={isActive(item.path)} 
                onClick={() => item.subItems && toggleExpand(item.path)}>
                <IconWrapper><StyledIcon as={item.icon} /></IconWrapper>
                <LinkText>{item.text}</LinkText>
              </NavLink>
              {item.subItems && expandedItem === item.path && (
                <SubNavList>
                  {item.subItems.map(subItem => (
                    <NavLink key={subItem.path} to={subItem.path} active={isActive(subItem.path)}>
                      <LinkText>{subItem.text}</LinkText>
                    </NavLink>
                  ))}
                </SubNavList>
              )}
            </div>
          ))}
        </NavList>
        <BottomSection>
          <NavLink to="/settings" active={isActive('/settings')}>
            <IconWrapper><StyledIcon as={Settings} /></IconWrapper>
            <LinkText>Settings</LinkText>
          </NavLink>
          <NavLink to="#" onClick={(e) => {
            e.preventDefault();
            setShowLogoutNotification(true);
          }}>
            <IconWrapper><StyledIcon as={Logout} /></IconWrapper>
            <LinkText>Logout</LinkText>
          </NavLink>
        </BottomSection>
      </NavContainer>

      {showLogoutNotification && (
        <NotificationContainer>
          <NotificationText>Are you sure you want to log out?</NotificationText>
          <div>
            <NotificationButton onClick={() => setShowLogoutNotification(false)}>
              Cancel
            </NotificationButton>
            <NotificationButton onClick={handleLogout}>
              Logout
            </NotificationButton>
          </div>
        </NotificationContainer>
      )}
    </>
  );
}

export default Sidebar;