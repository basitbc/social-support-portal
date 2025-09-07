// pages/Step1.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import { STEPS_CONFIG } from '../config/stepsConfig';
import { getFieldsByStep } from '../config/formFields';
import WizardLayout from '../components/layouts/WizardLayout';
import FormField from '../components/molecules/FormField';
import StepNavigation from '../components/molecules/StepNavigation';
import { ROUTES } from '../config/constants';

const Step1 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const { isLoading, setIsLoading } = useUIContext();
  const stepConfig = STEPS_CONFIG[1];
  const stepFields = getFieldsByStep(1);

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
    defaultValues: stepFields.reduce((acc, field) => ({
      ...acc,
      [field]: formData[field] || ''
    }), {})
  });

  const watchedValues = watch();

  const handleNext = async (data) => {
    setIsLoading(true);
    try {
      updateFormData(data);
      setCurrentStep(2);
      navigate(ROUTES.STEP_2);
    } catch (error) {
      console.error('Error saving step 1 data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate(ROUTES.HOME);
  };

  const handleFieldChange = async (fieldName, value) => {
    setValue(fieldName, value);
    updateFormData({ [fieldName]: value });
    
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    
    await trigger(fieldName);
  };

  // Get gender options with translations
  const getGenderOptions = () => [
    { value: 'male', label: t('fields.gender.options.male') },
    { value: 'female', label: t('fields.gender.options.female') },
    { value: 'other', label: t('fields.gender.options.other') },
    { value: 'prefer-not-to-say', label: t('fields.gender.options.preferNotToSay') }
  ];

  // Get country options with translations
  const getCountryOptions = () => [
    { value: 'US', label: t('fields.country.options.us') },
    { value: 'CA', label: t('fields.country.options.ca') },
    { value: 'UK', label: t('fields.country.options.uk') },
    { value: 'AU', label: t('fields.country.options.au') },
    { value: 'IN', label: t('fields.country.options.in') },
    { value: 'other', label: t('fields.country.options.other') }
  ];

  // Create validation rules with translated messages
  const getValidationRules = (fieldName) => {
    const baseRules = stepConfig.validationRules[fieldName] || {};
    const translatedRules = { ...baseRules };

    if (translatedRules.required) {
      translatedRules.required = t('validation.required');
    }
    if (translatedRules.pattern && fieldName === 'email') {
      translatedRules.pattern = {
        ...translatedRules.pattern,
        message: t('validation.email')
      };
    }
    if (translatedRules.pattern && fieldName === 'phone') {
      translatedRules.pattern = {
        ...translatedRules.pattern,
        message: t('validation.phone')
      };
    }
    if (translatedRules.minLength) {
      translatedRules.minLength = {
        ...translatedRules.minLength,
        message: t('validation.minLength', { min: translatedRules.minLength.value })
      };
    }
    if (translatedRules.maxLength) {
      translatedRules.maxLength = {
        ...translatedRules.maxLength,
        message: t('validation.maxLength', { max: translatedRules.maxLength.value })
      };
    }

    return translatedRules;
  };

  return (
    <WizardLayout
      title={t('app.title')}
      subtitle={t('common.stepOf', { current: 1, total: 3 }) + ' - ' + t('steps.personalInfo.title')}
      maxWidth="4xl"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('steps.personalInfo.title')}
          </h2>
          <p className="text-gray-600">
            {t('steps.personalInfo.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
          {/* Name and National ID */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              type="text"
              name="name"
              label={t('fields.name.label')}
              placeholder={t('fields.name.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('name')}
              errors={errors}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <FormField
              type="text"
              name="nationalId"
              label={t('fields.nationalId.label')}
              placeholder={t('fields.nationalId.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('nationalId')}
              errors={errors}
              onChange={(e) => handleFieldChange('nationalId', e.target.value)}
            />
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              type="date"
              name="dateOfBirth"
              label={t('fields.dateOfBirth.label')}
              required={true}
              register={register}
              rules={getValidationRules('dateOfBirth')}
              errors={errors}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
            />
            <FormField
              type="select"
              name="gender"
              label={t('fields.gender.label')}
              placeholder={t('fields.gender.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('gender')}
              errors={errors}
              options={getGenderOptions()}
              onChange={(e) => handleFieldChange('gender', e.target.value)}
            />
          </div>

          {/* Address */}
          <FormField
            type="textarea"
            name="address"
            label={t('fields.address.label')}
            placeholder={t('fields.address.placeholder')}
            required={true}
            register={register}
            rules={getValidationRules('address')}
            errors={errors}
            rows={3}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />

          {/* City, State, Country */}
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              type="text"
              name="city"
              label={t('fields.city.label')}
              placeholder={t('fields.city.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('city')}
              errors={errors}
              onChange={(e) => handleFieldChange('city', e.target.value)}
            />
            <FormField
              type="text"
              name="state"
              label={t('fields.state.label')}
              placeholder={t('fields.state.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('state')}
              errors={errors}
              onChange={(e) => handleFieldChange('state', e.target.value)}
            />
            <FormField
              type="select"
              name="country"
              label={t('fields.country.label')}
              placeholder={t('fields.country.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('country')}
              errors={errors}
              options={getCountryOptions()}
              onChange={(e) => handleFieldChange('country', e.target.value)}
            />
          </div>

          {/* Phone and Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              type="tel"
              name="phone"
              label={t('fields.phone.label')}
              placeholder={t('fields.phone.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('phone')}
              errors={errors}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
            />
            <FormField
              type="email"
              name="email"
              label={t('fields.email.label')}
              placeholder={t('fields.email.placeholder')}
              required={true}
              register={register}
              rules={getValidationRules('email')}
              errors={errors}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          </div>

          {/* Navigation */}
          <div className="pt-8 border-t border-gray-200">
            <StepNavigation
              currentStep={1}
              totalSteps={3}
              onNext={handleSubmit(handleNext)}
              onPrev={handlePrevious}
              canGoNext={Object.keys(errors).length === 0}
              canGoPrev={true}
              isFirstStep={true}
              isLastStep={false}
              isLoading={isLoading}
              nextLabel={t('navigation.familyFinancialInformation', { defaultValue: 'Family & Financial Information' })}
              prevLabel={t('navigation.personalInformation', { defaultValue: 'Personal Information' })}
            />
          </div>
        </form>
      </div>
    </WizardLayout>
  );
};

export default Step1;