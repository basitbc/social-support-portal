import { useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';

const STORAGE_KEY = 'social_support_form';
const AUTO_SAVE_DELAY = 2000; // 2 seconds

export const useFormPersist = () => {
  const { formData, currentStep, updateFormData, setCurrentStep } = useFormContext();
  const { setSaving } = useUIContext();

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { formData: savedData, currentStep: savedStep } = JSON.parse(saved);
        if (savedData) {
          updateFormData(savedData);
        }
        if (savedStep) {
          setCurrentStep(savedStep);
        }
      }
    } catch (error) {
      console.error('Failed to load form data:', error);
    }
  }, [updateFormData, setCurrentStep]);

  // Auto-save to localStorage when data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        setSaving(true);
        const dataToSave = {
          formData,
          currentStep,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error('Failed to save form data:', error);
      } finally {
        setSaving(false);
      }
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [formData, currentStep, setSaving]);

  // Manual save function
  const saveNow = () => {
    try {
      setSaving(true);
      const dataToSave = {
        formData,
        currentStep,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error('Failed to save form data:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Clear saved data
  const clearSaved = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear saved data:', error);
      return false;
    }
  };

  // Check if there's saved data
  const hasSavedData = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  };

  return {
    saveNow,
    clearSaved,
    hasSavedData
  };
};