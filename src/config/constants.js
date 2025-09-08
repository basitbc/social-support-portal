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
  STEP_1: '/step-1',
  STEP_2: '/step-2', 
  STEP_3: '/step-3',
  REVIEW: '/review',
  SUCCESS: '/success',
  DOCS: '/docs'
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