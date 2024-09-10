import React from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { updateNotificationPreferences } from '../../services/api';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PreferenceSection = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #4CAF50;
    border-color: #4CAF50;
    z-index: 0;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    color: #fff;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const UpdateButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: block;
  margin: 30px auto 0;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const defaultPreferences = {
  newCandidateApplications: ['email', 'sms', 'in-app'],
  subscriptionRenewals: ['email', 'sms', 'in-app'],
  profileChanges: ['email', 'sms', 'in-app'],
  verificationStatuses: ['email', 'sms', 'in-app'],
  jobApplicationUpdates: ['email', 'sms', 'in-app'],
  paymentConfirmations: ['email', 'sms', 'in-app'],
  loginAlerts: ['email', 'sms'],
  unusualActivity: ['email', 'sms'],
};

function NotificationSettings() {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultPreferences,
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateNotificationPreferences(data);
      if (response.success) {
        alert('Preferences updated successfully');
      } else {
        alert('Failed to update preferences: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('An error occurred while updating preferences');
    }
  };

  return (
    <Container>
      <Title>Notification Preferences</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultPreferences).map((type) => (
          <PreferenceSection key={type}>
            <SectionTitle>{type}</SectionTitle>
            <CheckboxGroup>
              {['email', 'sms', 'in-app'].map((method) => (
                <Controller
                  key={`${type}-${method}`}
                  name={type}
                  control={control}
                  render={({ field }) => (
                    <Label>
                      <Checkbox
                        type="checkbox"
                        checked={field.value.includes(method)}
                        onChange={(e) => {
                          const updatedValue = e.target.checked
                            ? [...field.value, method]
                            : field.value.filter((v) => v !== method);
                          field.onChange(updatedValue);
                        }}
                      />
                      {method}
                    </Label>
                  )}
                />
              ))}
            </CheckboxGroup>
          </PreferenceSection>
        ))}
        <UpdateButton type="submit">Update Preferences</UpdateButton>
      </form>
    </Container>
  );
}

export default NotificationSettings;