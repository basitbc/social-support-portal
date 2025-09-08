// Create validation rules with translated messages
export const createValidationRules = (stepConfig, fieldName, t) => {
  const baseRules = stepConfig.validationRules[fieldName] || {};
  const translatedRules = { ...baseRules };

  if (translatedRules.required) {
    translatedRules.required = t('validation.required');
  }
  
  if (translatedRules.pattern && fieldName === 'email') {
    translatedRules.pattern = {
      ...translatedRules.pattern,
      message: t('validation.email')
    };
  }
  
  if (translatedRules.pattern && fieldName === 'phone') {
    translatedRules.pattern = {
      ...translatedRules.pattern,
      message: t('validation.phone')
    };
  }
  
  if (translatedRules.minLength) {
    translatedRules.minLength = {
      ...translatedRules.minLength,
      message: t('validation.minLength', { min: translatedRules.minLength.value })
    };
  }
  
  if (translatedRules.maxLength) {
    translatedRules.maxLength = {
      ...translatedRules.maxLength,
      message: t('validation.maxLength', { max: translatedRules.maxLength.value })
    };
  }

  return translatedRules;
};
