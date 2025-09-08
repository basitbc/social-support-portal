import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/helpers';
import Button from '../atoms/Button';
import { useFormContext } from '../../context/FormContext';

const StepNavigation = ({
  currentStep = 1,
  totalSteps = 3,
  canGoNext = true,
  canGoPrev = true,
  isFirstStep = false,
  isLastStep = false,
  
  onNext,
  onPrev,
  
  isLoading = false,
  
  nextLabel,
  prevLabel,
  
  showCancel = true,
  onCancel, 
  
  className,
  
  ...props
}) => {
  const { t } = useTranslation();
  const { resetForm, setCurrentStep } = useFormContext();
  
  const finalNextLabel = nextLabel || (isLastStep ? t('common.submit') : t('common.next'));
  const finalPrevLabel = prevLabel || t('common.previous');
  const cancelLabel = t('common.cancel');

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      resetForm();
    } else {
      resetForm(); 
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  };


  const handlePrevious = () => {
    if (onPrev) {
      onPrev();
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div 
        className={cn(
          'hidden sm:flex items-center justify-between w-full gap-6 py-6',
          className
        )} 
        {...props}
      >
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

        <div className="flex items-center gap-4">
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

      <div 
        className={cn(
          'flex sm:hidden items-center justify-between gap-3 py-4',
          className
        )} 
        {...props}
      >
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
            <div />
          )}
        </div>

        <div className="flex items-center gap-2">
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