// Storage keys for localStorage persistence
export const STORAGE_KEYS = {
  FORM_DATA: 'social_support_app_form_data',
  TERMS_ACCEPTED: 'social_support_app_terms_accepted',
  CURRENT_STEP: 'social_support_app_current_step',
  SUBMISSION_DATA: 'social_support_app_submission_data',
  CURRENT_LANGUAGE: 'social_support_app_language',
  CURRENT_THEME: 'social_support_app_theme',
};

// Application routes
export const ROUTES = {
  HOME: '/',
  PERSONAL_INFO: '/personal-info',
  FAMILY_FINANCIAL: '/family-financial', 
  SITUATION_DETAILS: '/situation-details',
  REVIEW: '/review',
  SUCCESS: '/success',
  DOCS: '/docs'
};

export const STEP_ROUTES = {
  1: ROUTES.PERSONAL_INFO,
  2: ROUTES.FAMILY_FINANCIAL,
  3: ROUTES.SITUATION_DETAILS,
  4: ROUTES.REVIEW,
};

// Predefined AI suggestions for form fields by language
export const PREDEFINED_SUGGESTIONS = {
  en: {
    currentFinancialSituation: [
      "I am currently facing financial difficulties due to reduced work hours.",
      "My family's monthly expenses exceed our current income, creating a budget shortfall.",
      "Unexpected medical expenses have put significant strain on our finances.",
      "Recent job loss has left us struggling to meet basic living expenses."
    ],
    employmentCircumstances: [
      "I am currently unemployed and actively seeking employment opportunities.",
      "My work hours have been significantly reduced, affecting my income stability.",
      "I work part-time but need additional income to support my family.",
      "Health issues have impacted my ability to maintain full-time employment."
    ],
    reasonForApplying: [
      "I need temporary assistance while I search for stable employment.",
      "Support would help us maintain housing stability during this difficult period.",
      "Assistance is needed to cover essential expenses while rebuilding our finances.",
      "This support would provide crucial help for my family's basic needs."
    ]
  },
  ar: {
    currentFinancialSituation: [
      "أواجه حاليًا صعوبات مالية بسبب تقليل ساعات العمل.",
      "مصاريف عائلتي الشهرية تتجاوز دخلنا الحالي، مما يخلق عجزًا في الميزانية.",
      "المصاريف الطبية غير المتوقعة وضعت ضغطًا كبيرًا على أموالنا.",
      "فقدان الوظيفة مؤخرًا جعلنا نكافح لتلبية نفقات المعيشة الأساسية."
    ],
    employmentCircumstances: [
      "أنا عاطل عن العمل حاليًا وأبحث بنشاط عن فرص عمل.",
      "تم تقليل ساعات عملي بشكل كبير، مما أثر على استقرار دخلي.",
      "أعمل بدوام جزئي ولكنني أحتاج دخلاً إضافيًا لإعالة عائلتي.",
      "المشاكل الصحية أثرت على قدرتي على الحفاظ على عمل بدوام كامل."
    ],
    reasonForApplying: [
      "أحتاج إلى مساعدة مؤقتة بينما أبحث عن عمل مستقر.",
      "الدعم سيساعدنا في الحفاظ على استقرار السكن خلال هذه الفترة الصعبة.",
      "المساعدة مطلوبة لتغطية النفقات الأساسية أثناء إعادة بناء أموالنا.",
      "هذا الدعم سيوفر مساعدة حاسمة لاحتياجات عائلتي الأساسية."
    ]
  }
};

// Gender options with translation keys
export const GENDER_OPTIONS = [
  { value: 'male', translationKey: 'fields.gender.options.male' },
  { value: 'female', translationKey: 'fields.gender.options.female' },
  { value: 'other', translationKey: 'fields.gender.options.other' },
  { value: 'prefer-not-to-say', translationKey: 'fields.gender.options.preferNotToSay' }
];

