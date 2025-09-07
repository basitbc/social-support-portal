// Wizard steps configuration with validation rules
export const STEPS_CONFIG = {
  1: {
    id: 'personal-info',
    title: 'Personal Information',
    titleKey: 'steps.personalInfo.title',
    description: 'Please provide your basic personal details',
    descriptionKey: 'steps.personalInfo.description',
    route: '/step-1',
    hasAI: false,
    fields: [
      'name',
      'nationalId', 
      'dateOfBirth',
      'gender',
      'address',
      'city',
      'state',
      'country',
      'phone',
      'email'
    ],
    validationRules: {
      name: {
        required: 'Name is required',
        minLength: { value: 2, message: 'Name must be at least 2 characters' },
        maxLength: { value: 50, message: 'Name cannot exceed 50 characters' }
      },
      nationalId: {
        required: 'National ID is required',
        pattern: {
          value: /^[0-9]{10,15}$/,
          message: 'National ID must be 10-15 digits'
        }
      },
      dateOfBirth: {
        required: 'Date of birth is required',
        validate: (value) => {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          return age >= 18 || 'You must be at least 18 years old';
        }
      },
      gender: {
        required: 'Gender is required'
      },
      address: {
        required: 'Address is required',
        minLength: { value: 10, message: 'Address must be at least 10 characters' }
      },
      city: {
        required: 'City is required'
      },
      state: {
        required: 'State is required'
      },
      country: {
        required: 'Country is required'
      },
      phone: {
        required: 'Phone number is required',
        pattern: {
          value: /^[\+]?[0-9\-\(\)\s]{10,15}$/,
          message: 'Please enter a valid phone number'
        }
      },
      email: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Please enter a valid email address'
        }
      }
    }
  },

  2: {
    id: 'family-financial',
    title: 'Family & Financial Information',
    titleKey: 'steps.familyFinancial.title',
    description: 'Tell us about your family and financial situation',
    descriptionKey: 'steps.familyFinancial.description',
    route: '/step-2',
    hasAI: false,
    fields: [
      'maritalStatus',
      'dependents',
      'employmentStatus',
      'monthlyIncome',
      'housingStatus'
    ],
    validationRules: {
      maritalStatus: {
        required: 'Marital status is required'
      },
      dependents: {
        required: 'Number of dependents is required',
        min: { value: 0, message: 'Number cannot be negative' },
        max: { value: 20, message: 'Please enter a realistic number' }
      },
      employmentStatus: {
        required: 'Employment status is required'
      },
      monthlyIncome: {
        required: 'Monthly income is required',
        min: { value: 0, message: 'Income cannot be negative' }
      },
      housingStatus: {
        required: 'Housing status is required'
      }
    }
  },

  3: {
    id: 'situation-descriptions',
    title: 'Situation Descriptions',
    titleKey: 'steps.situationDescriptions.title',
    description: 'Describe your current situation (AI assistance available)',
    descriptionKey: 'steps.situationDescriptions.description',
    route: '/step-3',
    hasAI: true,
    fields: [
      'currentFinancialSituation',
      'employmentCircumstances',
      'reasonForApplying'
    ],
    validationRules: {
      currentFinancialSituation: {
        required: 'Please describe your current financial situation',
        minLength: { value: 20, message: 'Please provide at least 20 characters' },
        maxLength: { value: 1000, message: 'Description cannot exceed 1000 characters' }
      },
      employmentCircumstances: {
        required: 'Please describe your employment circumstances',
        minLength: { value: 20, message: 'Please provide at least 20 characters' },
        maxLength: { value: 1000, message: 'Description cannot exceed 1000 characters' }
      },
      reasonForApplying: {
        required: 'Please explain why you are applying for assistance',
        minLength: { value: 20, message: 'Please provide at least 20 characters' },
        maxLength: { value: 1000, message: 'Description cannot exceed 1000 characters' }
      }
    }
  },
  
};

// Step navigation helpers
export const TOTAL_STEPS = Object.keys(STEPS_CONFIG).length;

export const getStepConfig = (stepNumber) => {
  return STEPS_CONFIG[stepNumber] || null;
};

export const getNextStep = (currentStep) => {
  const nextStep = currentStep + 1;
  return nextStep <= TOTAL_STEPS ? nextStep : null;
};

export const getPreviousStep = (currentStep) => {
  const prevStep = currentStep - 1;
  return prevStep >= 1 ? prevStep : null;
};

export const getAllStepRoutes = () => {
  return Object.values(STEPS_CONFIG).map(step => step.route);
};

export const getStepByRoute = (route) => {
  return Object.values(STEPS_CONFIG).find(step => step.route === route) || null;
};

export const getStepNumberByRoute = (route) => {
  const stepEntry = Object.entries(STEPS_CONFIG).find(([_, config]) => config.route === route);
  return stepEntry ? parseInt(stepEntry[0]) : null;
};

// Validation helper
export const getFieldValidation = (stepNumber, fieldName) => {
  const step = getStepConfig(stepNumber);
  return step?.validationRules?.[fieldName] || {};
};

export default STEPS_CONFIG;