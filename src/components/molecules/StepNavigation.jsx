import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/helpers';
import Button from '../atoms/Button';
import { useFormContext } from '../../context/FormContext';

const StepNavigation = ({
  // Navigation state
  currentStep = 1,
  totalSteps = 3,
  canGoNext = true,
  canGoPrev = true,
  isFirstStep = false,
  isLastStep = false,
  
  // Event handlers
  onNext,
  onPrev,
  
  // Loading state
  isLoading = false,
  
  // Button labels
  nextLabel,
  prevLabel,
  
  // Cancel options
  showCancel = true,
  onCancel, // Optional custom cancel handler
  
  // Styling
  className,
  
  ...props
}) => {
  const { t } = useTranslation();
  const { resetForm, setCurrentStep } = useFormContext();
  
  // Auto-determine labels based on step with translations
  const finalNextLabel = nextLabel || (isLastStep ? t('common.submit') : t('common.next'));
  const finalPrevLabel = prevLabel || t('common.previous');
  const cancelLabel = t('common.cancel');

  // Handle cancel action
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      resetForm();
    } else {
      resetForm(); // This clears form data and resets current step to 1
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  };

  // Handle previous step with context update
  const handlePrevious = () => {
    if (onPrev) {
      onPrev();
    }
    // Update the current step in context when going back
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Desktop Layout */}
      <div 
        className={cn(
          'hidden sm:flex items-center justify-between w-full gap-6 py-6',
          className
        )} 
        {...props}
      >
        {/* Left side - Previous Button */}
        <div className="flex items-center">
          {!isFirstStep && onPrev ? (
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrevious}
              disabled={!canGoPrev || isLoading}
              icon={<ChevronLeft className="w-4 h-4" />}
              iconPosition="left"
              className="flex items-center gap-2 min-w-fit"
              aria-label="Go to previous step"
            >
              {finalPrevLabel}
            </Button>
          ) : null}
        </div>

        {/* Right side - Cancel and Next/Submit Button */}
        <div className="flex items-center gap-4">
          {/* Cancel Button */}
          {showCancel && (
            <Button
              variant="outline"
              size="md"
              onClick={handleCancel}
              disabled={isLoading}
              icon={<X className="w-4 h-4" />}
              iconPosition="left"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-300 transition-colors min-w-fit"
              aria-label="Cancel and return to home"
            >
              {cancelLabel}
            </Button>
          )}

          {/* Next/Submit Button */}
          {onNext && (
            <Button
              variant="primary"
              size="md"
              onClick={onNext}
              disabled={!canGoNext || isLoading}
              loading={isLoading}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
              className="flex items-center gap-2 min-w-fit"
              aria-label={isLastStep ? "Submit form" : "Go to next step"}
            >
              {finalNextLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div 
        className={cn(
          'flex sm:hidden items-center justify-between gap-3 py-4',
          className
        )} 
        {...props}
      >
        {/* Left Side - Previous Button */}
        <div className="flex items-center">
          {!isFirstStep && onPrev ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevious}
              disabled={!canGoPrev || isLoading}
              icon={<ChevronLeft className="w-4 h-4" />}
              iconPosition="left"
              className="flex items-center gap-1"
              aria-label="Go to previous step"
            >
              {t('common.back')}
            </Button>
          ) : (
            <div /> // Empty div to maintain layout
          )}
        </div>

        {/* Right Side - Cancel and Next/Submit */}
        <div className="flex items-center gap-2">
          {/* Cancel Icon Button (Mobile) */}
          {showCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
              icon={<X className="w-4 h-4" />}
              className="flex items-center justify-center text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-300 transition-colors w-9 h-9 p-0"
              aria-label="Cancel and return to home"
            />
          )}

          {/* Next/Submit Button */}
          {onNext && (
            <Button
              variant="primary"
              size="sm"
              onClick={onNext}
              disabled={!canGoNext || isLoading}
              loading={isLoading}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
              className="flex items-center gap-1"
              aria-label={isLastStep ? "Submit form" : "Go to next step"}
            >
              {isLastStep ? t('common.submit') : t('common.next')}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default StepNavigation;