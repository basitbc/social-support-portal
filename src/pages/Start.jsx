// Start page component - Landing page with features overview and terms acceptance
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileText, Shield, CheckCircle } from 'lucide-react';
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
  const { termsAccepted, setTermsAccepted } = useFormContext();
  const { setFieldError, clearFieldError } = useUIContext();

  // Handle application start - validate terms acceptance before navigation
  const handleStartApplication = () => {
    if (!termsAccepted) {
      setFieldError('terms', t('errors.termsRequired'));
      return;
    }
    clearFieldError('terms');
    navigate(ROUTES.STEP_1);
  };

  // Handle terms checkbox change and clear error if accepted
  const handleTermsChange = (accepted) => {
    setTermsAccepted(accepted);
    if (accepted) clearFieldError('terms');
  };

  // Feature cards data with icons and translated content
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('pages.start.title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('pages.start.subtitle')}
          </p>
          
          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Feature icon */}
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                
                {/* Feature title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                {/* Feature description */}
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Conditions Section */}
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

        {/* Start Button Section */}
        <div className="text-center">
          {/* Primary action button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartApplication}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            disabled={!termsAccepted} // Disabled until terms are accepted
            className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {t('pages.start.startButton')}
          </Button>
          
          {/* Estimated time helper text */}
          <p className="text-gray-500 text-sm mt-4">
            {t('pages.start.estimatedTime')}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Start;