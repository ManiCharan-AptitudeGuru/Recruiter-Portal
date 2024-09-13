import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavContainer = styled.nav`
  background-color: #2c3e50;
  color: white;
  width: ${({ isOpen }) => (isOpen ? '270px' : '70px')};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0;
  transition: all 0.3s ease-in-out;
  overflow-x: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 30px;
`;

export const Logo = styled.h1`
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease-in-out;
  margin: 0;
  flex-grow: 1;
  text-align: ${({ isOpen }) => (isOpen ? 'left' : 'center')};
`;

export const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin-bottom: 5px;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #34495e;
    transform: translateX(5px);
  }
`;

export const IconWrapper = styled.span`
  margin-right: ${({ isOpen }) => (isOpen ? '15px' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;

export const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  margin-left: ${({ isOpen }) => (isOpen ? '10px' : '0')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
`;

export const LinkText = styled.span`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
`;