// Country options with translation keys
export const COUNTRY_OPTIONS = [
  { value: 'AU', translationKey: 'fields.country.options.au' }, 
  { value: 'CA', translationKey: 'fields.country.options.ca' }, 
  { value: 'IN', translationKey: 'fields.country.options.in' }, 
  { value: 'PK', translationKey: 'fields.country.options.pk' }, 
  { value: 'AE', translationKey: 'fields.country.options.ae' }, 
  { value: 'UK', translationKey: 'fields.country.options.uk' }, 
  { value: 'US', translationKey: 'fields.country.options.us' }, 
  { value: 'other', translationKey: 'fields.country.options.other' } 
];


// Marital status options with translation keys
export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', translationKey: 'fields.maritalStatus.options.single' },
  { value: 'married', translationKey: 'fields.maritalStatus.options.married' },
  { value: 'divorced', translationKey: 'fields.maritalStatus.options.divorced' },
  { value: 'widowed', translationKey: 'fields.maritalStatus.options.widowed' },
  { value: 'separated', translationKey: 'fields.maritalStatus.options.separated' }
];

// Employment status options with translation keys
export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'employed', translationKey: 'fields.employmentStatus.options.employed' },
  { value: 'parttime', translationKey: 'fields.employmentStatus.options.parttime' },
  { value: 'unemployed', translationKey: 'fields.employmentStatus.options.unemployed' },
  { value: 'retired', translationKey: 'fields.employmentStatus.options.retired' },
  { value: 'student', translationKey: 'fields.employmentStatus.options.student' },
  { value: 'disabled', translationKey: 'fields.employmentStatus.options.disabled' },
  { value: 'other', translationKey: 'fields.employmentStatus.options.other' }
];

// Housing status options with translation keys
export const HOUSING_STATUS_OPTIONS = [
  { value: 'owned', translationKey: 'fields.housingStatus.options.owned' },
  { value: 'rented', translationKey: 'fields.housingStatus.options.rented' },
  { value: 'livingwithfamily', translationKey: 'fields.housingStatus.options.livingwithfamily' },
  { value: 'temporaryhousing', translationKey: 'fields.housingStatus.options.temporaryhousing' },
  { value: 'homeless', translationKey: 'fields.housingStatus.options.homeless' },
  { value: 'other', translationKey: 'fields.housingStatus.options.other' }
];

// Required fields for each step
export const stepRequirements = {
  1: ['termsRequired'],
  2: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'],
  3: ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'],
  4: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying']
};

// AI prompts and instructions by language
export const PROMPTS = {
  en: {
    system: `You are an AI assistant for drafting detailed supportive statements for social support requests. Always write in the first person (using "I" instead of names). Write exactly one professional paragraph (5-6 sentences) that is detailed, factual, and suitable for official use. Be empathetic but maintain professionalism. Do not write it in the format of a letter or application; provide only one continuous paragraph without headings or lists.`,
    instructions: {
      currentFinancialSituation: 'Describe the current financial situation clearly (use "I")',
      employmentCircumstances: 'Explain employment situation and challenges (use "I")',
      reasonForApplying: 'Explain why assistance is needed and how it will help (use "I")'
    }
  },
  ar: {
    system: `أنت مساعد ذكي لصياغة بيانات مفصلة لطلبات الدعم الاجتماعي. اكتب دائماً بصيغة المتكلم (باستخدام "أنا" بدلاً من الأسماء). اكتب فقرة واحدة فقط (من 7 إلى 6 جمل) بشكل مهني ومفصل ومناسب للاستخدام الرسمي. كن متفهماً وحافظ على المهنية. لا تكتب النص بصيغة خطاب أو طلب رسمي؛ فقط فقرة واحدة متصلة بدون عناوين أو قوائم.`,
    instructions: {
      currentFinancialSituation: 'وصف الوضع المالي الحالي بوضوح (باستخدام "أنا")',
      employmentCircumstances: 'شرح وضع العمل والتحديات (باستخدام "أنا")',
      reasonForApplying: 'شرح سبب الحاجة للمساعدة وكيف ستساعد (باستخدام "أنا")'
    }
  }
};

// Form field types
export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  TEL: 'tel',
  DATE: 'date',
  NUMBER: 'number',
  SELECT: 'select',
  TEXTAREA: 'textarea'
};

