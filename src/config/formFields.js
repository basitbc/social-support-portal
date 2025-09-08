import { FIELD_TYPES, FORM_CONSTANTS } from "./constants";



export const FORM_FIELDS = {
  name: {
    type: FIELD_TYPES.TEXT,
    label: 'Full Name',
    labelKey: 'fields.name.label',
    placeholder: 'Enter your full name',
    placeholderKey: 'fields.name.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.NAME,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.NAME,
    required: true
  },

  nationalId: {
    type: FIELD_TYPES.TEXT,
    label: 'National ID',
    labelKey: 'fields.nationalId.label',
    placeholder: 'Enter your national ID number',
    placeholderKey: 'fields.nationalId.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.OFF,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.NATIONAL_ID,
    required: true
  },

  dateOfBirth: {
    type: FIELD_TYPES.DATE,
    label: 'Date of Birth',
    labelKey: 'fields.dateOfBirth.label',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.BDAY,
    required: true,
    max: new Date().toISOString().split('T')[0]
  },

  gender: {
    type: FIELD_TYPES.SELECT,
    label: 'Gender',
    labelKey: 'fields.gender.label',
    placeholder: 'Select your gender',
    placeholderKey: 'fields.gender.placeholder',
    required: true,
    options: [
      { value: FORM_CONSTANTS.OPTION_VALUES.GENDER.MALE, label: 'Male', labelKey: 'fields.gender.options.male' },
      { value: FORM_CONSTANTS.OPTION_VALUES.GENDER.FEMALE, label: 'Female', labelKey: 'fields.gender.options.female' },
      { value: FORM_CONSTANTS.OPTION_VALUES.GENDER.OTHER, label: 'Other', labelKey: 'fields.gender.options.other' },
      { value: FORM_CONSTANTS.OPTION_VALUES.GENDER.PREFER_NOT_TO_SAY, label: 'Prefer not to say', labelKey: 'fields.gender.options.preferNotToSay' }
    ]
  },

  address: {
    type: FIELD_TYPES.TEXTAREA,
    label: 'Address',
    labelKey: 'fields.address.label',
    placeholder: 'Enter your complete address',
    placeholderKey: 'fields.address.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.STREET_ADDRESS,
    rows: FORM_CONSTANTS.TEXTAREA_ROWS.SMALL,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.ADDRESS,
    required: true
  },

  city: {
    type: FIELD_TYPES.TEXT,
    label: 'City',
    labelKey: 'fields.city.label',
    placeholder: 'Enter your city',
    placeholderKey: 'fields.city.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.ADDRESS_LEVEL_2,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.CITY,
    required: true
  },

  state: {
    type: FIELD_TYPES.TEXT,
    label: 'State/Province',
    labelKey: 'fields.state.label',
    placeholder: 'Enter your state or province',
    placeholderKey: 'fields.state.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.ADDRESS_LEVEL_1,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.STATE,
    required: true
  },

  country: {
    type: FIELD_TYPES.SELECT,
    label: 'Country',
    labelKey: 'fields.country.label',
    placeholder: 'Select your country',
    placeholderKey: 'fields.country.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.COUNTRY,
    required: true,
    options: [
      { value: FORM_CONSTANTS.OPTION_VALUES.COUNTRY.US, label: 'United States', labelKey: 'fields.country.options.us' },
      { value: FORM_CONSTANTS.OPTION_VALUES.COUNTRY.CA, label: 'Canada', labelKey: 'fields.country.options.ca' },
      { value: FORM_CONSTANTS.OPTION_VALUES.COUNTRY.UK, label: 'United Kingdom', labelKey: 'fields.country.options.uk' },
      { value: FORM_CONSTANTS.OPTION_VALUES.COUNTRY.AU, label: 'Australia', labelKey: 'fields.country.options.au' },
      { value: FORM_CONSTANTS.OPTION_VALUES.COUNTRY.IN, label: 'India', labelKey: 'fields.country.options.in' },
      { value: FORM_CONSTANTS.OPTION_VALUES.COUNTRY.OTHER, label: 'Other', labelKey: 'fields.country.options.other' }
    ]
  },

  phone: {
    type: FIELD_TYPES.TEL,
    label: 'Phone Number',
    labelKey: 'fields.phone.label',
    placeholder: FORM_CONSTANTS.PLACEHOLDERS.PHONE,
    placeholderKey: 'fields.phone.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.TEL,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.PHONE,
    required: true
  },

  email: {
    type: FIELD_TYPES.EMAIL,
    label: 'Email Address',
    labelKey: 'fields.email.label',
    placeholder: 'Enter your email address',
    placeholderKey: 'fields.email.placeholder',
    autoComplete: FORM_CONSTANTS.AUTOCOMPLETE.EMAIL,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.EMAIL,
    required: true
  },

  maritalStatus: {
    type: FIELD_TYPES.SELECT,
    label: 'Marital Status',
    labelKey: 'fields.maritalStatus.label',
    placeholder: 'Select your marital status',
    placeholderKey: 'fields.maritalStatus.placeholder',
    required: true,
    options: [
      { value: FORM_CONSTANTS.OPTION_VALUES.MARITAL_STATUS.SINGLE, label: 'Single', labelKey: 'fields.maritalStatus.options.single' },
      { value: FORM_CONSTANTS.OPTION_VALUES.MARITAL_STATUS.MARRIED, label: 'Married', labelKey: 'fields.maritalStatus.options.married' },
      { value: FORM_CONSTANTS.OPTION_VALUES.MARITAL_STATUS.DIVORCED, label: 'Divorced', labelKey: 'fields.maritalStatus.options.divorced' },
      { value: FORM_CONSTANTS.OPTION_VALUES.MARITAL_STATUS.WIDOWED, label: 'Widowed', labelKey: 'fields.maritalStatus.options.widowed' },
      { value: FORM_CONSTANTS.OPTION_VALUES.MARITAL_STATUS.SEPARATED, label: 'Separated', labelKey: 'fields.maritalStatus.options.separated' }
    ]
  },

  dependents: {
    type: FIELD_TYPES.NUMBER,
    label: 'Number of Dependents',
    labelKey: 'fields.dependents.label',
    placeholder: FORM_CONSTANTS.PLACEHOLDERS.DEPENDENTS,
    placeholderKey: 'fields.dependents.placeholder',
    min: FORM_CONSTANTS.NUMBER_LIMITS.DEPENDENTS_MIN,
    max: FORM_CONSTANTS.NUMBER_LIMITS.DEPENDENTS_MAX,
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
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.EMPLOYED_FULL_TIME, label: 'Employed (Full-time)', labelKey: 'fields.employmentStatus.options.employedFullTime' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.EMPLOYED_PART_TIME, label: 'Employed (Part-time)', labelKey: 'fields.employmentStatus.options.employedPartTime' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.SELF_EMPLOYED, label: 'Self-employed', labelKey: 'fields.employmentStatus.options.selfEmployed' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.UNEMPLOYED, label: 'Unemployed', labelKey: 'fields.employmentStatus.options.unemployed' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.STUDENT, label: 'Student', labelKey: 'fields.employmentStatus.options.student' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.RETIRED, label: 'Retired', labelKey: 'fields.employmentStatus.options.retired' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.DISABLED, label: 'Disabled', labelKey: 'fields.employmentStatus.options.disabled' },
      { value: FORM_CONSTANTS.OPTION_VALUES.EMPLOYMENT.OTHER, label: 'Other', labelKey: 'fields.employmentStatus.options.other' }
    ]
  },

  monthlyIncome: {
    type: FIELD_TYPES.NUMBER,
    label: 'Monthly Income',
    labelKey: 'fields.monthlyIncome.label',
    placeholder: FORM_CONSTANTS.PLACEHOLDERS.INCOME,
    placeholderKey: 'fields.monthlyIncome.placeholder',
    min: FORM_CONSTANTS.NUMBER_LIMITS.INCOME_MIN,
    step: FORM_CONSTANTS.NUMBER_LIMITS.INCOME_STEP,
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
      { value: FORM_CONSTANTS.OPTION_VALUES.HOUSING.OWNED, label: 'Owned', labelKey: 'fields.housingStatus.options.owned' },
      { value: FORM_CONSTANTS.OPTION_VALUES.HOUSING.RENTED, label: 'Rented', labelKey: 'fields.housingStatus.options.rented' },
      { value: FORM_CONSTANTS.OPTION_VALUES.HOUSING.LIVING_WITH_FAMILY, label: 'Living with family', labelKey: 'fields.housingStatus.options.livingWithFamily' },
      { value: FORM_CONSTANTS.OPTION_VALUES.HOUSING.TEMPORARY_HOUSING, label: 'Temporary housing', labelKey: 'fields.housingStatus.options.temporaryHousing' },
      { value: FORM_CONSTANTS.OPTION_VALUES.HOUSING.HOMELESS, label: 'Homeless', labelKey: 'fields.housingStatus.options.homeless' },
      { value: FORM_CONSTANTS.OPTION_VALUES.HOUSING.OTHER, label: 'Other', labelKey: 'fields.housingStatus.options.other' }
    ]
  },

  currentFinancialSituation: {
    type: FIELD_TYPES.TEXTAREA,
    label: 'Current Financial Situation',
    labelKey: 'fields.currentFinancialSituation.label',
    placeholder: 'Describe your current financial situation...',
    placeholderKey: 'fields.currentFinancialSituation.placeholder',
    rows: FORM_CONSTANTS.TEXTAREA_ROWS.MEDIUM,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.TEXTAREA_LONG,
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
    rows: FORM_CONSTANTS.TEXTAREA_ROWS.MEDIUM,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.TEXTAREA_LONG,
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
    rows: FORM_CONSTANTS.TEXTAREA_ROWS.MEDIUM,
    maxLength: FORM_CONSTANTS.MAX_LENGTHS.TEXTAREA_LONG,
    required: true,
    hasAI: true,
    aiPrompt: 'Help me explain why I need social support assistance'
  }
};

export const getFieldConfig = (fieldName) => {
  return FORM_FIELDS[fieldName] || null;
};

export const getFieldsByStep = (stepNumber) => {
  return FORM_CONSTANTS.STEP_FIELDS[stepNumber] || [];
};

export const getAIFields = () => {
  return Object.entries(FORM_FIELDS)
    .filter(([_, config]) => config.hasAI)
    .map(([fieldName, config]) => ({
      name: fieldName,
      config
    }));
};

export default FORM_FIELDS;