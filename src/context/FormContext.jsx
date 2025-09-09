import React, { createContext, useContext } from 'react';
import { STEP_ROUTES, stepRequirements, STORAGE_KEYS } from '../config/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
  // Personal Information
  name: '',
  nationalId: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
  
  // Family & Financial Info
  maritalStatus: '',
  dependents: '',
  employmentStatus: '',
  monthlyIncome: '',
  housingStatus: '',
  
  // Situation Descriptions 
  currentFinancialSituation: '',
  employmentCircumstances: '',
  reasonForApplying: ''
};

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData, removeFormData] = useLocalStorage(STORAGE_KEYS.FORM_DATA, initialFormData);
  const [currentStep, setCurrentStep, removeCurrentStep] = useLocalStorage(STORAGE_KEYS.CURRENT_STEP, 1);
  const [termsAccepted, setTermsAccepted, removeTermsAccepted] = useLocalStorage(STORAGE_KEYS.TERMS_ACCEPTED, false);
  const [submissionData, setSubmissionData, removeSubmissionData] = useLocalStorage(STORAGE_KEYS.SUBMISSION_DATA, null);
  
  const isSubmitted = submissionData !== null;

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset all form data and state to initial values
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setTermsAccepted(false);
    setSubmissionData(null);
    
    // Clear all localStorage entries
    removeFormData();
    removeCurrentStep();
    removeTermsAccepted();
    removeSubmissionData();
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 4) { 
      setCurrentStep(step);
    }
  };

  const setIsSubmitted = (status) => {
    if (!status) {
      setSubmissionData(null);
    }
  };

  const clearFormData = () => {
    setFormData(initialFormData);
    removeTermsAccepted();
    removeFormData();
    setTermsAccepted(false);
  };

const hasRequiredDataForStep = (step, data = formData) => {
  const required = stepRequirements[step] || [];
  return required.every(
    field => data && data[field] && String(data[field]).trim() !== ''
  );
};

  const navigateToStep = (targetStep) => {
    if (!termsAccepted) {
      navigate('/');
      return;
    }

    let highestAccessible = 1;
    for (let step = 2; step <= 3; step++) {
      if (hasRequiredDataForStep(step,formData)) {
        highestAccessible = step;
      } else {
        break; 
      }
    }

    const allowedStep = Math.min(targetStep, highestAccessible);
    
    setCurrentStep(allowedStep);
    
  if (STEP_ROUTES[allowedStep]) {
  navigate(STEP_ROUTES[allowedStep]);
}
  };

  const value = {
    formData,
    currentStep,
    termsAccepted,
    isSubmitted,
    submissionData,
    setCurrentStep,
    setTermsAccepted,
    setIsSubmitted,
    setSubmissionData,
    updateFormData,
    updateField,
    resetForm,
    goToStep,
    navigateToStep, 
    hasRequiredDataForStep,
    clearFormData
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};