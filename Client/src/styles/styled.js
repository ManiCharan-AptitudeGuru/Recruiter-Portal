// styles/styled.js
import styled from 'styled-components';

// Shared Styles
export const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
  }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  
  svg {
    margin-right: 15px;
    font-size: 32px;
  }
`;

// AdminReminder Styles
export const ReminderContainer = styled(Container)`
  background-color: #fef9e7;
  border: 2px solid #f39c12;
  color: #d35400;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Message = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  line-height: 1.6;
`;

// GSTRegistration Styles
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

export const SubmitButton = styled(Button)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

// // InvoiceGeneration Styles
// export const InvoiceContainer = styled(Container)`
//   border: 2px solid #bdc3c7;
//   border-radius: 12px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

export const GenerateButton = styled(Button)`
  background-color: #2ecc71;
  color: white;
  
  &:hover {
    background-color: #27ae60;
  }
`;

// NotificationSystem Styles
export const NotificationContainer = styled(Container)`
  text-align: left;
`;

export const NotificationItem = styled.div`
  background-color: ${(props) => (props.read ? '#ecf0f1' : '#e8f6fd')};
  border: 2px solid ${(props) => (props.read ? '#bdc3c7' : '#3498db')};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const NotificationMessage = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  color: #34495e;
  line-height: 1.6;
`;

export const NotificationDate = styled.small`
  color: #7f8c8d;
  font-size: 14px;
  display: block;
  margin-top: 5px;
`;

export const NotificationBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  position: absolute;
  top: -10px;
  right: -10px;
`;

export const NotificationWrapper = styled.div`
  position: relative;
  display: inline-block;
`;



export const InvoiceContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const InvoiceHeader = styled.div`
  border-bottom: 2px solid #3498db;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const InvoiceTitle = styled.h2`
  color: #3498db;
  font-size: 28px;
  margin: 0;
  text-align: center;
`;

export const InvoiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const InvoiceSection = styled.div`
  flex: 1;
`;

export const InvoiceLabel = styled.p`
  color: #7f8c8d;
  font-size: 14px;
  margin: 5px 0;
`;

export const InvoiceValue = styled.p`
  color: #2c3e50;
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
`;

export const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const InvoiceTableHeader = styled.th`
  background-color: #f9f9f9;
  border-bottom: 2px solid #e0e0e0;
  color: #2c3e50;
  font-size: 16px;
  padding: 12px;
  text-align: left;
`;

export const InvoiceTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const InvoiceTableCell = styled.td`
  border-bottom: 1px solid #e0e0e0;
  color: #34495e;
  font-size: 16px;
  padding: 12px;
`;

export const InvoiceTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #3498db;
  padding-top: 20px;
  margin-top: 20px;
`;

export const InvoiceTotalLabel = styled.p`
  color: #2c3e50;
  font-size: 18px;
  font-weight: bold;
`;

export const InvoiceTotalValue = styled.p`
  color: #3498db;
  font-size: 24px;
  font-weight: bold;
`;

export const InvoiceFooter = styled.div`
  color: #7f8c8d;
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
`;