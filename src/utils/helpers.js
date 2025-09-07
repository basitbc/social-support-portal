import { ERROR_MESSAGES, PROMPTS } from "../config/constants";

// Combine class names conditionally (like clsx/classnames)
export const cn = (...classes) => {
  return classes
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
    .trim();
};



// Generate a unique ID for form fields
export const generateId = (prefix = 'field') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};



// Debounce function to limit function calls
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



// Throttle function to limit function calls
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


// Format currency value
export const formatCurrency = (value, currency = 'USD', locale = 'en-US') => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue);
};



// Utility functions
export const getCurrentLanguage = (language = null) => language || i18n.language;

export const getErrorMessage = (errorType, language) => {
  const langKey = language === 'ar' ? 'ar' : 'en';
  return ERROR_MESSAGES[langKey][errorType] || ERROR_MESSAGES[langKey].generationFailed;
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


// Helper functions
const buildContext = (formContext, language) => {
  const fields = { employmentStatus: 'العمل', monthlyIncome: 'الدخل', maritalStatus: 'الحالة الاجتماعية', dependents: 'المعالين', housingStatus: 'السكن' };
  const contextParts = Object.entries(formContext)
    .filter(([_, value]) => value)
    .map(([key, value]) => language === 'ar' ? `${fields[key] || key}: ${value}` : `${key}: ${value}`);
  
  return contextParts.length ? contextParts.join(', ') : (language === 'ar' ? 'لا توجد معلومات' : 'No context');
};


export const buildUserPrompt = (fieldName, userPrompt, formContext, language) => {
  const prompts = PROMPTS[language] || PROMPTS.en;
  const instruction = prompts.instructions[fieldName] || prompts.instructions.currentFinancialSituation;
  const context = buildContext(formContext, language);
  
  return language === 'ar' 
    ? `السياق: ${context}\nالمطلوب: ${instruction}\nالتوجيهات: "${userPrompt}"\nاكتب فقرة مناسبة:`
    : `Context: ${context}\nTask: ${instruction}\nInstructions: "${userPrompt}"\nWrite appropriate text:`;
};


export const cleanSuggestion = (text, language) => {
  const unwantedPrefixes = ['Here is', 'Here\'s', 'This is', 'إليك', 'هذا هو', 'فيما يلي'];
  let cleaned = text.trim();
  
  for (const prefix of unwantedPrefixes) {
    if (cleaned.toLowerCase().startsWith(prefix.toLowerCase())) {
      cleaned = cleaned.substring(prefix.length).replace(/^:\s*/, '').trim();
      break;
    }
  }
  
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};



export const handleError = (error, language) => {
  console.error('AI generation failed:', error);
  
  const errorMap = {
    'rate limit': 'rateLimited',
    'Authentication': 'authFailed',
    'OpenAI not configured': 'configError'
  };
  
  const errorType = Object.keys(errorMap).find(key => error.message.includes(key)) 
    ? errorMap[Object.keys(errorMap).find(key => error.message.includes(key))]
    : 'generationFailed';
    
  throw new Error(getErrorMessage(errorType, language));
};
