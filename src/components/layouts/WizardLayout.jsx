import React from 'react';
import { cn } from '../../utils/helpers';
import ProgressBar from '../atoms/ProgressBar';
import { useFormContext } from '../../context/FormContext';
import { useUIContext } from '../../context/UIContext';
import { STEPS_CONFIG } from '../../config/stepsConfig';
import LanguageToggle from '../molecules/LanguageToggle';
import { useTranslation } from 'react-i18next';

const WizardLayout = ({
  children,
  title = 'Social Support Application',
  subtitle = 'Complete this form to apply for financial assistance',
  showProgress = true,
  footer,
  maxWidth = '4xl',
  className,
  ...props
}) => {
  const { currentStep, navigateToStep } = useFormContext();
  const { t, i18n } = useTranslation();
  const { language, isRTL } = useUIContext();

  // Generate steps from config
 const steps = Object.entries(STEPS_CONFIG).map(([stepNum, config]) => ({
  id: parseInt(stepNum),
  label: t(config.titleKey) || config.title,
  completed: parseInt(stepNum) < currentStep,
  accessible: true
}));

  const containerClasses = cn(
    'min-h-screen bg-gray-50',
    isRTL && 'rtl',
    className
  );

  const wrapperClasses = cn(
    'w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto',
    {
      'max-w-4xl': maxWidth === '4xl',
      'max-w-5xl': maxWidth === '5xl',
      'max-w-6xl': maxWidth === '6xl',
    }
  );

const headerClasses = cn(
  'text-center mb-8'
);

const titleClasses = cn(
  'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center'
);

const subtitleClasses = cn(
  'text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-center'
);

  return (
    <div className={containerClasses} {...props}>
      <div className={wrapperClasses}>
        {/* Header */}
        <header className={headerClasses}>
          {/* Language Toggle */}
          <div className={cn(
            'flex mb-6',
            isRTL ? 'justify-start' : 'justify-end'
          )}>
            <LanguageToggle />
          </div>

          {/* Title and Subtitle */}
          <div className="mb-6">
            <h1 className={titleClasses}>
              {title}
            </h1>
            {subtitle && (
              <p className={subtitleClasses}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Progress Bar */}
       {showProgress && (
            <div className="mb-8">
              <div className={cn(
                'max-w-3xl mx-auto',
                // Add padding to prevent overflow
                'px-4 sm:px-8 lg:px-12'
              )}>
                <ProgressBar
                  steps={steps}
                  activeStep={currentStep}
                  totalSteps={steps.length}
                  showStepLabels={true}
                  onStepClick={navigateToStep}
                />
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1" id="main-content">
          {children}
        </main>

        {/* Footer */}
        {footer && (
          <footer className="mt-12 pt-8 border-t border-gray-200">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default WizardLayout;