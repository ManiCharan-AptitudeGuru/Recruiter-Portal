import React, { useState } from "react";
import {
  Overlay,
  Content,
  Title,
  TemplateOptions,
  NewTemplateButton,
  TemplateButton,
  DeleteButton,
  CancelButton,
  EditButton,
  DuplicateButton,
} from "./TemplateSelector.styles";
import SaveTemplateModal from "../SaveTemplateModal/SaveTemplateModal";

const TemplateSelector = ({
  onSelect,
  onCancel,
  savedTemplates,
  onDeleteTemplate,
  onEditTemplate,
  onDuplicateTemplate,
}) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveTemplate = async (name) => {
    try {
      if (isDuplicating) {
        await onDuplicateTemplate({ ...templateToEdit, name });
      } else if (templateToEdit) {
        await onEditTemplate({ ...templateToEdit, name });
      }
      setShowSaveModal(false);
      setTemplateToEdit(null);
      setIsDuplicating(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Overlay>
      <Content>
        <Title>Select Template</Title>
        <TemplateOptions>
          <NewTemplateButton onClick={() => onSelect(null)}>
            Create with New Template
          </NewTemplateButton>
          {savedTemplates.map((template) => (
            <div key={template._id}>
              <TemplateButton onClick={() => onSelect(template)}>
                Create with "{template.name}" Template
              </TemplateButton>
              <EditButton
                onClick={() => {
                  setTemplateToEdit(template);
                  setIsDuplicating(false);
                  setShowSaveModal(true);
                }}
              >
                Edit
              </EditButton>
              <DuplicateButton
                onClick={() => {
                  setTemplateToEdit(template);
                  setIsDuplicating(true);
                  setShowSaveModal(true);
                }}
              >
                Duplicate
              </DuplicateButton>
              <DeleteButton onClick={() => onDeleteTemplate(template._id)}>
                Delete
              </DeleteButton>
            </div>
          ))}
        </TemplateOptions>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </Content>
      {showSaveModal && (
        <SaveTemplateModal
          isOpen={showSaveModal}
          onClose={() => {
            setShowSaveModal(false);
            setTemplateToEdit(null);
            setIsDuplicating(false);
            setErrorMessage("");
          }}
          onSave={handleSaveTemplate}
          initialName={
            isDuplicating
              ? `${templateToEdit.name} (copy)`
              : templateToEdit.name
          }
          errorMessage={errorMessage}
        />
      )}
    </Overlay>
  );
};

export default TemplateSelector;
