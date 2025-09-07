import { useCallback } from 'react';
import { useFormContext } from '../context/FormContext';
import { useValidation } from './useValidation';

export const useStepGuard = () => {
  const { currentStep, setCurrentStep } = useFormContext();
  const { validateStep } = useValidation();

  // Check if user can navigate to a specific step
  const canNavigateToStep = useCallback((targetStep) => {
    // Can always go to step 1
    if (targetStep === 1) return true;
    
    // Can't go beyond step 3
    if (targetStep > 3) return false;
    
    // Can go back to previous steps
    if (targetStep < currentStep) return true;
    
    // To go forward, previous steps must be valid
    for (let step = 1; step < targetStep; step++) {
      const { isValid } = validateStep(step);
      if (!isValid) {
        return false;
      }
    }
    
    return true;
  }, [currentStep, validateStep]);

  // Navigate to step with validation
  const navigateToStep = useCallback((targetStep) => {
    if (!canNavigateToStep(targetStep)) {
      return false;
    }
    
    setCurrentStep(targetStep);
    return true;
  }, [canNavigateToStep, setCurrentStep]);

  // Go to next step
  const goNext = useCallback(() => {
    const nextStep = currentStep + 1;
    
    // Validate current step before proceeding
    const { isValid } = validateStep(currentStep);
    if (!isValid) {
      return false;
    }
    
    if (nextStep <= 3) {
      setCurrentStep(nextStep);
      return true;
    }
    
    return false;
  }, [currentStep, setCurrentStep, validateStep]);

  // Go to previous step
  const goPrev = useCallback(() => {
    const prevStep = currentStep - 1;
    
    if (prevStep >= 1) {
      setCurrentStep(prevStep);
      return true;
    }
    
    return false;
  }, [currentStep, setCurrentStep]);

  // Check if current step is valid
  const isCurrentStepValid = useCallback(() => {
    const { isValid } = validateStep(currentStep);
    return isValid;
  }, [currentStep, validateStep]);

  // Get next allowed step
  const getNextAllowedStep = useCallback(() => {
    for (let step = 1; step <= 3; step++) {
      if (canNavigateToStep(step)) {
        const { isValid } = validateStep(step);
        if (!isValid) {
          return step;
        }
      }
    }
    return currentStep;
  }, [canNavigateToStep, validateStep, currentStep]);

  return {
    canNavigateToStep,
    navigateToStep,
    goNext,
    goPrev,
    isCurrentStepValid,
    getNextAllowedStep,
    currentStep
  };
};