import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    
    // Add language mapping
    load: 'languageOnly', // This will use 'en' instead of 'en-GB'
    
    // Supported languages
    supportedLngs: ['en', 'ar'],
    
    // Clean language codes
    cleanCode: true,

    interpolation: {
      escapeValue: false // React already does escaping
    },

    react: {
      useSuspense: false // Avoid suspense for now
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      // Map language codes
      convertDetectedLanguage: (lng) => {
        // Convert any English variant to 'en'
        if (lng.startsWith('en')) return 'en';
        // Convert any Arabic variant to 'ar'  
        if (lng.startsWith('ar')) return 'ar';
        return lng;
      }
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;