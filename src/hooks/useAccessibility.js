import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for accessibility features including focus management and screen reader announcements
 * Follows WCAG 2.1 guidelines for keyboard navigation and assistive technology support
 */
const useAccessibility = () => {
  const { t } = useTranslation();
  const announcementRef = useRef(null);
  const focusTimeoutRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Create live region for announcements if it doesn't exist
  useEffect(() => {
    if (!announcementRef.current) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('id', 'accessibility-announcements');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
      announcementRef.current = liveRegion;
    }

    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   * @param {'polite'|'assertive'} priority - Priority level for announcement
   */
  const announce = useCallback((message, priority = 'polite') => {
    if (!announcementRef.current || !message) return;

    // Set priority level
    announcementRef.current.setAttribute('aria-live', priority);
    
    // Clear previous message
    announcementRef.current.textContent = '';
    
    // Add new message with slight delay to ensure it's announced
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = message;
      }
    }, 100);
  }, []);

  /**
   * Focus on element by selector or ref with error handling
   * @param {string|HTMLElement|React.RefObject} target - Target to focus
   * @param {number} delay - Delay before focusing (for DOM updates)
   */
  const focusElement = useCallback((target, delay = 100) => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }

    focusTimeoutRef.current = setTimeout(() => {
      let element = null;

      if (typeof target === 'string') {
        element = document.querySelector(target);
      } else if (target?.current) {
        element = target.current;
      } else if (target instanceof HTMLElement) {
        element = target;
      }

      if (element && typeof element.focus === 'function') {
        try {
          element.focus({ preventScroll: false });
        } catch (error) {
          console.warn('Failed to focus element:', error);
        }
      }
    }, delay);
  }, []);

  /**
   * Focus on the first error field in a form
   * @param {string} formSelector - CSS selector for the form container
   */
  const focusFirstError = useCallback((formSelector = 'form') => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    // Look for various error indicators
    const errorSelectors = [
      '[aria-invalid="true"]',
      '.error',
      '[data-error="true"]',
      '.field-error input',
      '.field-error textarea',
      '.field-error select'
    ];

    for (const selector of errorSelectors) {
      const errorElement = form.querySelector(selector);
      if (errorElement) {
        focusElement(errorElement);
        return;
      }
    }
  }, [focusElement]);

  /**
   * Manage focus for step navigation
   * @param {number} currentStep - Current step number
   * @param {number} totalSteps - Total number of steps
   * @param {string} direction - 'next' or 'previous'
   */
  const handleStepFocus = useCallback((currentStep, totalSteps, direction = 'next') => {
    // Announce step change
    const stepMessage = t('accessibility.stepChanged', {
      current: currentStep,
      total: totalSteps,
      defaultValue: `Step ${currentStep} of ${totalSteps}`
    });
    announce(stepMessage);

    // Focus on step heading or main content
    const stepHeading = document.querySelector('h1, h2, [role="heading"]');
    if (stepHeading) {
      focusElement(stepHeading);
    } else {
      // Fallback to main content area
      focusElement('main, [role="main"], .step-content');
    }
  }, [announce, focusElement, t]);

  /**
   * Save current focus to restore later
   */
  const saveFocus = useCallback(() => {
    lastFocusedElement.current = document.activeElement;
  }, []);

  /**
   * Restore previously saved focus
   */
  const restoreFocus = useCallback(() => {
    if (lastFocusedElement.current && typeof lastFocusedElement.current.focus === 'function') {
      try {
        lastFocusedElement.current.focus();
      } catch (error) {
        console.warn('Failed to restore focus:', error);
      }
    }
  }, []);

  /**
   * Trap focus within a container (for modals, dialogs)
   * @param {HTMLElement} container - Container element to trap focus within
   * @returns {Function} Cleanup function to remove event listeners
   */
  const trapFocus = useCallback((container) => {
    if (!container) return () => {};

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        // Let parent components handle escape
        e.stopPropagation();
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);

    // Focus first element initially
    if (firstElement) {
      firstElement.focus();
    }

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  /**
   * Announce form validation errors
   * @param {Object} errors - Form errors object
   * @param {string} formName - Name of the form for context
   */
  const announceFormErrors = useCallback((errors, formName = '') => {
    if (!errors || Object.keys(errors).length === 0) return;

    const errorCount = Object.keys(errors).length;
    const message = t('accessibility.formErrors', {
      count: errorCount,
      formName,
      defaultValue: `${errorCount} error${errorCount > 1 ? 's' : ''} found${formName ? ` in ${formName}` : ''}`
    });

    announce(message, 'assertive');
  }, [announce, t]);

  /**
   * Announce loading states
   * @param {boolean} isLoading - Loading state
   * @param {string} context - Context of what's loading
   */
  const announceLoading = useCallback((isLoading, context = '') => {
    if (isLoading) {
      const message = t('accessibility.loading', {
        context,
        defaultValue: `Loading${context ? ` ${context}` : ''}...`
      });
      announce(message, 'polite');
    } else {
      const message = t('accessibility.loadingComplete', {
        context,
        defaultValue: `${context || 'Content'} loaded`
      });
      announce(message, 'polite');
    }
  }, [announce, t]);

  /**
   * Set up skip links for keyboard navigation
   */
  const setupSkipLinks = useCallback(() => {
    // Skip link is typically handled in HTML, but we can ensure focus behavior
    const skipLinks = document.querySelectorAll('[href^="#skip-"]');
    
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.addEventListener('blur', () => {
            target.removeAttribute('tabindex');
          }, { once: true });
        }
      });
    });
  }, []);

  /**
   * Check if reduced motion is preferred
   */
  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return {
    // Core functions
    announce,
    focusElement,
    focusFirstError,
    
    // Step navigation
    handleStepFocus,
    
    // Focus management
    saveFocus,
    restoreFocus,
    trapFocus,
    
    // Form accessibility
    announceFormErrors,
    
    // Loading states
    announceLoading,
    
    // Setup functions
    setupSkipLinks,
    
    // Utility
    prefersReducedMotion
  };
};

export default useAccessibility;