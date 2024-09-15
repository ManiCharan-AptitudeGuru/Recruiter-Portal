// import React from 'react';
import React from 'react';
import styled from 'styled-components';
import { Bell, User } from '@styled-icons/feather';
import { BsPersonCircle } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import PremiumButton from '../PremiumButton/Button';

const HeaderContainer = styled.header`
  background-color: #34495e;
  color: #ecf0f1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  left: 270px;
  right: 0;
  z-index: 1000;
  height: 60px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;  
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;
//#ecf0f1
const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const UpgradeButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <RightSection>
        <PremiumButton />
        <IconButton>
          <StyledIcon as={FaBell} />
        </IconButton>
        <IconButton>
          <StyledIcon as={BsPersonCircle} />
        </IconButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

//<UpgradeButton>Upgrade to Premium</UpgradeButton>