// Error messages by language
export const ERROR_MESSAGES = {
  en: {
    alreadyGenerating: 'AI is already generating a response. Please wait.',
    invalidField: 'Invalid field name provided.',
    emptyPrompt: 'Please provide a prompt or select a suggestion first.',
    noSuggestion: 'No suggestion was generated. Please try again.',
    rateLimited: 'AI service is temporarily busy. Please try again in a moment.',
    authFailed: 'AI service authentication failed. Please check configuration.',
    generationFailed: 'Failed to generate suggestion. Please try again.',
    networkError: 'Network error. Please check your connection and try again.'
  },
  ar: {
    alreadyGenerating: 'الذكاء الاصطناعي يعمل على إنشاء رد. يرجى الانتظار.',
    invalidField: 'اسم الحقل المقدم غير صحيح.',
    emptyPrompt: 'يرجى تقديم نص أو اختيار اقتراح أولاً.',
    noSuggestion: 'لم يتم إنشاء اقتراح. يرجى المحاولة مرة أخرى.',
    rateLimited: 'خدمة الذكاء الاصطناعي مشغولة مؤقتاً. يرجى المحاولة بعد قليل.',
    authFailed: 'فشل في المصادقة مع خدمة الذكاء الاصطناعي. يرجى فحص الإعدادات.',
    generationFailed: 'فشل في إنشاء الاقتراح. يرجى المحاولة مرة أخرى.',
    networkError: 'خطأ في الشبكة. يرجى فحص الاتصال والمحاولة مرة أخرى.'
  }
};


// useAI Constants
export const AI_CONSTANTS = {
  MIN_PROMPT_LENGTH: 5,
  MAX_PROMPT_LENGTH: 500,
  NOTIFICATION_DURATION: {
    SUCCESS: 3000,
    ERROR: 5000,
    INFO: 2000
  },
  MESSAGES: {
    EN: {
      ALREADY_GENERATING: 'Already generating',
      PROMPT_REQUIRED: 'Please provide a prompt or select a suggestion',
      SUCCESS: 'Suggestion generated successfully',
      FAILED: 'Failed to generate suggestion',
      CANCELLED: 'Generation cancelled',
      FIELD_NAME_REQUIRED: 'Field name is required',
      PROMPT_REQUIRED_VALIDATION: 'Prompt or suggestion is required',
      PROMPT_TOO_SHORT: 'Prompt is too short',
      PROMPT_TOO_LONG: 'Prompt is too long'
    },
    AR: {
      ALREADY_GENERATING: 'جاري الإنشاء بالفعل',
      PROMPT_REQUIRED: 'يرجى إدخال نص أو اختيار اقتراح',
      SUCCESS: 'تم إنشاء الاقتراح بنجاح',
      FAILED: 'فشل في إنشاء الاقتراح',
      CANCELLED: 'تم إلغاء الإنشاء',
      FIELD_NAME_REQUIRED: 'اسم الحقل مطلوب',
      PROMPT_REQUIRED_VALIDATION: 'النص أو الاقتراح مطلوب',
      PROMPT_TOO_SHORT: 'النص قصير جداً',
      PROMPT_TOO_LONG: 'النص طويل جداً'
    }
  }
};


export const UTILS_CONSTANTS = {
  DEFAULT_FIELD_PREFIX: 'field',
  ID_LENGTH: 9,
  ARABIC_FORM_FIELDS: {
    employmentStatus: 'العمل',
    monthlyIncome: 'الدخل',
    maritalStatus: 'الحالة الاجتماعية',
    dependents: 'المعالين',
    housingStatus: 'السكن'
  },
  NO_CONTEXT_MESSAGES: {
    ar: 'لا توجد معلومات',
    en: 'No context'
  },
  PROMPT_TEMPLATES: {
    ar: 'السياق: {context}\nالمطلوب: {instruction}\nالتوجيهات: "{userPrompt}"\nاكتب فقرة مناسبة:',
    en: 'Context: {context}\nTask: {instruction}\nInstructions: "{userPrompt}"\nWrite appropriate text:'
  },
  UNWANTED_PREFIXES: ['Here is', 'Here\'s', 'This is', 'إليك', 'هذا هو', 'فيما يلي'],
  ERROR_KEYWORDS: {
    'rate limit': 'rateLimited',
    'Authentication': 'authFailed',
    'OpenAI not configured': 'configError'
  },
  DEFAULT_ERROR_TYPE: 'generationFailed'
};

