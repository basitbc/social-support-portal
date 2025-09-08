import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../config/constants';

// Create React context for UI state management
const UIContext = createContext();

// UI provider component managing global UI state, theme, language, and notifications
export const UIProvider = ({ children }) => {
  const { i18n } = useTranslation();
  
  // Loading states (not persisted)
  const [isLoading, setIsLoading] = useState(false);

  // Error management (not persisted)
  const [errors, setErrors] = useState({});
  
  // Language state - persisted to localStorage
  const [language, setLanguage] = useLocalStorage(STORAGE_KEYS.CURRENT_LANGUAGE, 'en');
  
  // Theme state - persisted to localStorage
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.CURRENT_THEME, 'light');

  // Sync i18next with localStorage on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, []);

  // Listen to i18next language changes and sync to localStorage
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      if (lng !== language) {
        setLanguage(lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n, language, setLanguage]);

  // Update document attributes when language changes
  useEffect(() => {
    const isRTL = language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update body class for font switching
    const body = document.body;
    body.classList.remove('font-english', 'font-arabic');
    body.classList.add(isRTL ? 'font-arabic' : 'font-english');
  }, [language]);

  // Update theme classes on document element
  useEffect(() => {
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, '')
      .trim() + ` theme-${theme}`;
  }, [theme]);

  // Clear all form errors
  const clearErrors = () => setErrors({});
  
  // Set error for specific field
  const setFieldError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  // Clear error for specific field
  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Change language via i18next (listener handles localStorage sync)
  const changeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Update theme state
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Notification system (not persisted)
  const [notifications, setNotifications] = useState([]);

  // Add notification with auto-removal
  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  // Remove specific notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Global loading overlay (not persisted)
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalLoadingMessage, setGlobalLoadingMessage] = useState('');

  // Show global loading overlay with message
  const showGlobalLoading = (message = 'Loading...') => {
    setGlobalLoadingMessage(message);
    setGlobalLoading(true);
  };

  // Hide global loading overlay
  const hideGlobalLoading = () => {
    setGlobalLoading(false);
    setGlobalLoadingMessage('');
  };

  // Accessibility helpers (not persisted)
  const [announcements, setAnnouncements] = useState([]);

  // Announce message to screen readers
  const announceToScreenReader = (message, priority = 'polite') => {
    const announcement = {
      id: Date.now().toString(),
      message,
      priority
    };

    setAnnouncements(prev => [...prev, announcement]);

    // Remove announcement after 1 second
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 1000);
  };

  // Context value object with all UI state and methods
  const value = {
    // Loading states
    isLoading,
    setIsLoading,
    globalLoading,
    globalLoadingMessage,
    showGlobalLoading,
    hideGlobalLoading,
    
    // Error management
    errors,
    setErrors,
    clearErrors,
    setFieldError,
    clearFieldError,
    
    // Language & RTL
    language,
    changeLanguage,
    isRTL: language === 'ar',
    
    // Theme
    theme,
    changeTheme,
    
    // Notifications
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    
    // Accessibility
    announcements,
    announceToScreenReader
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      
      {/* Screen reader announcement regions */}
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
      
      {/* Global loading overlay */}
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