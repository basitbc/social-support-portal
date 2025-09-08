import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Edit3, Sparkles } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useUIContext } from '../context/UIContext';
import { useAI } from '../hooks/useAI';
import { STEPS_CONFIG } from '../config/stepsConfig';
import { getFieldsByStep, getAIFields } from '../config/formFields';
import WizardLayout from '../components/layouts/WizardLayout';
import AISuggestionModal from '../components/organisms/AISuggestionModal';
import FormField from '../components/molecules/FormField';
import StepNavigation from '../components/molecules/StepNavigation';
import Button from '../components/atoms/Button';
import { ROUTES } from '../config/constants';

const Step3 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const { formData, updateFormData } = useFormContext();
  const { isLoading, setIsLoading, language, addNotification } = useUIContext();
  
  const { 
    generateSuggestion, 
    getPredefinedSuggestions, 
    isGenerating, 
    error: aiError,
    clearError,
    validateGeneration
  } = useAI();

  const stepConfig = STEPS_CONFIG[3];
  const stepFields = getFieldsByStep(3);
  const aiFields = getAIFields();

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentFieldLabel, setCurrentFieldLabel] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
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

  // Watch form values for real-time updates
  const watchedValues = watch();

  const handleNext = async (data) => {
    setIsLoading(true);
    try {
      updateFormData(data);
      
      addNotification({
        type: 'success',
        message: t('notifications.step3Saved'),
        duration: 3000
      });
      
      navigate(ROUTES.REVIEW);
    } catch (error) {
      console.error('Error saving step 3 data:', error);
      addNotification({
        type: 'error',
        message: t('notifications.saveFailed'),
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    const currentData = getValues();
    updateFormData(currentData);
    navigate(ROUTES.STEP_2);
  };

  const handleFieldChange = useCallback(async (fieldName, value) => {
    setValue(fieldName, value);
    updateFormData({ [fieldName]: value });
    
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    
    await trigger(fieldName);
  }, [setValue, updateFormData, errors, clearErrors, trigger]);

  const handleAIHelp = useCallback((fieldName) => {
    const fieldConfig = aiFields.find(f => f.name === fieldName);
    if (!fieldConfig) {
      console.error('Field configuration not found:', fieldName);
      return;
    }

    setCurrentField(fieldName);
    setCurrentFieldLabel(fieldConfig.config.label);
    setAiModalOpen(true);
    
    clearError();
  }, [aiFields, clearError]);

  // Generate AI suggestion from user prompt
  const handleGenerateFromInput = useCallback(async (userPrompt) => {
    if (!currentField) {
      throw new Error(t('errors.noFieldSelected'));
    }

    // Validate generation request
    const validation = validateGeneration(currentField, userPrompt);
    if (!validation.isValid) {
      throw new Error(validation.errors[0]);
    }

    try {
      // Generate suggestion using AI
      const suggestion = await generateSuggestion(currentField, userPrompt, {
        originalText: getValues(currentField)
      });
      
      return suggestion;
    } catch (error) {
      console.error('AI generation error:', error);
      throw error;
    }
  }, [currentField, generateSuggestion, validateGeneration, getValues, t]);

  // Accept AI suggestion and update form
  const handleAIAccept = useCallback(async (suggestion) => {
    if (!currentField || !suggestion) {
      return;
    }

    try {
      setValue(currentField, suggestion);
      updateFormData({ [currentField]: suggestion });
      
      if (errors[currentField]) {
        clearErrors(currentField);
      }
      await trigger(currentField);
      
      addNotification({
        type: 'success',
        message: t('notifications.suggestionAccepted'),
        duration: 2000
      });
      
      // Close modal
      setAiModalOpen(false);
      
    } catch (error) {
      console.error('Error accepting suggestion:', error);
      addNotification({
        type: 'error',
        message: t('notifications.suggestionAcceptFailed'),
        duration: 3000
      });
    }
  }, [currentField, setValue, updateFormData, errors, clearErrors, trigger, addNotification, t]);

  const handleAIDiscard = useCallback(() => {
    setAiModalOpen(false);
    setCurrentField('');
    setCurrentFieldLabel('');
    clearError();
  }, [clearError]);

  const getFieldConfig = useCallback((fieldName) => {
    const baseConfig = aiFields.find(f => f.name === fieldName)?.config || {};
    return {
      ...baseConfig,
      label: t(`fields.${fieldName}.label`),
      placeholder: t(`fields.${fieldName}.placeholder`)
    };
  }, [aiFields, t]);

  // Check if form is valid for submission
  const isFormValid = Object.keys(errors).length === 0;

  // Get localized help text for each field
  const getHelpText = useCallback((fieldName, index) => {
    const helpTexts = {
      currentFinancialSituation: t('help.financialSituation'),
      employmentCircumstances: t('help.employmentCircumstances'),
      reasonForApplying: t('help.reasonForApplying')
    };
    
    return helpTexts[fieldName] || t('help.default');
  }, [t]);

  return (
    <WizardLayout
      title={t('app.title')}
      subtitle={`${t('steps.situationDescriptions.title')} - ${t('common.stepOf', { current: 3, total: 3 })}`}
      maxWidth="4xl"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit3 className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('steps.situationDescriptions.title')}
          </h2>
          <p className="text-gray-600 mb-4">
            {t('steps.situationDescriptions.description')}
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 justify-center text-blue-700">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('aiModal.helpAvailable')}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleNext)} className="space-y-8">
          {aiFields.map((aiField, index) => {
            const fieldConfig = getFieldConfig(aiField.name);
            
            return (
              <div key={aiField.name} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-600" />
                    {fieldConfig.label}
                  </h3>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAIHelp(aiField.name)}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50 transition-colors"
                    disabled={isGenerating}
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    <span className="hidden sm:inline">
                      {isGenerating && currentField === aiField.name 
                        ? t('aiModal.generating')
                        : t('aiModal.helpMeWrite')
                      }
                    </span>
                  </Button>
                </div>

                <FormField
                  type="textarea"
                  name={aiField.name}
                  placeholder={fieldConfig.placeholder}
                  required={true}
                  register={register}
                  rules={stepConfig.validationRules[aiField.name]}
                  errors={errors}
                  rows={6}
                  maxLength={1000}
                  className="mt-2"
                  helpText={getHelpText(aiField.name, index)}
                  onChange={(e) => handleFieldChange(aiField.name, e.target.value)}
                />
              </div>
            );
          })}

          {aiError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-red-700 text-sm">{aiError}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800"
                >
                  {t('common.dismiss')}
                </Button>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-gray-200">
            <StepNavigation
              currentStep={3}
              totalSteps={3}
              onNext={handleSubmit(handleNext)}
              onPrev={handlePrevious}
              canGoNext={isFormValid}
              canGoPrev={true}
              isFirstStep={false}
              isLastStep={true}
              isLoading={isLoading}
              nextLabel={t('navigation.review')}
              prevLabel={t('navigation.familyFinancialInformation')}
            />
          </div>
        </form>
      </div>

      <AISuggestionModal
        isOpen={aiModalOpen}
        onClose={handleAIDiscard}
        fieldName={currentField}
        fieldLabel={currentFieldLabel}
        originalText={getValues(currentField)}
        onAccept={handleAIAccept}
        onDiscard={handleAIDiscard}
        onGenerateFromInput={handleGenerateFromInput}
        isRegenerating={isGenerating && currentField}
      />
    </WizardLayout>
  );
};

export default Step3