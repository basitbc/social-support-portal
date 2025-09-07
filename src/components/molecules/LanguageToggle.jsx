import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useUIContext } from '../../context/UIContext';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];

const LanguageToggle = () => {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage, isRTL } = useUIContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLanguageChange = async (langCode) => {
    if (langCode !== language) {
      try {
        await changeLanguage(langCode);
        i18n.changeLanguage(langCode);
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 
          bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 
          focus:border-primary-500 transition-colors duration-200
          ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
        aria-label={t('common.changeLanguage', 'Change Language')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-auto"
          role="listbox"
          aria-label={t('common.selectLanguage', 'Select Language')}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 flex items-center justify-between transition-colors duration-150 
                hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                ${language === lang.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}
                ${isRTL ? 'text-right flex-row-reverse space-x-reverse' : 'text-left'}`}
              role="option"
              aria-selected={language === lang.code}
            >
              <div className="flex items-center space-x-3">
                <div>
                  <div className="text-sm font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500">{lang.name}</div>
                </div>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
