import React, {useState} from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Dashboard, Work, People, Assignment, Settings, Logout } from '@styled-icons/material';
import styled, { css } from 'styled-components';
import Cookies from 'js-cookie';

const NavContainer = styled.nav`
  background-color: #2c3e50;
  color: white;
  width: 270px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  overflow-x: hidden;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const TopSection = styled.div`
  padding: 0 20px;
  margin-bottom: 40px;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
  text-align: left;
  color: #3498db;
  font-weight: bold;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 10px;
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#3498db' : 'white'};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: all 0.3s ease-in-out;
  border-left: 4px solid ${props => props.active ? '#3498db' : 'transparent'};

  &:hover {
    background-color: #34495e;
  }

  ${props => props.active && css`
    background-color: #34495e;
  `}
`;

const IconWrapper = styled.span`
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;

const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;

  ${NavLink}:hover & {
    transform: scale(1.1);
  }
`;

const LinkText = styled.span`
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const BottomSection = styled.div`
  padding: 20px;
`;

const BottomButton = styled(Link)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  margin-bottom: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #34495e;
    color: #3498db;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative;
  z-index: 1001;
`;

const PopupTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const PopupText = styled.p`
  color: #34495e;
  margin-bottom: 30px;
`;

const PopupButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  ${props => props.primary && css`
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
    }
  `}

  ${props => props.secondary && css`
    background-color: #ecf0f1;
    color: #2c3e50;

    &:hover {
      background-color: #bdc3c7;
    }
  `}
`;


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);


  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/welcome');
  };

  const isActive = (path) => location.pathname === path;

  return (
  <>
    <NavContainer>
      <div>
        <TopSection>
          <Logo>RecruiterPortal</Logo>
        </TopSection>
        <NavList>
          <NavItem>
            <NavLink to="/" active={isActive('/')}>
              <IconWrapper><StyledIcon as={Dashboard} /></IconWrapper>
              <LinkText>Dashboard</LinkText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/job-postings" active={isActive('/job-postings')}>
              <IconWrapper><StyledIcon as={Work} /></IconWrapper>
              <LinkText>Job Postings</LinkText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/candidates" active={isActive('/candidates')}>
              <IconWrapper><StyledIcon as={People} /></IconWrapper>
              <LinkText>Candidates</LinkText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/subscription" active={isActive('/subscription')}>
              <IconWrapper><StyledIcon as={Assignment} /></IconWrapper>
              <LinkText>Subscription</LinkText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/invoices" active={isActive('/invoices')}>
              <IconWrapper><StyledIcon as={Assignment} /></IconWrapper>
              <LinkText>Invoices</LinkText>
            </NavLink>
          </NavItem>
        </NavList>
      </div>
      <BottomSection>
          <BottomButton to="/settings">
            <IconWrapper><StyledIcon as={Settings} /></IconWrapper>
            <LinkText>Settings</LinkText>
          </BottomButton>
          <BottomButton as="button" onClick={() => setShowLogoutPopup(true)}>
            <IconWrapper><StyledIcon as={Logout} /></IconWrapper>
            <LinkText>Logout</LinkText>
          </BottomButton>
      </BottomSection>

      {showLogoutPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Confirm Logout</PopupTitle>
            <PopupText>
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </PopupText>
            <PopupButton secondary onClick={() => setShowLogoutPopup(false)}>
              Cancel
            </PopupButton>
            <PopupButton primary onClick={handleLogout}>
              Logout
            </PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </NavContainer>
  </>
  );
}

export default Navbar;
