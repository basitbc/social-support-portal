import { useUIContext } from '../context/UIContext';

export const useLocalizedForm = () => {
  const { language, isRTL, changeLanguage } = useUIContext();

  // Get localized text (basic implementation)
  const t = (key, fallback = key) => {
    const translations = {
      en: {
        'form.name': 'Full Name',
        'form.nationalId': 'National ID',
        'form.email': 'Email Address',
        'form.phone': 'Phone Number',
        'form.address': 'Address',
        'form.city': 'City',
        'form.state': 'State/Province',
        'form.country': 'Country',
        'form.gender': 'Gender',
        'form.dateOfBirth': 'Date of Birth',
        'form.maritalStatus': 'Marital Status',
        'form.dependents': 'Number of Dependents',
        'form.employmentStatus': 'Employment Status',
        'form.monthlyIncome': 'Monthly Income',
        'form.housingStatus': 'Housing Status',
        'form.financialSituation': 'Current Financial Situation',
        'form.employmentCircumstances': 'Employment Circumstances',
        'form.reasonForApplying': 'Reason for Applying',
        'button.next': 'Next',
        'button.previous': 'Previous',
        'button.save': 'Save',
        'button.submit': 'Submit',
        'validation.required': 'This field is required',
        'validation.email': 'Please enter a valid email',
        'validation.phone': 'Please enter a valid phone number'
      },
      ar: {
        'form.name': 'الاسم الكامل',
        'form.nationalId': 'رقم الهوية الوطنية',
        'form.email': 'البريد الإلكتروني',
        'form.phone': 'رقم الهاتف',
        'form.address': 'العنوان',
        'form.city': 'المدينة',
        'form.state': 'الولاية/المقاطعة',
        'form.country': 'البلد',
        'form.gender': 'الجنس',
        'form.dateOfBirth': 'تاريخ الميلاد',
        'form.maritalStatus': 'الحالة الاجتماعية',
        'form.dependents': 'عدد المعالين',
        'form.employmentStatus': 'حالة التوظيف',
        'form.monthlyIncome': 'الدخل الشهري',
        'form.housingStatus': 'حالة السكن',
        'form.financialSituation': 'الوضع المالي الحالي',
        'form.employmentCircumstances': 'ظروف التوظيف',
        'form.reasonForApplying': 'سبب التقديم',
        'button.next': 'التالي',
        'button.previous': 'السابق',
        'button.save': 'حفظ',
        'button.submit': 'إرسال',
        'validation.required': 'هذا الحقل مطلوب',
        'validation.email': 'يرجى إدخال بريد إلكتروني صحيح',
        'validation.phone': 'يرجى إدخال رقم هاتف صحيح'
      }
    };

    return translations[language]?.[key] || fallback;
  };

  // Get form direction styles
  const getFormDirection = () => ({
    dir: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left'
  });

  // Get input classes for RTL
  const getInputClasses = (baseClasses = '') => {
    const rtlClasses = isRTL ? 'text-right' : 'text-left';
    return `${baseClasses} ${rtlClasses}`.trim();
  };

  // Get flex direction for RTL
  const getFlexDirection = (direction = 'row') => {
    if (!isRTL) return direction;
    
    const rtlDirections = {
      'row': 'row-reverse',
      'row-reverse': 'row',
      'col': 'col',
      'col-reverse': 'col-reverse'
    };
    
    return rtlDirections[direction] || direction;
  };

  // Format number for current locale
  const formatNumber = (number) => {
    if (!number && number !== 0) return '';
    
    try {
      return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US').format(number);
    } catch {
      return number.toString();
    }
  };

  // Format date for current locale
  const formatDate = (date) => {
    if (!date) return '';
    
    try {
      return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US').format(new Date(date));
    } catch {
      return date.toString();
    }
  };

  // Get placeholder text direction
  const getPlaceholderDirection = () => {
    return isRTL ? 'rtl' : 'ltr';
  };

  return {
    t,
    language,
    isRTL,
    changeLanguage,
    getFormDirection,
    getInputClasses,
    getFlexDirection,
    formatNumber,
    formatDate,
    getPlaceholderDirection,
    dir: isRTL ? 'rtl' : 'ltr'
  };
};