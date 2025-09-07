import { useCallback } from 'react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';

export const useValidation = () => {
  const { formData } = useFormContext();
  const { setFieldError, clearFieldError, clearErrors } = useUIContext();

  // Validate individual field
  const validateField = useCallback((fieldName, value) => {
    const error = getFieldError(fieldName, value);
    
    if (error) {
      setFieldError(fieldName, error);
      return false;
    } else {
      clearFieldError(fieldName);
      return true;
    }
  }, [setFieldError, clearFieldError]);

  // Validate entire step - returns Promise for React Hook Form compatibility
  const validateStep = useCallback(async (stepNumber, data = null) => {
    const stepFields = getStepFields(stepNumber);
    const formDataToValidate = data || formData;
    let isValid = true;
    const errors = [];

    stepFields.forEach(fieldName => {
      const value = formDataToValidate[fieldName];
      const error = getFieldError(fieldName, value);
      
      if (error) {
        errors.push({ field: fieldName, message: error });
        setFieldError(fieldName, error);
        isValid = false;
      } else {
        clearFieldError(fieldName);
      }
    });

    return { isValid, errors };
  }, [formData, setFieldError, clearFieldError]);

  // Validate all form data
  const validateForm = useCallback(() => {
    let isValid = true;
    const allErrors = [];

    // Validate each step
    for (let step = 1; step <= 3; step++) {
      const stepValidation = validateStepSync(step);
      if (!stepValidation.isValid) {
        isValid = false;
        allErrors.push(...stepValidation.errors);
      }
    }

    return { isValid, errors: allErrors };
  }, [formData]);

  // Synchronous step validation for internal use
  const validateStepSync = useCallback((stepNumber) => {
    const stepFields = getStepFields(stepNumber);
    let isValid = true;
    const errors = [];

    stepFields.forEach(fieldName => {
      const value = formData[fieldName];
      const error = getFieldError(fieldName, value);
      
      if (error) {
        errors.push({ field: fieldName, message: error });
        isValid = false;
      }
    });

    return { isValid, errors };
  }, [formData]);

  // Get fields for each step
  const getStepFields = (stepNumber) => {
    const stepFields = {
      1: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'],
      2: ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'],
      3: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying']
    };
    
    return stepFields[stepNumber] || [];
  };

  // Get error message for a specific field
  const getFieldError = (fieldName, value) => {
    // Required field validation
    if (isRequired(fieldName) && (!value || !value.toString().trim())) {
      return `${getFieldLabel(fieldName)} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value || !value.toString().trim()) {
      return null;
    }

    // Field-specific validation
    switch (fieldName) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return 'Please enter a valid phone number';
        }
        break;

      case 'dateOfBirth':
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          return 'You must be at least 18 years old';
        }
        if (age > 120) {
          return 'Please enter a valid birth date';
        }
        break;

      case 'monthlyIncome':
        const income = parseFloat(value.toString().replace(/[,$]/g, ''));
        if (isNaN(income) || income < 0) {
          return 'Please enter a valid income amount';
        }
        break;

      case 'nationalId':
        if (value.length < 5) {
          return 'Please enter a valid national ID';
        }
        break;

      case 'dependents':
        const deps = parseInt(value);
        if (isNaN(deps) || deps < 0) {
          return 'Please enter a valid number of dependents';
        }
        if (deps > 20) {
          return 'Please enter a realistic number of dependents';
        }
        break;

      case 'currentFinancialSituation':
      case 'employmentCircumstances':
      case 'reasonForApplying':
        if (value.length < 20) {
          return 'Please provide at least 20 characters';
        }
        if (value.length > 1000) {
          return 'Description cannot exceed 1000 characters';
        }
        break;

      case 'name':
        if (value.length < 2) {
          return 'Name must be at least 2 characters';
        }
        if (value.length > 50) {
          return 'Name cannot exceed 50 characters';
        }
        break;

      case 'address':
        if (value.length < 10) {
          return 'Please provide a complete address';
        }
        if (value.length > 200) {
          return 'Address cannot exceed 200 characters';
        }
        break;

      case 'city':
      case 'state':
        if (value.length > 50) {
          return `${getFieldLabel(fieldName)} cannot exceed 50 characters`;
        }
        break;
    }

    return null;
  };

  // Check if field is required
  const isRequired = (fieldName) => {
    const requiredFields = [
      'name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 
      'state', 'country', 'phone', 'email', 'maritalStatus', 'dependents',
      'employmentStatus', 'monthlyIncome', 'housingStatus', 'currentFinancialSituation',
      'reasonForApplying'
    ];
    
    return requiredFields.includes(fieldName);
  };

  // Get human-readable field label
  const getFieldLabel = (fieldName) => {
    const labels = {
      name: 'Full name',
      nationalId: 'National ID',
      dateOfBirth: 'Date of birth',
      gender: 'Gender',
      address: 'Address',
      city: 'City',
      state: 'State/Province',
      country: 'Country',
      phone: 'Phone number',
      email: 'Email address',
      maritalStatus: 'Marital status',
      dependents: 'Number of dependents',
      employmentStatus: 'Employment status',
      monthlyIncome: 'Monthly income',
      housingStatus: 'Housing status',
      currentFinancialSituation: 'Current financial situation',
      employmentCircumstances: 'Employment circumstances',
      reasonForApplying: 'Reason for applying'
    };
    
    return labels[fieldName] || fieldName;
  };

  // Get React Hook Form validation rules for a field
  const getValidationRules = (fieldName) => {
    const rules = {};

    if (isRequired(fieldName)) {
      rules.required = `${getFieldLabel(fieldName)} is required`;
    }

    switch (fieldName) {
      case 'email':
        rules.pattern = {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address'
        };
        break;

      case 'phone':
        rules.pattern = {
          value: /^[\+]?[1-9][\d]{0,15}$/,
          message: 'Please enter a valid phone number'
        };
        break;

      case 'dateOfBirth':
        rules.validate = (value) => {
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) return 'You must be at least 18 years old';
          if (age > 120) return 'Please enter a valid birth date';
          return true;
        };
        break;

      case 'monthlyIncome':
        rules.min = { value: 0, message: 'Income cannot be negative' };
        rules.valueAsNumber = true;
        break;

      case 'dependents':
        rules.min = { value: 0, message: 'Number cannot be negative' };
        rules.max = { value: 20, message: 'Please enter a realistic number' };
        rules.valueAsNumber = true;
        break;

      case 'name':
        rules.minLength = { value: 2, message: 'Name must be at least 2 characters' };
        rules.maxLength = { value: 50, message: 'Name cannot exceed 50 characters' };
        break;

      case 'address':
        rules.minLength = { value: 10, message: 'Please provide a complete address' };
        rules.maxLength = { value: 200, message: 'Address cannot exceed 200 characters' };
        break;

      case 'nationalId':
        rules.minLength = { value: 5, message: 'Please enter a valid national ID' };
        break;

      case 'currentFinancialSituation':
      case 'employmentCircumstances':
      case 'reasonForApplying':
        rules.minLength = { value: 20, message: 'Please provide at least 20 characters' };
        rules.maxLength = { value: 1000, message: 'Description cannot exceed 1000 characters' };
        break;

      case 'city':
      case 'state':
        rules.maxLength = { value: 50, message: `${getFieldLabel(fieldName)} cannot exceed 50 characters` };
        break;
    }

    return rules;
  };

  return {
    validateField,
    validateStep,
    validateForm,
    getFieldError: (fieldName, value) => getFieldError(fieldName, value || formData[fieldName]),
    getValidationRules,
    isRequired,
    getFieldLabel,
    clearAllErrors: clearErrors
  };
};

export default useValidation;