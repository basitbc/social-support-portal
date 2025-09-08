import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../config/constants';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [language, setLanguage] = useLocalStorage(STORAGE_KEYS.CURRENT_LANGUAGE, 'en');
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.CURRENT_THEME, 'light');

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      if (lng !== language) {
        setLanguage(lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n, language, setLanguage]);


  useEffect(() => {
    const isRTL = language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    const body = document.body;
    body.classList.remove('font-english', 'font-arabic');
    body.classList.add(isRTL ? 'font-arabic' : 'font-english');
  }, [language]);

  useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, '')
      .trim() + ` theme-${theme}`;
  }, [theme]);

  const clearErrors = () => setErrors({});
  
  const setFieldError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const changeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalLoadingMessage, setGlobalLoadingMessage] = useState('');

  const showGlobalLoading = (message = 'Loading...') => {
    setGlobalLoadingMessage(message);
    setGlobalLoading(true);
  };

  const hideGlobalLoading = () => {
    setGlobalLoading(false);
    setGlobalLoadingMessage('');
  };

  const [announcements, setAnnouncements] = useState([]);

  const announceToScreenReader = (message, priority = 'polite') => {
    const announcement = {
      id: Date.now().toString(),
      message,
      priority
    };

    setAnnouncements(prev => [...prev, announcement]);
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 1000);
  };

  const value = {
    isLoading,
    setIsLoading,
    globalLoading,
    globalLoadingMessage,
    showGlobalLoading,
    hideGlobalLoading,
    
    errors,
    setErrors,
    clearErrors,
    setFieldError,
    clearFieldError,
    
    language,
    changeLanguage,
    isRTL: language === 'ar',
    
    theme,
    changeTheme,
    
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    
    announcements,
    announceToScreenReader
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements.filter(a => a.priority === 'polite').map(a => (
          <div key={a.id}>{a.message}</div>
        ))}
      </div>
      
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {announcements.filter(a => a.priority === 'assertive').map(a => (
          <div key={a.id}>{a.message}</div>
        ))}
      </div>
      
      {globalLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            <span className="text-gray-700">{globalLoadingMessage}</span>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};

// Custom hook to access UI context with error handling
export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within UIProvider');
  }
  return context;
};

export default UIContext;