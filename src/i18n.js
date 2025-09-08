import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Load translations from backend
  .use(LanguageDetector) // Detect user language preferences
  .use(initReactI18next) 
  .init({
    fallbackLng: 'en',
    debug: false,
    
    // Use language codes only (en instead of en-GB)
    load: 'languageOnly',
    
    supportedLngs: ['en', 'ar'],
    cleanCode: true,
    interpolation: {
      escapeValue: false 
    },

    react: {
      useSuspense: false // Disable suspense
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      
      convertDetectedLanguage: (lng) => {
        if (lng.startsWith('en')) return 'en';
        if (lng.startsWith('ar')) return 'ar';
        return lng;
      }
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;