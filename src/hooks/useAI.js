// hooks/useAI.js
import { useState, useCallback } from 'react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import apiService from '../services/apiService';

// Custom hook for AI assistance functionality
export const useAI = () => {
  // Local state for AI operations
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  // Context hooks for form data and UI state
  const { formData } = useFormContext();
  const { language, addNotification } = useUIContext();

  // Get predefined suggestions for a field
  const getPredefinedSuggestions = useCallback((fieldName) => {
    try {
      return apiService.getPredefinedSuggestions(fieldName, language);
    } catch (err) {
      console.error('Error getting predefined suggestions:', err);
      return [];
    }
  }, [language]);

  // Generate AI suggestion from user prompt
  const generateSuggestion = useCallback(async (fieldName, userPrompt, additionalContext = {}) => {
    if (isGenerating) {
      throw new Error(language === 'ar' ? 'جاري الإنشاء بالفعل' : 'Already generating');
    }

    if (!userPrompt || !userPrompt.trim()) {
      throw new Error(language === 'ar' ? 'يرجى إدخال نص أو اختيار اقتراح' : 'Please provide a prompt or select a suggestion');
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Combine form data with additional context
      const context = {
        ...formData,
        ...additionalContext
      };

      // Filter out empty values for cleaner context
      const cleanContext = Object.entries(context)
        .filter(([_, value]) => value && value.toString().trim())
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      const suggestion = await apiService.generateSuggestion(
        fieldName,
        userPrompt.trim(),
        cleanContext,
        language
      );

      // Show success notification
      addNotification({
        type: 'success',
        message: language === 'ar' ? 'تم إنشاء الاقتراح بنجاح' : 'Suggestion generated successfully',
        duration: 3000
      });

      return suggestion;

    } catch (err) {
      const errorMessage = err.message || (language === 'ar' ? 'فشل في إنشاء الاقتراح' : 'Failed to generate suggestion');
      setError(errorMessage);
      
      // Show error notification
      addNotification({
        type: 'error',
        message: errorMessage,
        duration: 5000
      });
      
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [formData, language, isGenerating, addNotification]);

  // Retry last failed generation
  const retryGeneration = useCallback(async (fieldName, userPrompt, additionalContext = {}) => {
    setError(null);
    return await generateSuggestion(fieldName, userPrompt, additionalContext);
  }, [generateSuggestion]);

  // Clear current error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cancel current generation process
  const cancelGeneration = useCallback(() => {
    if (isGenerating) {
      apiService.cancelGeneration();
      setIsGenerating(false);
      setError(null);
      
      addNotification({
        type: 'info',
        message: language === 'ar' ? 'تم إلغاء الإنشاء' : 'Generation cancelled',
        duration: 2000
      });
    }
  }, [isGenerating, language, addNotification]);

  // Get context summary for debugging purposes
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

  // Validate if generation is possible with current inputs
  const validateGeneration = useCallback((fieldName, userPrompt) => {
    const errors = [];
    
    if (!fieldName) {
      errors.push(language === 'ar' ? 'اسم الحقل مطلوب' : 'Field name is required');
    }
    
    if (!userPrompt || !userPrompt.trim()) {
      errors.push(language === 'ar' ? 'النص أو الاقتراح مطلوب' : 'Prompt or suggestion is required');
    }
    
    if (userPrompt && userPrompt.trim().length < 5) {
      errors.push(language === 'ar' ? 'النص قصير جداً' : 'Prompt is too short');
    }
    
    if (userPrompt && userPrompt.trim().length > 500) {
      errors.push(language === 'ar' ? 'النص طويل جداً' : 'Prompt is too long');
    }
    
    if (isGenerating) {
      errors.push(language === 'ar' ? 'جاري الإنشاء بالفعل' : 'Already generating');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [isGenerating, language]);

  return {
    // Core AI functions
    generateSuggestion,
    getPredefinedSuggestions,
    retryGeneration,
    
    // State management
    isGenerating,
    error,
    
    // Utility functions
    clearError,
    cancelGeneration,
    validateGeneration,
    getContextSummary,
    
    // Service status indicators
    isServiceAvailable: true, // Could be enhanced to check service health
    canGenerate: !isGenerating && !error
  };
};