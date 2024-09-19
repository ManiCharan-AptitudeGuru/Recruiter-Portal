import styled from "styled-components";

export const Copyright = styled.p`
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
`;

export const CopyrightWrapper = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  background-color: #f5f5f5;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.7rem;
  }
`;

export const CopyrightText = styled.p`
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    margin-bottom: 0.3rem;
  }
`;

export const Logo = styled.img`
  height: 40px;
`;