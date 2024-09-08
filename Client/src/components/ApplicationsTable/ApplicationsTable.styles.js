import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: 40px;
  height: 30px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 16px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23718096" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>');
  background-repeat: no-repeat;
  background-position: 12px center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (min-width: 768px) {
    width: 300px;
  }
`;

export const BubbleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const BubbleFilter = styled.button`
  background-color: ${(props) => (props.active ? "#3b82f6" : "#ffffff")};
  color: ${(props) => (props.active ? "white" : "#4b5563")};
  border: 2px solid ${(props) => (props.active ? "#3b82f6" : "#d1d5db")};
  padding: 8px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 90px;

  &:hover {
    background-color: ${(props) => (props.active ? "#2563eb" : "#f3f4f6")};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableHead = styled.thead`
  background-color: #f3f4f6;
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
`;

export const ViewProfileButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ShortlistedIndicator = styled.span`
  background-color: #10b981;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  white-space: nowrap;
`;

export const StatusDropdown = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid #d1d5db;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  max-width: 160px;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 18px;
  color: #6b7280;
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-top: 24px;
`;