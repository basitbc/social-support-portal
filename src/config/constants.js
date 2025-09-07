

export const STORAGE_KEYS = {
  FORM_DATA: 'social_support_app_form_data',
  TERMS_ACCEPTED: 'social_support_app_terms_accepted',
  CURRENT_STEP: 'social_support_app_current_step',
  SUBMISSION_DATA: 'social_support_app_submission_data',
  CURRENT_LANGUAGE: 'social_support_app_language',
  CURRENT_THEME: 'social_support_app_theme',
};

export const ROUTES = {
  HOME: '/',
  STEP_1: '/step-1',
  STEP_2: '/step-2', 
  STEP_3: '/step-3',
  REVIEW: '/review',
  SUCCESS: '/success',
  ERROR: '/error'
};

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


// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', translationKey: 'fields.gender.options.male' },
  { value: 'female', translationKey: 'fields.gender.options.female' },
  { value: 'other', translationKey: 'fields.gender.options.other' },
  { value: 'prefer-not-to-say', translationKey: 'fields.gender.options.preferNotToSay' }
];

// Country Options
export const COUNTRY_OPTIONS = [
  { value: 'US', translationKey: 'fields.country.options.us' },
  { value: 'CA', translationKey: 'fields.country.options.ca' },
  { value: 'UK', translationKey: 'fields.country.options.uk' },
  { value: 'AU', translationKey: 'fields.country.options.au' },
  { value: 'IN', translationKey: 'fields.country.options.in' },
  { value: 'other', translationKey: 'fields.country.options.other' }
];

// Marital Status Options
export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', translationKey: 'fields.maritalStatus.options.single' },
  { value: 'married', translationKey: 'fields.maritalStatus.options.married' },
  { value: 'divorced', translationKey: 'fields.maritalStatus.options.divorced' },
  { value: 'widowed', translationKey: 'fields.maritalStatus.options.widowed' },
  { value: 'separated', translationKey: 'fields.maritalStatus.options.separated' }
];

// Employment Status Options
export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'employed', translationKey: 'fields.employmentStatus.options.employed' },
  { value: 'parttime', translationKey: 'fields.employmentStatus.options.parttime' },
  { value: 'unemployed', translationKey: 'fields.employmentStatus.options.unemployed' },
  { value: 'retired', translationKey: 'fields.employmentStatus.options.retired' },
  { value: 'student', translationKey: 'fields.employmentStatus.options.student' },
  { value: 'disabled', translationKey: 'fields.employmentStatus.options.disabled' },
  { value: 'other', translationKey: 'fields.employmentStatus.options.other' }
];

// Housing Status Options
export const HOUSING_STATUS_OPTIONS = [
  { value: 'owned', translationKey: 'fields.housingStatus.options.owned' },
  { value: 'rented', translationKey: 'fields.housingStatus.options.rented' },
  { value: 'livingwithfamily', translationKey: 'fields.housingStatus.options.livingwithfamily' },
  { value: 'temporaryhousing', translationKey: 'fields.housingStatus.options.temporaryhousing' },
  { value: 'homeless', translationKey: 'fields.housingStatus.options.homeless' },
  { value: 'other', translationKey: 'fields.housingStatus.options.other' }
];


export const stepRequirements = {
      1: [],
      2: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address'], // Need basic personal info
      3: ['maritalStatus', 'employmentStatus', 'monthlyIncome'], // Need family & financial info
      4: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying'] // Need step 3 data for review
    };