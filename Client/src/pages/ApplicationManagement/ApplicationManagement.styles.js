import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align:center;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const GoBackButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;