export const FORM_CONSTANTS = {
  MAX_LENGTHS: {
    NAME: 50,
    NATIONAL_ID: 15,
    ADDRESS: 200,
    CITY: 50,
    STATE: 50,
    PHONE: 20,
    EMAIL: 100,
    TEXTAREA_LONG: 1000
  },
  TEXTAREA_ROWS: {
    SMALL: 3,
    MEDIUM: 5
  },
  NUMBER_LIMITS: {
    DEPENDENTS_MIN: 0,
    DEPENDENTS_MAX: 20,
    INCOME_MIN: 0,
    INCOME_STEP: 0.01
  },
  AUTOCOMPLETE: {
    NAME: 'name',
    OFF: 'off',
    BDAY: 'bday',
    STREET_ADDRESS: 'street-address',
    ADDRESS_LEVEL_2: 'address-level2',
    ADDRESS_LEVEL_1: 'address-level1',
    COUNTRY: 'country',
    TEL: 'tel',
    EMAIL: 'email'
  },
  PLACEHOLDERS: {
    PHONE: '+1 (555) 123-4567',
    DEPENDENTS: '0',
    INCOME: '0.00'
  },
  OPTION_VALUES: {
    GENDER: {
      MALE: 'male',
      FEMALE: 'female',
      OTHER: 'other',
      PREFER_NOT_TO_SAY: 'prefer-not-to-say'
    },
    COUNTRY: {
      US: 'US',
      CA: 'CA',
      UK: 'UK',
      AU: 'AU',
      IN: 'IN',
      OTHER: 'other'
    },
    MARITAL_STATUS: {
      SINGLE: 'single',
      MARRIED: 'married',
      DIVORCED: 'divorced',
      WIDOWED: 'widowed',
      SEPARATED: 'separated'
    },
    EMPLOYMENT: {
      EMPLOYED_FULL_TIME: 'employed-full-time',
      EMPLOYED_PART_TIME: 'employed-part-time',
      SELF_EMPLOYED: 'self-employed',
      UNEMPLOYED: 'unemployed',
      STUDENT: 'student',
      RETIRED: 'retired',
      DISABLED: 'disabled',
      OTHER: 'other'
    },
    HOUSING: {
      OWNED: 'owned',
      RENTED: 'rented',
      LIVING_WITH_FAMILY: 'living-with-family',
      TEMPORARY_HOUSING: 'temporary-housing',
      HOMELESS: 'homeless',
      OTHER: 'other'
    }
  },
  STEP_FIELDS: {
    1: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'],
    2: ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'],
    3: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying']
  }
};


