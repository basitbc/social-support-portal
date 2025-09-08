import { useUIContext } from '../contexts/UIContext';
import { useTranslation } from 'react-i18next';

// Custom hook for language management and RTL utilities
export const useLanguage = () => {
  // UI context for language state
  const { language, changeLanguage, isRTL } = useUIContext();
  const { t, i18n } = useTranslation();

  // Get text direction based on current language
  const getTextDirection = () => isRTL ? 'rtl' : 'ltr';
  
  // Get text alignment class for RTL support
  const getAlignmentClass = () => isRTL ? 'text-right' : 'text-left';
  
  // Get flex direction for RTL layouts
  const getFlexDirection = () => isRTL ? 'flex-row-reverse' : 'flex-row';
  
  // Get space class for RTL spacing
  const getSpaceClass = () => isRTL ? 'space-x-reverse' : '';
  
  // Convert margin classes for RTL support
  const getMarginClass = (margin) => {
    if (isRTL) {
      return margin.replace('ml-', 'mr-').replace('mr-', 'ml-').replace('pl-', 'pr-').replace('pr-', 'pl-');
    }
    return margin;
  };

  // Convert border radius classes for RTL support
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

  // Get list of supported languages
  const getSupportedLanguages = () => [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
  ];

  // Get current language metadata
  const getCurrentLanguage = () => {
    return getSupportedLanguages().find(lang => lang.code === language);
  };

  // Format numbers based on current locale
  const formatNumber = (number, options = {}) => {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(number);
  };

  // Format dates based on current locale
  const formatDate = (date, options = {}) => {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };

  // Format currency based on current locale
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
    
    // Direction utilities for RTL support
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