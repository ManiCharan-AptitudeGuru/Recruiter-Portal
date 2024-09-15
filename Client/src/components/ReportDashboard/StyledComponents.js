import styled from "styled-components";
import { FaEdit } from "react-icons/fa";

export const DashboardContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  color: #fff;
  text-align: center;
  width: 100%;
`;

export const WidgetContainer = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.2em;
  text-align: center;
  cursor: grabbing;
  user-select: none;
  min-height: min-content;
  &.react-grid-item.react-grid-placeholder {
    background: none;
    border: 2px dotted #aaa;
  }
`;

export const GridTitle = styled.h2`
  font-size: 1.8em;
  color: #fff;
  margin-top: 0px;
  margin-bottom: 10px;
  text-align: center;
`;

export const RecruitmentStats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatLabel = styled.div`
  font-size: 1em;
  margin-top: 10px;
  color: #ccc;
`;

export const StatValue = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 5px;
`;

export const ProgressBarContainer = styled.div`
  width: 60px;
  height: 60px;
`;

export const FormButton = styled.button`
  background-color: #00e676;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #00c853;
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
  cursor: pointer;
  max-height: 100%; // Adjust this value as needed

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ExportButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const ExportButton = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  flex: 1 1 30%;
  min-width: 120px;
  text-align: center;

  &:hover {
    background-color: #135ab2;
  }

  @media (max-width: 768px) {
    flex: 1 1 40%;
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  animation: fadeInOut 6s ease-in-out;

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
`;

export const EditableHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const HeadingInput = styled.input`
  background-color: #2a2a2a;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 1 em;
  width: 80%;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

export const EditIcon = styled(FaEdit)`
  color: #1a73e8;
  cursor: pointer;
  font-size: 1.2em;
  transition: color 0.3s ease;
  margin-left: 10px;
  margin-top: 15px;
  &:hover {
    color: #135ab2;
  }
`;

export const SaveButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #135ab2;
  }
`;