export const STEPS_CONSTANTS = {
  STEP_IDS: {
    PERSONAL_INFO: 'personal-info',
    FAMILY_FINANCIAL: 'family-financial',
    SITUATION_DESCRIPTIONS: 'situation-descriptions'
  },
  ROUTES: {
  PERSONAL_INFO: '/personal-info',
  FAMILY_FINANCIAL: '/family-financial', 
  SITUATION_DETAILS: '/situation-details',
  },
  VALIDATION_LIMITS: {
    NAME_MIN: 2,
    NAME_MAX: 50,
    ADDRESS_MIN: 10,
    DEPENDENTS_MIN: 0,
    DEPENDENTS_MAX: 20,
    INCOME_MIN: 0,
    DESCRIPTION_MIN: 20,
    DESCRIPTION_MAX: 1000,
    PHONE_MIN: 10,
    PHONE_MAX: 15,
    NATIONAL_ID_MIN: 10,
    NATIONAL_ID_MAX: 15,
    MIN_AGE: 18
  },
  VALIDATION_PATTERNS: {
    NATIONAL_ID: /^[0-9]{10,15}$/,
    PHONE: /^[\+]?[0-9\-\(\)\s]{10,15}$/,
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  ERROR_MESSAGES: {
    REQUIRED: {
      NAME: 'Name is required',
      NATIONAL_ID: 'National ID is required',
      DATE_OF_BIRTH: 'Date of birth is required',
      GENDER: 'Gender is required',
      ADDRESS: 'Address is required',
      CITY: 'City is required',
      STATE: 'State is required',
      COUNTRY: 'Country is required',
      PHONE: 'Phone number is required',
      EMAIL: 'Email is required',
      MARITAL_STATUS: 'Marital status is required',
      DEPENDENTS: 'Number of dependents is required',
      EMPLOYMENT_STATUS: 'Employment status is required',
      MONTHLY_INCOME: 'Monthly income is required',
      HOUSING_STATUS: 'Housing status is required',
      FINANCIAL_SITUATION: 'Please describe your current financial situation',
      EMPLOYMENT_CIRCUMSTANCES: 'Please describe your employment circumstances',
      REASON_FOR_APPLYING: 'Please explain why you are applying for assistance'
    },
    LENGTH: {
      NAME_MIN: 'Name must be at least 2 characters',
      NAME_MAX: 'Name cannot exceed 50 characters',
      ADDRESS_MIN: 'Address must be at least 10 characters',
      DESCRIPTION_MIN: 'Please provide at least 20 characters',
      DESCRIPTION_MAX: 'Description cannot exceed 1000 characters'
    },
    PATTERN: {
      NATIONAL_ID: 'National ID must be 10-15 digits',
      PHONE: 'Please enter a valid phone number',
      EMAIL: 'Please enter a valid email address'
    },
    RANGE: {
      DEPENDENTS_MIN: 'Number cannot be negative',
      DEPENDENTS_MAX: 'Please enter a realistic number',
      INCOME_MIN: 'Income cannot be negative',
      AGE_MIN: 'You must be at least 18 years old'
    }
  }
};


export const OPENAI_CONSTANTS = {
  DEFAULTS: {
    MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 200,
    TEMPERATURE: 0.7,
    TIMEOUT: 30000
  },
  ENV_KEYS: {
    API_KEY: 'VITE_OPENAI_API_KEY',
    MODEL: 'VITE_OPENAI_MODEL',
    MAX_TOKENS: 'VITE_OPENAI_MAX_TOKENS',
    TEMPERATURE: 'VITE_OPENAI_TEMPERATURE',
    TIMEOUT: 'VITE_OPENAI_TIMEOUT'
  },
  VALIDATION: {
    API_KEY_PREFIX: 'sk-'
  }
};

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];


export const MODAL_STATES = {
  INPUT: 'input',
  SUGGESTION: 'suggestion',
  EDITING: 'editing'
};

export const COPY_TIMEOUT = 2000;
export const SCROLL_DELAY = 100;
export const MAX_PROMPT_LENGTH = 500;
export const MAX_SUGGESTION_LENGTH = 1000;

export const DEFAULT_PROMPTS = {
  currentFinancialSituation: {
    ar: 'اكتب وصفاً مهنياً لوضعي المالي الحالي',
    en: 'Write a professional description of my current financial situation'
  },
  employmentCircumstances: {
    ar: 'اشرح ظروف عملي الحالية بطريقة مهنية',
    en: 'Explain my current employment circumstances professionally'
  },
  reasonForApplying: {
    ar: 'اشرح سبب حاجتي للمساعدة المالية',
    en: 'Explain why I need financial assistance'
  }
};

export const FALLBACK_PROMPT = {
  ar: 'ساعدني في كتابة هذا القسم',
  en: 'Help me write this section'
};



export const API_CONFIG = {
   BASE_URL: 'https://api.openai.com/v1',
  ENDPOINT: '/chat/completions',
  DEFAULT_MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 300,
  TEMPERATURE: 0.7,
  TIMEOUT: 15000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
};


export const ERROR_TYPES = {
  ALREADY_GENERATING: 'alreadyGenerating',
  INVALID_FIELD: 'invalidField',
  EMPTY_PROMPT: 'emptyPrompt',
  NO_SUGGESTION: 'noSuggestion',
  NOT_CONFIGURED: 'OpenAI not configured'
};

export const ROLES = {
  SYSTEM: 'system',
  USER: 'user'
};


export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500
};

export const ERROR_MESSAGES_API = {
  AUTH_FAILED: 'Authentication failed',
  RATE_LIMITED: 'Rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NETWORK_ERROR: 'Network error. Check your connection.',
  REQUEST_FAILED: 'Request failed'
};

