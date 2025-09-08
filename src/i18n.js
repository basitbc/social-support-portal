import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next with plugins and configuration
i18n
  .use(Backend) // Load translations from backend
  .use(LanguageDetector) // Detect user language preferences
  .use(initReactI18next) // Connect with React
  .init({
    fallbackLng: 'en',
    debug: false,
    
    // Use language codes only (en instead of en-GB)
    load: 'languageOnly',
    
    // Supported languages
    supportedLngs: ['en', 'ar'],
    
    // Clean language codes
    cleanCode: true,

    interpolation: {
      escapeValue: false // React already handles escaping
    },

    react: {
      useSuspense: false // Disable suspense to avoid loading issues
    },

    // Language detection configuration
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      
      // Normalize detected language codes
      convertDetectedLanguage: (lng) => {
        // Map any English variant to 'en'
        if (lng.startsWith('en')) return 'en';
        // Map any Arabic variant to 'ar'  
        if (lng.startsWith('ar')) return 'ar';
        return lng;
      }
    },

    // Backend configuration for loading translation files
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;