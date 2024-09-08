import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const colorChange = keyframes`
  0% {
    color: #2c3e50;
  }
  100% {
    color: #3498db;
  }
`;

export const Header=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 24px;
  background-color: transparent;
  margin-left:20px;
`;

export const WelcomeHeader = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #2c3e50;
  text-align: left;
  margin-left: 40px;
  margin-bottom: 32px;
  opacity: 0;
  animation: 
    ${fadeIn} 1s ease-out forwards, 
    ${colorChange} 1s ease-in-out 1s forwards; 
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); 
    color: #e74c3c; 
  }
`;



export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const IconWrapper = styled.div`
  background-color: ${props => props.color};
  border-radius: 50%;
  padding: 10px;
  margin-right: 12px;
`;

export const StyledIcon = styled.svg`
  width: 24px;
  height: 24px;
  color: white;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

export const Metric = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: #3498db;
  margin: 0;
`;

export const MetricDescription = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 8px 0 0;
`;
