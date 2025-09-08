import { useState, useCallback } from 'react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import apiService from '../services/apiService';
import { AI_CONSTANTS } from '../config/constants';

export const useAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  const { formData } = useFormContext();
  const { language, addNotification } = useUIContext();

  const getPredefinedSuggestions = useCallback((fieldName) => {
    try {
      return apiService.getPredefinedSuggestions(fieldName, language);
    } catch (err) {
      console.error('Error getting predefined suggestions:', err);
      return [];
    }
  }, [language]);

  const generateSuggestion = useCallback(async (fieldName, userPrompt, additionalContext = {}) => {
    const messages = language === 'ar' ? AI_CONSTANTS.MESSAGES.AR : AI_CONSTANTS.MESSAGES.EN;
    
    if (isGenerating) {
      throw new Error(messages.ALREADY_GENERATING);
    }

    if (!userPrompt || !userPrompt.trim()) {
      throw new Error(messages.PROMPT_REQUIRED);
    }

    setIsGenerating(true);
    setError(null);

    try {
      const context = {
        ...formData,
        ...additionalContext
      };

      const cleanContext = Object.entries(context)
        .filter(([_, value]) => value && value.toString().trim())
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      const suggestion = await apiService.generateSuggestion(
        fieldName,
        userPrompt.trim(),
        cleanContext,
        language
      );

      addNotification({
        type: 'success',
        message: messages.SUCCESS,
        duration: AI_CONSTANTS.NOTIFICATION_DURATION.SUCCESS
      });

      return suggestion;

    } catch (err) {
      const errorMessage = err.message || messages.FAILED;
      setError(errorMessage);
      
      addNotification({
        type: 'error',
        message: errorMessage,
        duration: AI_CONSTANTS.NOTIFICATION_DURATION.ERROR
      });
      
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [formData, language, isGenerating, addNotification]);

  const retryGeneration = useCallback(async (fieldName, userPrompt, additionalContext = {}) => {
    setError(null);
    return await generateSuggestion(fieldName, userPrompt, additionalContext);
  }, [generateSuggestion]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const cancelGeneration = useCallback(() => {
    if (isGenerating) {
      apiService.cancelGeneration();
      setIsGenerating(false);
      setError(null);
      
      const messages = language === 'ar' ? AI_CONSTANTS.MESSAGES.AR : AI_CONSTANTS.MESSAGES.EN;
      addNotification({
        type: 'info',
        message: messages.CANCELLED,
        duration: AI_CONSTANTS.NOTIFICATION_DURATION.INFO
      });
    }
  }, [isGenerating, language, addNotification]);

  const getContextSummary = useCallback(() => {
    return {
      hasEmployment: !!formData.employmentStatus,
      hasIncome: !!formData.monthlyIncome,
      hasMaritalStatus: !!formData.maritalStatus,
      hasDependents: !!formData.dependents,
      hasHousing: !!formData.housingStatus,
      language,
      totalFields: Object.keys(formData).length
    };
  }, [formData, language]);

  const validateGeneration = useCallback((fieldName, userPrompt) => {
    const errors = [];
    const messages = language === 'ar' ? AI_CONSTANTS.MESSAGES.AR : AI_CONSTANTS.MESSAGES.EN;
    
    if (!fieldName) {
      errors.push(messages.FIELD_NAME_REQUIRED);
    }
    
    if (!userPrompt || !userPrompt.trim()) {
      errors.push(messages.PROMPT_REQUIRED_VALIDATION);
    }
    
    if (userPrompt && userPrompt.trim().length < AI_CONSTANTS.MIN_PROMPT_LENGTH) {
      errors.push(messages.PROMPT_TOO_SHORT);
    }
    
    if (userPrompt && userPrompt.trim().length > AI_CONSTANTS.MAX_PROMPT_LENGTH) {
      errors.push(messages.PROMPT_TOO_LONG);
    }
    
    if (isGenerating) {
      errors.push(messages.ALREADY_GENERATING);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [isGenerating, language]);

  return {
    generateSuggestion,
    getPredefinedSuggestions,
    retryGeneration,
    isGenerating,
    error,
    clearError,
    cancelGeneration,
    validateGeneration,
    getContextSummary,
    isServiceAvailable: true,
    canGenerate: !isGenerating && !error
  };
};