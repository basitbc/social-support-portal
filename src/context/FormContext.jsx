import React, { createContext, useContext } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

// Initial form data structure with all required fields across 3 steps
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

// Create React context for form state management
const FormContext = createContext();

// Form provider component managing all form state and navigation logic
export const FormProvider = ({ children }) => {
  // React Router navigation hook
  const navigate = useNavigate();
  
  // Persistent state using custom localStorage hook
  const [formData, setFormData, removeFormData] = useLocalStorage(STORAGE_KEYS.FORM_DATA, initialFormData);
  const [currentStep, setCurrentStep, removeCurrentStep] = useLocalStorage(STORAGE_KEYS.CURRENT_STEP, 1);
  const [termsAccepted, setTermsAccepted, removeTermsAccepted] = useLocalStorage(STORAGE_KEYS.TERMS_ACCEPTED, false);
  const [submissionData, setSubmissionData, removeSubmissionData] = useLocalStorage(STORAGE_KEYS.SUBMISSION_DATA, null);
  
  // Computed state - form is submitted if submission data exists
  const isSubmitted = submissionData !== null;

  // Update multiple form fields simultaneously
  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  

  // Update a single form field
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

  // Navigate to a specific step (1-4)
  const goToStep = (step) => {
    if (step >= 1 && step <= 4) { // Include step 4 for review page
      setCurrentStep(step);
    }
  };

  // Handle form submission status
  const setIsSubmitted = (status) => {
    if (!status) {
      setSubmissionData(null); // Clear submission data when marking as not submitted
    }
  };

  // Clear form data but keep other state
  const clearFormData = () => {
    setFormData(initialFormData);
    removeTermsAccepted();
    removeFormData();
    setTermsAccepted(false);
  };

  // Check if user has completed required fields for a given step
  const hasRequiredDataForStep = (step) => {
    // Define required fields for each step
    const stepRequirements = {
      1: [], // Step 1 has no prerequisites
      2: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'],
      3: ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'],
      4: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying']
    };

    const required = stepRequirements[step] || [];
    // Check if all required fields are filled and not empty
    return required.every(field => formData[field] && formData[field].trim() !== '');
  };

  // Navigate to step with validation and access control
  const navigateToStep = (targetStep) => {
    // Redirect to home if terms not accepted
    if (!termsAccepted) {
      navigate('/');
      return;
    }

    // Calculate the highest step user can access based on completed data
    let highestAccessible = 1;
    for (let step = 2; step <= 3; step++) {
      if (hasRequiredDataForStep(step)) {
        highestAccessible = step;
      } else {
        break; // Stop at first incomplete step
      }
    }

    // Limit navigation to only accessible steps
    const allowedStep = Math.min(targetStep, highestAccessible);
    
    // Update current step state
    setCurrentStep(allowedStep);
    
    // Map steps to their corresponding routes
    const routes = {
      1: '/step-1',
      2: '/step-2', 
      3: '/step-3',
      4: '/review'
    };
    
    // Navigate to the appropriate route
    if (routes[allowedStep]) {
      navigate(routes[allowedStep]);
    }
  };

  // Context value object with all state and methods
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

// Custom hook to access form context with error handling
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};