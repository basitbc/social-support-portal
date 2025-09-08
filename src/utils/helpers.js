import { ERROR_MESSAGES, PROMPTS, UTILS_CONSTANTS } from "../config/constants";



export const cn = (...classes) => {
  return classes
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
    .trim();
};


export const generateId = (prefix = UTILS_CONSTANTS.DEFAULT_FIELD_PREFIX) => {
  return `${prefix}-${Math.random().toString(36).substr(2, UTILS_CONSTANTS.ID_LENGTH)}`;
};


export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};



export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};



export const getCurrentLanguage = (language = null) => language || i18n.language;



export const getErrorMessage = (errorType, language) => {
  const langKey = language === 'ar' ? 'ar' : 'en';
  return ERROR_MESSAGES[langKey][errorType] || ERROR_MESSAGES[langKey][UTILS_CONSTANTS.DEFAULT_ERROR_TYPE];
};


export const withLanguageSwitch = (language, callback) => {
  const originalLang = i18n.language;
  if (language !== originalLang) {
    i18n.changeLanguage(language);
  }
  
  try {
    return callback();
  } finally {
    if (language !== originalLang) {
      i18n.changeLanguage(originalLang);
    }
  }
};



const buildContext = (formContext, language) => {
  const contextParts = Object.entries(formContext)
    .filter(([_, value]) => value)
    .map(([key, value]) => language === 'ar' 
      ? `${UTILS_CONSTANTS.ARABIC_FORM_FIELDS[key] || key}: ${value}` 
      : `${key}: ${value}`);
  
  return contextParts.length 
    ? contextParts.join(', ') 
    : UTILS_CONSTANTS.NO_CONTEXT_MESSAGES[language] || UTILS_CONSTANTS.NO_CONTEXT_MESSAGES.en;
};


export const buildUserPrompt = (fieldName, userPrompt, formContext, language) => {
  const prompts = PROMPTS[language] || PROMPTS.en;
  const instruction = prompts.instructions[fieldName] || prompts.instructions.currentFinancialSituation;
  const context = buildContext(formContext, language);
  
  const template = UTILS_CONSTANTS.PROMPT_TEMPLATES[language] || UTILS_CONSTANTS.PROMPT_TEMPLATES.en;
  return template
    .replace('{context}', context)
    .replace('{instruction}', instruction)
    .replace('{userPrompt}', userPrompt);
};


export const cleanSuggestion = (text, language) => {
  let cleaned = text.trim();
  
  for (const prefix of UTILS_CONSTANTS.UNWANTED_PREFIXES) {
    if (cleaned.toLowerCase().startsWith(prefix.toLowerCase())) {
      cleaned = cleaned.substring(prefix.length).replace(/^:\s*/, '').trim();
      break;
    }
  }
  
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};


export const handleError = (error, language) => {
  console.error('AI generation failed:', error);
  
  const errorType = Object.keys(UTILS_CONSTANTS.ERROR_KEYWORDS)
    .find(key => error.message.includes(key))
    ? UTILS_CONSTANTS.ERROR_KEYWORDS[Object.keys(UTILS_CONSTANTS.ERROR_KEYWORDS)
        .find(key => error.message.includes(key))]
    : UTILS_CONSTANTS.DEFAULT_ERROR_TYPE;
    
  throw new Error(getErrorMessage(errorType, language));
};