import styled from "styled-components";

export const FormContainer = styled.form`
  background-color: #000;
  padding-left: 25px;
  padding-right: 45px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #d4d2d2;
  font-weight: bold;
  margin-top: 0PX;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #4d4d4d;
  background-color: #333;
  color: #fff;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #4d4d4d;
  background-color: #333;
  color: #fff;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #4d4d4d;
  background-color: #333;
  color: #fff;
`;

export const FormButton = styled.button`
  background-color: #00e676;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin: 10px;
  &:hover {
    background-color: #00c853;
  }
`;
