// pages/Step2.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Users, DollarSign } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import { getFieldsByStep } from '../config/formFields';
import WizardLayout from '../components/layouts/WizardLayout';
import FormField from '../components/molecules/FormField';
import StepNavigation from '../components/molecules/StepNavigation';
import STEPS_CONFIG from '../config/stepsConfig';
import { 
  EMPLOYMENT_STATUS_OPTIONS, 
  HOUSING_STATUS_OPTIONS, 
  MARITAL_STATUS_OPTIONS, 
  ROUTES 
} from '../config/constants';

// Step 2 component for family and financial information collection
const Step2 = () => {
  // Navigation and internationalization hooks
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Form and UI context hooks
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const { isLoading, setIsLoading } = useUIContext();

  // Get configuration for current step
  const stepConfig = STEPS_CONFIG[2];
  const stepFields = getFieldsByStep(2);

  // Form validation and state management
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    clearErrors,
    watch
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // Initialize form with existing data or empty strings
    defaultValues: stepFields.reduce((acc, field) => ({
      ...acc,
      [field]: formData[field] || ''
    }), {})
  });

  // Watch form values for real-time updates
  const watchedValues = watch();

  // Handle form submission and navigation to next step
  const handleNext = async (data) => {
    setIsLoading(true);
    try {
      updateFormData(data);
      setCurrentStep(3);
      navigate(ROUTES.STEP_3);
    } catch (error) {
      console.error('Error saving step 2 data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to previous step
  const handlePrevious = () => {
    navigate(ROUTES.STEP_1);
  };

  // Handle individual field changes with validation
  const handleFieldChange = async (fieldName, value) => {
    setValue(fieldName, value);
    updateFormData({ [fieldName]: value });
    
    // Clear field errors when user starts typing
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    
    // Trigger validation for the field
    await trigger(fieldName);
  };

  // Get marital status options with translations
  const getMaritalStatusOptions = () => 
    MARITAL_STATUS_OPTIONS.map(option => ({
      ...option,
      label: t(`fields.maritalStatus.options.${option.value}`)
    }));

  // Get employment status options with translations
  const getEmploymentStatusOptions = () => 
    EMPLOYMENT_STATUS_OPTIONS.map(option => ({
      ...option,
      label: t(`fields.employmentStatus.options.${option.value}`)
    }));

  // Get housing status options with translations
  const getHousingStatusOptions = () => 
    HOUSING_STATUS_OPTIONS.map(option => ({
      ...option,
      label: t(`fields.housingStatus.options.${option.value}`)
    }));

  // Create validation rules with translated error messages
  const getValidationRules = (fieldName) => {
    const baseRules = stepConfig.validationRules[fieldName] || {};
    const translatedRules = { ...baseRules };

    // Translate required field message
    if (translatedRules.required) {
      translatedRules.required = t('validation.required');
    }
    
    // Translate minimum value message
    if (translatedRules.min) {
      translatedRules.min = {
        ...translatedRules.min,
        message: t('validation.min', { min: translatedRules.min.value })
      };
    }
    
    // Translate maximum value message
    if (translatedRules.max) {
      translatedRules.max = {
        ...translatedRules.max,
        message: t('validation.max', { max: translatedRules.max.value })
      };
    }

    return translatedRules;
  };

  return (
    <WizardLayout
      title={t('app.title')}
      subtitle={t('common.stepOf', { current: 2, total: 3 }) + ' - ' + t('steps.familyFinancial.title')}
      maxWidth="4xl"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('steps.familyFinancial.title')}
          </h2>
          <p className="text-gray-600">
            {t('steps.familyFinancial.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
          {/* Family Information Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              {t('sections.familyInformation')}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Marital Status Field */}
              <FormField
                type="select"
                name="maritalStatus"
                label={t('fields.maritalStatus.label')}
                placeholder={t('fields.maritalStatus.placeholder')}
                required={true}
                register={register}
                rules={getValidationRules('maritalStatus')}
                errors={errors}
                options={getMaritalStatusOptions()}
                onChange={(e) => handleFieldChange('maritalStatus', e.target.value)}
              />

              {/* Number of Dependents Field */}
              <FormField
                type="number"
                name="dependents"
                label={t('fields.dependents.label')}
                placeholder={t('fields.dependents.placeholder')}
                required={true}
                register={register}
                rules={getValidationRules('dependents')}
                errors={errors}
                min={0}
                max={20}
                helpText={t('fields.dependents.helpText')}
                onChange={(e) => handleFieldChange('dependents', e.target.value)}
              />
            </div>
          </div>

          {/* Financial Information Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              {t('sections.financialInformation')}
            </h3>
            
            <div className="space-y-6">
              {/* Monthly Income Field - Full Width */}
              <FormField
                type="number"
                name="monthlyIncome"
                label={t('fields.monthlyIncome.label')}
                placeholder={t('fields.monthlyIncome.placeholder')}
                required={true}
                register={register}
                rules={getValidationRules('monthlyIncome')}
                errors={errors}
                min={0}
                step={0.01}
                helpText={t('fields.monthlyIncome.helpText')}
                onChange={(e) => handleFieldChange('monthlyIncome', e.target.value)}
              />

              {/* Employment and Housing Status - Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Employment Status Field */}
                <FormField
                  type="select"
                  name="employmentStatus"
                  label={t('fields.employmentStatus.label')}
                  placeholder={t('fields.employmentStatus.placeholder')}
                  required={true}
                  register={register}
                  rules={getValidationRules('employmentStatus')}
                  errors={errors}
                  options={getEmploymentStatusOptions()}
                  onChange={(e) => handleFieldChange('employmentStatus', e.target.value)}
                />

                {/* Housing Status Field */}
                <FormField
                  type="select"
                  name="housingStatus"
                  label={t('fields.housingStatus.label')}
                  placeholder={t('fields.housingStatus.placeholder')}
                  required={true}
                  register={register}
                  rules={getValidationRules('housingStatus')}
                  errors={errors}
                  options={getHousingStatusOptions()}
                  onChange={(e) => handleFieldChange('housingStatus', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="pt-8 border-t border-gray-200">
            <StepNavigation
              currentStep={2}
              totalSteps={3}
              onNext={handleSubmit(handleNext)}
              onPrev={handlePrevious}
              canGoNext={Object.keys(errors).length === 0}
              canGoPrev={true}
              isFirstStep={false}
              isLastStep={false}
              isLoading={isLoading}
              nextLabel={t('navigation.situationDescriptions')}
              prevLabel={t('navigation.personalInformation')}
            />
          </div>
        </form>
      </div>
    </WizardLayout>
  );
};

export default Step2;