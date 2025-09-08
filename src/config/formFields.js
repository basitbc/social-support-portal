// Form field definitions with options and configurations

import { useCallback } from "react";
import { FIELD_TYPES } from "./constants";


// Form field configurations
export const FORM_FIELDS = {
  // Step 1: Personal Information
  name: {
    type: FIELD_TYPES.TEXT,
    label: 'Full Name',
    labelKey: 'fields.name.label',
    placeholder: 'Enter your full name',
    placeholderKey: 'fields.name.placeholder',
    autoComplete: 'name',
    maxLength: 50,
    required: true
  },

  nationalId: {
    type: FIELD_TYPES.TEXT,
    label: 'National ID',
    labelKey: 'fields.nationalId.label',
    placeholder: 'Enter your national ID number',
    placeholderKey: 'fields.nationalId.placeholder',
    autoComplete: 'off',
    maxLength: 15,
    required: true
  },

  dateOfBirth: {
    type: FIELD_TYPES.DATE,
    label: 'Date of Birth',
    labelKey: 'fields.dateOfBirth.label',
    autoComplete: 'bday',
    required: true,
    max: new Date().toISOString().split('T')[0] // Today's date
  },

  gender: {
    type: FIELD_TYPES.SELECT,
    label: 'Gender',
    labelKey: 'fields.gender.label',
    placeholder: 'Select your gender',
    placeholderKey: 'fields.gender.placeholder',
    required: true,
    options: [
      { value: 'male', label: 'Male', labelKey: 'fields.gender.options.male' },
      { value: 'female', label: 'Female', labelKey: 'fields.gender.options.female' },
      { value: 'other', label: 'Other', labelKey: 'fields.gender.options.other' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say', labelKey: 'fields.gender.options.preferNotToSay' }
    ]
  },

  address: {
    type: FIELD_TYPES.TEXTAREA,
    label: 'Address',
    labelKey: 'fields.address.label',
    placeholder: 'Enter your complete address',
    placeholderKey: 'fields.address.placeholder',
    autoComplete: 'street-address',
    rows: 3,
    maxLength: 200,
    required: true
  },

  city: {
    type: FIELD_TYPES.TEXT,
    label: 'City',
    labelKey: 'fields.city.label',
    placeholder: 'Enter your city',
    placeholderKey: 'fields.city.placeholder',
    autoComplete: 'address-level2',
    maxLength: 50,
    required: true
  },

  state: {
    type: FIELD_TYPES.TEXT,
    label: 'State/Province',
    labelKey: 'fields.state.label',
    placeholder: 'Enter your state or province',
    placeholderKey: 'fields.state.placeholder',
    autoComplete: 'address-level1',
    maxLength: 50,
    required: true
  },

  country: {
    type: FIELD_TYPES.SELECT,
    label: 'Country',
    labelKey: 'fields.country.label',
    placeholder: 'Select your country',
    placeholderKey: 'fields.country.placeholder',
    autoComplete: 'country',
    required: true,
    options: [
      { value: 'US', label: 'United States', labelKey: 'fields.country.options.us' },
      { value: 'CA', label: 'Canada', labelKey: 'fields.country.options.ca' },
      { value: 'UK', label: 'United Kingdom', labelKey: 'fields.country.options.uk' },
      { value: 'AU', label: 'Australia', labelKey: 'fields.country.options.au' },
      { value: 'IN', label: 'India', labelKey: 'fields.country.options.in' },
      { value: 'other', label: 'Other', labelKey: 'fields.country.options.other' }
    ]
  },

  phone: {
    type: FIELD_TYPES.TEL,
    label: 'Phone Number',
    labelKey: 'fields.phone.label',
    placeholder: '+1 (555) 123-4567',
    placeholderKey: 'fields.phone.placeholder',
    autoComplete: 'tel',
    maxLength: 20,
    required: true
  },

  email: {
    type: FIELD_TYPES.EMAIL,
    label: 'Email Address',
    labelKey: 'fields.email.label',
    placeholder: 'Enter your email address',
    placeholderKey: 'fields.email.placeholder',
    autoComplete: 'email',
    maxLength: 100,
    required: true
  },

  // Step 2: Family & Financial Information
  maritalStatus: {
    type: FIELD_TYPES.SELECT,
    label: 'Marital Status',
    labelKey: 'fields.maritalStatus.label',
    placeholder: 'Select your marital status',
    placeholderKey: 'fields.maritalStatus.placeholder',
    required: true,
    options: [
      { value: 'single', label: 'Single', labelKey: 'fields.maritalStatus.options.single' },
      { value: 'married', label: 'Married', labelKey: 'fields.maritalStatus.options.married' },
      { value: 'divorced', label: 'Divorced', labelKey: 'fields.maritalStatus.options.divorced' },
      { value: 'widowed', label: 'Widowed', labelKey: 'fields.maritalStatus.options.widowed' },
      { value: 'separated', label: 'Separated', labelKey: 'fields.maritalStatus.options.separated' }
    ]
  },

  dependents: {
    type: FIELD_TYPES.NUMBER,
    label: 'Number of Dependents',
    labelKey: 'fields.dependents.label',
    placeholder: '0',
    placeholderKey: 'fields.dependents.placeholder',
    min: 0,
    max: 20,
    required: true
  },

  employmentStatus: {
    type: FIELD_TYPES.SELECT,
    label: 'Employment Status',
    labelKey: 'fields.employmentStatus.label',
    placeholder: 'Select your employment status',
    placeholderKey: 'fields.employmentStatus.placeholder',
    required: true,
    options: [
      { value: 'employed-full-time', label: 'Employed (Full-time)', labelKey: 'fields.employmentStatus.options.employedFullTime' },
      { value: 'employed-part-time', label: 'Employed (Part-time)', labelKey: 'fields.employmentStatus.options.employedPartTime' },
      { value: 'self-employed', label: 'Self-employed', labelKey: 'fields.employmentStatus.options.selfEmployed' },
      { value: 'unemployed', label: 'Unemployed', labelKey: 'fields.employmentStatus.options.unemployed' },
      { value: 'student', label: 'Student', labelKey: 'fields.employmentStatus.options.student' },
      { value: 'retired', label: 'Retired', labelKey: 'fields.employmentStatus.options.retired' },
      { value: 'disabled', label: 'Disabled', labelKey: 'fields.employmentStatus.options.disabled' },
      { value: 'other', label: 'Other', labelKey: 'fields.employmentStatus.options.other' }
    ]
  },

  monthlyIncome: {
    type: FIELD_TYPES.NUMBER,
    label: 'Monthly Income',
    labelKey: 'fields.monthlyIncome.label',
    placeholder: '0.00',
    placeholderKey: 'fields.monthlyIncome.placeholder',
    min: 0,
    step: 0.01,
    required: true,
    currency: true
  },

  housingStatus: {
    type: FIELD_TYPES.SELECT,
    label: 'Housing Status',
    labelKey: 'fields.housingStatus.label',
    placeholder: 'Select your housing status',
    placeholderKey: 'fields.housingStatus.placeholder',
    required: true,
    options: [
      { value: 'owned', label: 'Owned', labelKey: 'fields.housingStatus.options.owned' },
      { value: 'rented', label: 'Rented', labelKey: 'fields.housingStatus.options.rented' },
      { value: 'living-with-family', label: 'Living with family', labelKey: 'fields.housingStatus.options.livingWithFamily' },
      { value: 'temporary-housing', label: 'Temporary housing', labelKey: 'fields.housingStatus.options.temporaryHousing' },
      { value: 'homeless', label: 'Homeless', labelKey: 'fields.housingStatus.options.homeless' },
      { value: 'other', label: 'Other', labelKey: 'fields.housingStatus.options.other' }
    ]
  },

  // Step 3: Situation Descriptions (AI-assisted)
  currentFinancialSituation: {
    type: FIELD_TYPES.TEXTAREA,
    label: 'Current Financial Situation',
    labelKey: 'fields.currentFinancialSituation.label',
    placeholder: 'Describe your current financial situation...',
    placeholderKey: 'fields.currentFinancialSituation.placeholder',
    rows: 5,
    maxLength: 1000,
    required: true,
    hasAI: true,
    aiPrompt: 'Help me describe my current financial situation for a social support application'
  },

  employmentCircumstances: {
    type: FIELD_TYPES.TEXTAREA,
    label: 'Employment Circumstances',
    labelKey: 'fields.employmentCircumstances.label',
    placeholder: 'Describe your employment circumstances...',
    placeholderKey: 'fields.employmentCircumstances.placeholder',
    rows: 5,
    maxLength: 1000,
    required: true,
    hasAI: true,
    aiPrompt: 'Help me describe my employment circumstances for a social support application'
  },

  reasonForApplying: {
    type: FIELD_TYPES.TEXTAREA,
    label: 'Reason for Applying',
    labelKey: 'fields.reasonForApplying.label',
    placeholder: 'Explain why you are applying for assistance...',
    placeholderKey: 'fields.reasonForApplying.placeholder',
    rows: 5,
    maxLength: 1000,
    required: true,
    hasAI: true,
    aiPrompt: 'Help me explain why I need social support assistance'
  }
};

// Helper functions
export const getFieldConfig = (fieldName) => {
  return FORM_FIELDS[fieldName] || null;
};

export const getFieldsByStep = (stepNumber) => {
  const stepFields = {
    1: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'],
    2: ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'],
    3: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying']
  };
  
  return stepFields[stepNumber] || [];
};

export const getAIFields = () => {
  return Object.entries(FORM_FIELDS)
    .filter(([_, config]) => config.hasAI)
    .map(([fieldName, config]) => ({
      name: fieldName,
      config
    }));
};

export const isRequiredField = (fieldName) => {
  const field = getFieldConfig(fieldName);
  return field?.required || false;
};

export const getFieldType = (fieldName) => {
  const field = getFieldConfig(fieldName);
  return field?.type || FIELD_TYPES.TEXT;
};

export const getFieldOptions = (fieldName) => {
  const field = getFieldConfig(fieldName);
  return field?.options || [];
};

export default FORM_FIELDS;