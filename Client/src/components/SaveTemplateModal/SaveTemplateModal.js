import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SaveTemplateModal = ({
  isOpen,
  onClose,
  onSave,
  initialName = "",
  errorMessage,
}) => {
  const [templateName, setTemplateName] = useState(initialName);

  useEffect(() => {
    setTemplateName(initialName);
  }, [initialName]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (templateName.trim()) {
      onSave(templateName);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Save Template</h3>
        <Input
          type="text"
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          maxLength={100}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SaveTemplateModal;
