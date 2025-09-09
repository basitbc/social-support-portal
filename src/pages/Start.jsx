// Start page component - Landing page with features overview and terms acceptance
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileText, Shield, CheckCircle, RotateCcw, Plus } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import MainLayout from '../components/layouts/MainLayout';
import TermsBox from '../components/organisms/TermsBox';
import LanguageToggle from '../components/molecules/LanguageToggle';
import Button from '../components/atoms/Button';
import { ROUTES } from '../config/constants';

const Start = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    formData, 
    termsAccepted, 
    setTermsAccepted, 
    clearFormData, 
    navigateToStep,
    hasRequiredDataForStep,
    handleReset
  } = useFormContext();
  const { setFieldError, clearFieldError } = useUIContext();

  // Check if there's existing form data (excluding empty initial values)
  const hasPreviousData = Object.keys(formData).some(key => 
    formData[key] && String(formData[key]).trim() !== ''
  );

  const handleStartNewApplication = () => {
    if (!termsAccepted) {
      setFieldError('terms', t('errors.termsRequired'));
      return;
    }
    clearFieldError('terms');
    
    // Clear previous form data but keep terms accepted
    handleReset();
    navigate(ROUTES.PERSONAL_INFO);
  };

  const handleResumeApplication = () => {
    if (!termsAccepted) {
      setFieldError('terms', t('errors.termsRequired'));
      return;
    }
    clearFieldError('terms');
    
    // Navigate to the appropriate step based on completed data
    let targetStep = 1;
    
    // Check which steps have been completed
    if (hasRequiredDataForStep(2)) {
      targetStep = 2;
      if (hasRequiredDataForStep(3)) {
        targetStep = 3;
      }
    }
    
    navigateToStep(targetStep);
  };

  const handleTermsChange = (accepted) => {
    setTermsAccepted(accepted);
    if (accepted) clearFieldError('terms');
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-primary-600" />,
      title: t('pages.start.features.simpleApplication.title'),
      description: t('pages.start.features.simpleApplication.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: t('pages.start.features.securePrivate.title'),
      description: t('pages.start.features.securePrivate.description')
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary-600" />,
      title: t('pages.start.features.quickProcessing.title'),
      description: t('pages.start.features.quickProcessing.description')
    }
  ];

  return (
    <MainLayout
      headerActions={<LanguageToggle />}
      maxWidth="4xl"
      className="bg-gradient-to-br from-primary-50 to-blue-50"
    >
      <div className="py-12 sm:py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('pages.start.title')}
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('pages.start.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <TermsBox
            title={t('pages.start.termsTitle')}
            accepted={termsAccepted}
            onAcceptedChange={handleTermsChange}
            required={true}
            collapsible={true}
            defaultExpanded={false}
          />
        </div>

        <div className="text-center">
          {hasPreviousData ? (
            // Show both resume and new application buttons when previous data exists
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleResumeApplication}
                iconPosition="left"
                disabled={!termsAccepted}
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
              >
                {t('pages.start.resumeButton', 'Resume Previous Application')}
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartNewApplication}
                iconPosition="left"
                disabled={!termsAccepted}
                className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {t('pages.start.startNewButton', 'Start New Application')}
              </Button>
            </div>
          ) : (
            // Show single start button when no previous data exists
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartNewApplication}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              disabled={!termsAccepted}
              className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {t('pages.start.startButton')}
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Start;