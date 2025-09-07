// components/organisms/AISuggestionModal.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Sparkles, Edit3, RotateCcw, Check, ArrowLeft, Copy } from 'lucide-react';
import { useUIContext } from '../../context/UIContext';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Textarea from '../atoms/Textarea';

const AISuggestionModal = ({
  isOpen,
  onClose,
  fieldName,
  fieldLabel,
  originalText,
  onAccept,
  onDiscard,
  onGenerateFromInput,
  isRegenerating = false
}) => {
  const { t, i18n } = useTranslation();
  const { language, isRTL } = useUIContext();
  
  // Modal state management
  const [modalState, setModalState] = useState('input'); // 'input', 'suggestion', 'editing'
  const [userPrompt, setUserPrompt] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Get predefined suggestions based on field and language
  const getPredefinedSuggestions = () => {
    const suggestions = t(`aiModal.predefinedOptions.${fieldName}`, { returnObjects: true });
    return Array.isArray(suggestions) ? suggestions : [];
  };

  const predefinedSuggestions = getPredefinedSuggestions();

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setModalState('input');
      setUserPrompt('');
      setAiSuggestion('');
      setEditedSuggestion('');
      setError('');
      setCopiedIndex(null);
    }
  }, [isOpen]);

  // Handle predefined suggestion selection
  const handlePredefinedSelect = (suggestion) => {
    setUserPrompt(suggestion);
  };

  // Copy suggestion to clipboard
  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate AI suggestion from user prompt
  const handleGenerate = async () => {
    if (!userPrompt.trim()) {
      setError(t('aiModal.errors.emptyPrompt'));
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const suggestion = await onGenerateFromInput(userPrompt.trim());
      setAiSuggestion(suggestion);
      setEditedSuggestion(suggestion);
      setModalState('suggestion');
    } catch (err) {
      setError(err.message || t('aiModal.errors.generationFailed'));
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle regeneration with current prompt
  const handleRegenerate = async () => {
    if (!userPrompt.trim()) {
      // Generate random prompt if none exists
      const randomPrompt = getRandomPromptForField();
      setUserPrompt(randomPrompt);
      await handleGenerate();
      return;
    }
    await handleGenerate();
  };

  // Get random prompt for field when user hasn't provided one
  const getRandomPromptForField = () => {
    const fieldPrompts = {
      currentFinancialSituation: language === 'ar' 
        ? 'اكتب وصفاً مهنياً لوضعي المالي الحالي'
        : 'Write a professional description of my current financial situation',
      employmentCircumstances: language === 'ar'
        ? 'اشرح ظروف عملي الحالية بطريقة مهنية'
        : 'Explain my current employment circumstances professionally',
      reasonForApplying: language === 'ar'
        ? 'اشرح سبب حاجتي للمساعدة المالية'
        : 'Explain why I need financial assistance'
    };
    
    return fieldPrompts[fieldName] || (language === 'ar' ? 'ساعدني في كتابة هذا القسم' : 'Help me write this section');
  };

  // Handle suggestion editing
  const handleEdit = () => {
    setModalState('editing');
  };

  // Save edited suggestion
  const handleSaveEdit = () => {
    setAiSuggestion(editedSuggestion);
    setModalState('suggestion');
  };

  // Accept final suggestion
  const handleAcceptSuggestion = () => {
    const finalText = modalState === 'editing' ? editedSuggestion : aiSuggestion;
    onAccept(finalText);
    onClose();
  };

  // Go back to input state
  const handleBackToInput = () => {
    setModalState('input');
    setError('');
  };

  // Handle modal close/discard
  const handleClose = () => {
    onDiscard();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('aiModal.title')}
              </h2>
              <p className="text-sm text-gray-600">
                {t('aiModal.forField')} {fieldLabel}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            icon={<X className="w-5 h-5" />}
            className="text-gray-400 hover:text-gray-600"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Input State */}
          {modalState === 'input' && (
            <div className="space-y-6">
              {/* Original Text Display */}
              {originalText && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {t('aiModal.originalText')}
                  </h3>
                  <p className="text-gray-900 text-sm leading-relaxed">
                    {originalText}
                  </p>
                </div>
              )}

              {/* Predefined Suggestions */}
              {predefinedSuggestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {t('aiModal.predefinedSuggestions')}
                  </h3>
                  <div className="grid gap-3">
                    {predefinedSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="relative group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 cursor-pointer transition-all duration-200"
                        onClick={() => handlePredefinedSelect(suggestion)}
                      >
                        <p className="text-gray-900 text-sm leading-relaxed pr-10">
                          {suggestion}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(suggestion, index);
                          }}
                          icon={<Copy className="w-4 h-4" />}
                          className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} opacity-0 group-hover:opacity-100 transition-opacity ${
                            copiedIndex === index ? 'text-green-600' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Prompt Input */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('aiModal.writeYourOwn')}
                </h3>
                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder={t('aiModal.promptPlaceholder')}
                  rows={4}
                  className="w-full"
                  maxLength={500}
                />
                <div className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-left' : 'text-right'}`}>
                  {userPrompt.length}/500 {t('aiModal.characters')}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!userPrompt.trim() && predefinedSuggestions.length === 0)}
                  icon={isGenerating ? <LoadingSpinner size="sm" /> : <Sparkles className="w-4 h-4" />}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isGenerating ? t('aiModal.generating') : t('aiModal.generateFromInput')}
                </Button>
              </div>
            </div>
          )}

          {/* Suggestion State */}
          {modalState === 'suggestion' && (
            <div className="space-y-6">
              {/* User Prompt Display */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-700 mb-2">
                  {t('aiModal.yourPrompt')}
                </h3>
                <p className="text-blue-900 text-sm leading-relaxed">
                  {userPrompt}
                </p>
              </div>

              {/* AI Suggestion */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-700 mb-2">
                  {t('aiModal.aiSuggestion')}
                </h3>
                <p className="text-green-900 text-sm leading-relaxed whitespace-pre-wrap">
                  {aiSuggestion}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleBackToInput}
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    {t('aiModal.back')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                    icon={isGenerating ? <LoadingSpinner size="sm" /> : <RotateCcw className="w-4 h-4" />}
                  >
                    {isGenerating ? t('aiModal.generating') : t('aiModal.regenerate')}
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleEdit}
                    icon={<Edit3 className="w-4 h-4" />}
                  >
                    {t('aiModal.edit')}
                  </Button>
                  <Button
                    onClick={handleAcceptSuggestion}
                    icon={<Check className="w-4 h-4" />}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {t('aiModal.acceptSuggestion')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Editing State */}
          {modalState === 'editing' && (
            <div className="space-y-6">
              {/* Original Suggestion */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {t('aiModal.originalSuggestion')}
                </h3>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {aiSuggestion}
                </p>
              </div>

              {/* Editable Suggestion */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('aiModal.editSuggestion')}
                </h3>
                <Textarea
                  value={editedSuggestion}
                  onChange={(e) => setEditedSuggestion(e.target.value)}
                  rows={8}
                  className="w-full"
                  maxLength={1000}
                />
              </div>

              {/* Edit Action Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setModalState('suggestion')}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  {t('aiModal.back')}
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSaveEdit}
                  >
                    {t('aiModal.saveChanges')}
                  </Button>
                  <Button
                    onClick={handleAcceptSuggestion}
                    icon={<Check className="w-4 h-4" />}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {t('aiModal.acceptEdited')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              {t('aiModal.footerNote')}
            </p>
            <Button
              variant="outline"
              onClick={handleClose}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionModal;