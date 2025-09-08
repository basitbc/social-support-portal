// pages/Review.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Edit, Check, Send } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import { STEPS_CONFIG } from '../config/stepsConfig';
import { getFieldsByStep } from '../config/formFields';
import WizardLayout from '../components/layouts/WizardLayout';
import StepNavigation from '../components/molecules/StepNavigation';
import Button from '../components/atoms/Button';
import { ROUTES } from '../config/constants';

const Review = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, setIsSubmitted, setSubmissionData, clearFormData } = useFormContext();
  const { isLoading, setIsLoading, setFieldError } = useUIContext();

  // Generate review sections from config with translations
  const reviewSections = Object.entries(STEPS_CONFIG).map(([stepNum, config]) => ({
    id: config.id,
    title: t(config.titleKey) || config.title,
    route: config.route,
    fields: getFieldsByStep(parseInt(stepNum)).map(fieldName => ({
      name: fieldName,
      label: getFieldLabel(fieldName),
      value: formatFieldValue(fieldName, formData[fieldName]),
      isTextArea: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying'].includes(fieldName)
    }))
  }));

  const handleEdit = (route) => {
    navigate(route);
  };

  const handlePrevious = () => {
    navigate(ROUTES.STEP_3);
  };

  const handleSubmit = async () => {
    // Basic validation
    const requiredFields = Object.values(STEPS_CONFIG)
      .flatMap(step => getFieldsByStep(parseInt(Object.keys(STEPS_CONFIG).find(key => STEPS_CONFIG[key] === step))));

    const missingFields = requiredFields.filter(field => 
      !formData[field] || formData[field].toString().trim() === ''
    );
    
    if (missingFields.length > 0) {
      setFieldError('submission', t('validation.incompleteFields'));
      return;
    }

    setIsLoading(true);

    try {
      // API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const referenceNumber = `SSA-${Date.now().toString().slice(-8)}`;
      const submissionData = {
        referenceNumber,
        submittedAt: new Date().toISOString(),
        formData: { ...formData }
      };
      
      setSubmissionData(submissionData);
      setIsSubmitted(true);
      navigate(ROUTES.SUCCESS);
      
    } catch (error) {
      console.error('Submission error:', error);
      setFieldError('submission', t('validation.submissionFailed'));
      navigate(ROUTES.ERROR, { state: { error: { type: 'submission_failed', message: error.message } } });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get translated field labels
  function getFieldLabel(fieldName) {
    return t(`fields.${fieldName}.label`, { defaultValue: fieldName });
  }

  // Helper function to format field values with translations
  function formatFieldValue(fieldName, value) {
    if (!value) return null;

    // Handle select field values that need translation
    const selectFields = {
      gender: 'fields.gender.options',
      maritalStatus: 'fields.maritalStatus.options',
      employmentStatus: 'fields.employmentStatus.options',
      housingStatus: 'fields.housingStatus.options',
      country: 'fields.country.options'
    };

    if (selectFields[fieldName]) {
      const translatedValue = t(`${selectFields[fieldName]}.${value}`, { defaultValue: value });
      return translatedValue;
    }

    // Format currency for monthlyIncome
    if (fieldName === 'monthlyIncome') {
      const number = parseFloat(value);
      return new Intl.NumberFormat(t('common.locale', { defaultValue: 'en-US' }), {
        style: 'currency',
        currency: t('common.currency', { defaultValue: 'USD' })
      }).format(number);
    }

    // Format date for dateOfBirth
    if (fieldName === 'dateOfBirth') {
      const date = new Date(value);
      return new Intl.DateTimeFormat(t('common.locale', { defaultValue: 'en-US' })).format(date);
    }

    return value;
  }

  // Calculate completion
  const totalFields = reviewSections.reduce((total, section) => total + section.fields.length, 0);
  const completedFields = reviewSections.reduce((total, section) => 
    total + section.fields.filter(field => field.value && field.value.toString().trim()).length, 0
  );
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <WizardLayout
      title={t('app.title')}
      subtitle={t('pages.review.subtitle')}
      maxWidth="5xl"
    >
      <div className="space-y-8">
        {/* Completion Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('pages.review.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('pages.review.description')}
            </p>
          </div>
        </div>

        {/* Review Sections */}
        <div className="space-y-6">
          {reviewSections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(section.route)}
                    icon={<Edit className="w-4 h-4" />}
                    className="hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700"
                  >
                    {t('common.edit')}
                  </Button>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div key={field.name} className={field.isTextArea ? 'md:col-span-2' : ''}>
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      {field.isTextArea ? (
                        <div className="bg-gray-50 rounded-lg p-3 min-h-[100px] mt-1">
                          <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                            {field.value || (
                              <span className="text-gray-400 italic">
                                {t('pages.review.notProvided')}
                              </span>
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-900 font-medium mt-1">
                          {field.value || (
                            <span className="text-gray-400 italic">
                              {t('pages.review.notProvided')}
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('pages.review.readyToSubmit')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('pages.review.certificationText')}
            </p>
            
          </div>

          <StepNavigation
            currentStep={4}
            totalSteps={4}
            onNext={handleSubmit}
            onPrev={handlePrevious}
            canGoNext={completionPercentage === 100}
            canGoPrev={true}
            isFirstStep={false}
            isLastStep={true}
            isLoading={isLoading}
            nextLabel={t('pages.review.submitApplication')}
            prevLabel={t('navigation.situationDescriptions')}
          />
        </div>
      </div>
    </WizardLayout>
  );
};

export default Review;