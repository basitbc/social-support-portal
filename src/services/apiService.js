// services/apiService.js
import { makeApiCall } from './apiInterceptors.js';
import { getOpenAIConfig } from '../config/aiConfig.js';
import i18n from '../i18n.js';
import { 
  buildUserPrompt, 
  cleanSuggestion, 
  getCurrentLanguage, 
  getErrorMessage, 
  handleError, 
  withLanguageSwitch 
} from '../utils/helpers.js';
import { PROMPTS } from '../config/constants.js';

// OpenAI API configuration with defaults
const config = {
  ...getOpenAIConfig(),
  model: getOpenAIConfig().model || 'gpt-3.5-turbo',
  maxTokens: 300,
  temperature: 0.7
};

// Generation state management
let isGenerating = false;

// Get predefined suggestions for a specific field in the specified language
export const getPredefinedSuggestions = (fieldName, language = null) => {
  const currentLang = getCurrentLanguage(language);
  
  return withLanguageSwitch(currentLang, () => {
    const suggestions = i18n.t(`aiModal.predefinedOptions.${fieldName}`, { returnObjects: true });
    return Array.isArray(suggestions) ? suggestions : [];
  });
};

// Generate AI suggestion using OpenAI API
export const generateSuggestion = async (fieldName, userPrompt, formContext = {}, language = null) => {
  const currentLang = getCurrentLanguage(language);
  
  // Input validation
  if (isGenerating) throw new Error(getErrorMessage('alreadyGenerating', currentLang));
  if (!fieldName) throw new Error(getErrorMessage('invalidField', currentLang));
  if (!userPrompt?.trim()) throw new Error(getErrorMessage('emptyPrompt', currentLang));

  // Set generation state
  isGenerating = true;

  try {
    // Check API configuration
    if (!config.apiKey) throw new Error('OpenAI not configured');

    // Get language-specific prompts
    const prompts = PROMPTS[currentLang] || PROMPTS.en;
    
    // Make API call to OpenAI
    const response = await makeApiCall(
      'https://api.openai.com/v1',
      '/chat/completions',
      {
        model: config.model,
        messages: [
          { role: 'system', content: prompts.system },
          { role: 'user', content: buildUserPrompt(fieldName, userPrompt, formContext, currentLang) }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature
      },
      {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    );

    // Extract and validate suggestion from response
    const suggestion = response.data.choices[0]?.message?.content?.trim();
    if (!suggestion) throw new Error(getErrorMessage('noSuggestion', currentLang));

    return cleanSuggestion(suggestion, currentLang);

  } catch (error) {
    handleError(error, currentLang);
  } finally {
    // Reset generation state regardless of success/failure
    isGenerating = false;
  }
};

// Cancel ongoing generation request
export const cancelGeneration = () => {
  isGenerating = false;
};

export default { getPredefinedSuggestions, generateSuggestion, cancelGeneration };