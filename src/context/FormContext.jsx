import React, { createContext, useContext } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

// Initial form data
const initialFormData = {
  // Step 1 - Personal Information (9 fields)
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
  
  // Step 2 - Family & Financial Info (5 fields)
  maritalStatus: '',
  dependents: '',
  employmentStatus: '',
  monthlyIncome: '',
  housingStatus: '',
  
  // Step 3 - Situation Descriptions (3 textareas)
  currentFinancialSituation: '',
  employmentCircumstances: '',
  reasonForApplying: ''
};

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const navigate = useNavigate(); // Move useNavigate inside the component
  
  // Use the custom hook for each piece of state that needs persistence
  const [formData, setFormData, removeFormData] = useLocalStorage(STORAGE_KEYS.FORM_DATA, initialFormData);
  const [currentStep, setCurrentStep, removeCurrentStep] = useLocalStorage(STORAGE_KEYS.CURRENT_STEP, 1);
  const [termsAccepted, setTermsAccepted, removeTermsAccepted] = useLocalStorage(STORAGE_KEYS.TERMS_ACCEPTED, false);
  const [submissionData, setSubmissionData, removeSubmissionData] = useLocalStorage(STORAGE_KEYS.SUBMISSION_DATA, null);
  
  // Derived state - doesn't need localStorage since it's based on submissionData
  const isSubmitted = submissionData !== null;

  // Update multiple fields at once
  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Update single field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset entire form
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setTermsAccepted(false);
    setSubmissionData(null);
    removeFormData();
    removeCurrentStep();
    removeTermsAccepted();
    removeSubmissionData();
  };

  // Navigate to specific step
  const goToStep = (step) => {
    if (step >= 1 && step <= 4) { // Updated to include step 4 (Review)
      setCurrentStep(step);
    }
  };

  // Set submission status
  const setIsSubmitted = (status) => {
    if (!status) {
      setSubmissionData(null);
    }
  };

  const hasRequiredDataForStep = (step) => {
    const stepRequirements = {
      1: [], // Step 1 has no requirements
      2: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address'], // Need basic info
      3: ['maritalStatus', 'employmentStatus', 'monthlyIncome'] // Need family & financial
    };

    const required = stepRequirements[step] || [];
    return required.every(field => formData[field] && formData[field].trim() !== '');
  };

   // Navigate to specific step with validation
  const navigateToStep = (targetStep) => {
    // Find highest accessible step
    let highestAccessible = 1;
    for (let step = 2; step <= 3; step++) {
      if (hasRequiredDataForStep(step)) {
        highestAccessible = step;
      } else {
        break;
      }
    }

    // Only allow navigation to accessible steps
    const allowedStep = Math.min(targetStep, highestAccessible);
    
    // Update current step and navigate
    setCurrentStep(allowedStep);
    
    const routes = {
      1: '/step-1',
      2: '/step-2', 
      3: '/step-3',
      4: '/review'
    };
    
    if (routes[allowedStep]) {
      navigate(routes[allowedStep]);
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
    hasRequiredDataForStep
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