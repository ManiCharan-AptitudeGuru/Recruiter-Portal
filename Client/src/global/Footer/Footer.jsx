import React from "react";
import {
  CopyrightText,
  CopyrightWrapper,Logo
} from "./FooterStyle";
const Footer = () => {
  return (
    <div>
      <CopyrightWrapper>
        <CopyrightText>
          &copy; {new Date().getFullYear()} Aptitude Guru Hem. All rights
          reserved.
        </CopyrightText>
        <Logo src="/assets/agh-logo.png" alt="Logo" />
      </CopyrightWrapper>
    </div>
  );
};

export default Footer;
