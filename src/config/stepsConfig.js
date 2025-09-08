import { STEPS_CONSTANTS } from "./constants";


export const STEPS_CONFIG = {
  1: {
    id: STEPS_CONSTANTS.STEP_IDS.PERSONAL_INFO,
    title: 'Personal Information',
    titleKey: 'steps.personalInfo.title',
    description: 'Please provide your basic personal details',
    descriptionKey: 'steps.personalInfo.description',
    route: STEPS_CONSTANTS.ROUTES.STEP_1,
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
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.NAME,
        minLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.NAME_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.NAME_MIN 
        },
        maxLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.NAME_MAX, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.NAME_MAX 
        }
      },
      nationalId: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.NATIONAL_ID,
        pattern: {
          value: STEPS_CONSTANTS.VALIDATION_PATTERNS.NATIONAL_ID,
          message: STEPS_CONSTANTS.ERROR_MESSAGES.PATTERN.NATIONAL_ID
        }
      },
      dateOfBirth: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.DATE_OF_BIRTH,
        validate: (value) => {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          return age >= STEPS_CONSTANTS.VALIDATION_LIMITS.MIN_AGE || STEPS_CONSTANTS.ERROR_MESSAGES.RANGE.AGE_MIN;
        }
      },
      gender: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.GENDER
      },
      address: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.ADDRESS,
        minLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.ADDRESS_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.ADDRESS_MIN 
        }
      },
      city: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.CITY
      },
      state: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.STATE
      },
      country: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.COUNTRY
      },
      phone: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.PHONE,
        pattern: {
          value: STEPS_CONSTANTS.VALIDATION_PATTERNS.PHONE,
          message: STEPS_CONSTANTS.ERROR_MESSAGES.PATTERN.PHONE
        }
      },
      email: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.EMAIL,
        pattern: {
          value: STEPS_CONSTANTS.VALIDATION_PATTERNS.EMAIL,
          message: STEPS_CONSTANTS.ERROR_MESSAGES.PATTERN.EMAIL
        }
      }
    }
  },

  2: {
    id: STEPS_CONSTANTS.STEP_IDS.FAMILY_FINANCIAL,
    title: 'Family & Financial Information',
    titleKey: 'steps.familyFinancial.title',
    description: 'Tell us about your family and financial situation',
    descriptionKey: 'steps.familyFinancial.description',
    route: STEPS_CONSTANTS.ROUTES.STEP_2,
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
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.MARITAL_STATUS
      },
      dependents: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.DEPENDENTS,
        min: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DEPENDENTS_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.RANGE.DEPENDENTS_MIN 
        },
        max: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DEPENDENTS_MAX, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.RANGE.DEPENDENTS_MAX 
        }
      },
      employmentStatus: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.EMPLOYMENT_STATUS
      },
      monthlyIncome: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.MONTHLY_INCOME,
        min: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.INCOME_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.RANGE.INCOME_MIN 
        }
      },
      housingStatus: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.HOUSING_STATUS
      }
    }
  },

  3: {
    id: STEPS_CONSTANTS.STEP_IDS.SITUATION_DESCRIPTIONS,
    title: 'Situation Descriptions',
    titleKey: 'steps.situationDescriptions.title',
    description: 'Describe your current situation (AI assistance available)',
    descriptionKey: 'steps.situationDescriptions.description',
    route: STEPS_CONSTANTS.ROUTES.STEP_3,
    hasAI: true,
    fields: [
      'currentFinancialSituation',
      'employmentCircumstances',
      'reasonForApplying'
    ],
    validationRules: {
      currentFinancialSituation: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.FINANCIAL_SITUATION,
        minLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DESCRIPTION_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.DESCRIPTION_MIN 
        },
        maxLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DESCRIPTION_MAX, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.DESCRIPTION_MAX 
        }
      },
      employmentCircumstances: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.EMPLOYMENT_CIRCUMSTANCES,
        minLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DESCRIPTION_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.DESCRIPTION_MIN 
        },
        maxLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DESCRIPTION_MAX, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.DESCRIPTION_MAX 
        }
      },
      reasonForApplying: {
        required: STEPS_CONSTANTS.ERROR_MESSAGES.REQUIRED.REASON_FOR_APPLYING,
        minLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DESCRIPTION_MIN, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.DESCRIPTION_MIN 
        },
        maxLength: { 
          value: STEPS_CONSTANTS.VALIDATION_LIMITS.DESCRIPTION_MAX, 
          message: STEPS_CONSTANTS.ERROR_MESSAGES.LENGTH.DESCRIPTION_MAX 
        }
      }
    }
  }
};

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

export const getFieldValidation = (stepNumber, fieldName) => {
  const step = getStepConfig(stepNumber);
  return step?.validationRules?.[fieldName] || {};
};

export default STEPS_CONFIG;