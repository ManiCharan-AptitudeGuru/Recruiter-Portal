import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow wrapping of children */
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px; /* Prevent sections from becoming too narrow */
`;

const FooterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #3498db;
`;

const FooterLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  margin-bottom: 5px;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #bdc3c7;
  margin-top: 20px;
  text-align: center; /* Center the text in the footer */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/support">Support</FooterLink>
        </FooterSection>
      </FooterContent>
      <Copyright>© 2024 RecruiterPortal. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
