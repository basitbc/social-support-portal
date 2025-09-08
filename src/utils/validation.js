// validation.js

// Create validation rules with translated messages
export const createValidationRules = (stepConfig, fieldName, t) => {
  const baseRules = stepConfig.validationRules[fieldName] || {};
  const translatedRules = { ...baseRules };

  // Translate required field message
  if (translatedRules.required) {
    translatedRules.required = t('validation.required');
  }
  
  // Translate email pattern message
  if (translatedRules.pattern && fieldName === 'email') {
    translatedRules.pattern = {
      ...translatedRules.pattern,
      message: t('validation.email')
    };
  }
  
  // Translate phone pattern message
  if (translatedRules.pattern && fieldName === 'phone') {
    translatedRules.pattern = {
      ...translatedRules.pattern,
      message: t('validation.phone')
    };
  }
  
  // Translate minimum length message with value
  if (translatedRules.minLength) {
    translatedRules.minLength = {
      ...translatedRules.minLength,
      message: t('validation.minLength', { min: translatedRules.minLength.value })
    };
  }
  
  // Translate maximum length message with value
  if (translatedRules.maxLength) {
    translatedRules.maxLength = {
      ...translatedRules.maxLength,
      message: t('validation.maxLength', { max: translatedRules.maxLength.value })
    };
  }

  return translatedRules;
};

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  NATIONAL_ID: /^\d{10,15}$/
};

// Validation message keys for i18n
export const VALIDATION_MESSAGES = {
  REQUIRED: 'validation.required',
  EMAIL: 'validation.email',
  PHONE: 'validation.phone',
  MIN_LENGTH: 'validation.minLength',
  MAX_LENGTH: 'validation.maxLength'
};