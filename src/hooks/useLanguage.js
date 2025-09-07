import { useUIContext } from '../contexts/UIContext';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for language management
 * Provides easy access to language state and utilities
 */
export const useLanguage = () => {
  const { language, changeLanguage, isRTL } = useUIContext();
  const { t, i18n } = useTranslation();

  const getTextDirection = () => isRTL ? 'rtl' : 'ltr';
  
  const getAlignmentClass = () => isRTL ? 'text-right' : 'text-left';
  
  const getFlexDirection = () => isRTL ? 'flex-row-reverse' : 'flex-row';
  
  const getSpaceClass = () => isRTL ? 'space-x-reverse' : '';
  
  const getMarginClass = (margin) => {
    if (isRTL) {
      return margin.replace('ml-', 'mr-').replace('mr-', 'ml-').replace('pl-', 'pr-').replace('pr-', 'pl-');
    }
    return margin;
  };

  const getBorderRadiusClass = (radius) => {
    if (isRTL) {
      return radius
        .replace('rounded-l-', 'rounded-r-')
        .replace('rounded-r-', 'rounded-l-')
        .replace('rounded-tl-', 'rounded-tr-')
        .replace('rounded-tr-', 'rounded-tl-')
        .replace('rounded-bl-', 'rounded-br-')
        .replace('rounded-br-', 'rounded-bl-');
    }
    return radius;
  };

  const getSupportedLanguages = () => [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
  ];

  const getCurrentLanguage = () => {
    return getSupportedLanguages().find(lang => lang.code === language);
  };

  const formatNumber = (number, options = {}) => {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(number);
  };

  const formatDate = (date, options = {}) => {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };

  const formatCurrency = (amount, currency = 'USD') => {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return {
    // Basic language info
    language,
    isRTL,
    changeLanguage,
    
    // Translation function
    t,
    i18n,
    
    // Direction utilities
    getTextDirection,
    getAlignmentClass,
    getFlexDirection,
    getSpaceClass,
    getMarginClass,
    getBorderRadiusClass,
    
    // Language metadata
    getSupportedLanguages,
    getCurrentLanguage,
    
    // Formatting utilities
    formatNumber,
    formatDate,
    formatCurrency
  };
};

export default useLanguage;