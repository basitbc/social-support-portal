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
import { API_CONFIG, ERROR_TYPES, PROMPTS, ROLES } from '../config/constants.js';



const getConfig = () => {
  const openAIConfig = getOpenAIConfig();
  return {
    ...openAIConfig,
    model: openAIConfig.model || API_CONFIG.DEFAULT_MODEL,
    maxTokens: API_CONFIG.MAX_TOKENS,
    temperature: API_CONFIG.TEMPERATURE
  };
};

let isGenerating = false;

export const getPredefinedSuggestions = (fieldName, language = null) => {
  const currentLang = getCurrentLanguage(language);
  
  return withLanguageSwitch(currentLang, () => {
    const suggestions = i18n.t(`aiModal.predefinedOptions.${fieldName}`, { returnObjects: true });
    return Array.isArray(suggestions) ? suggestions : [];
  });
};

export const generateSuggestion = async (fieldName, userPrompt, formContext = {}, language = null) => {
  const currentLang = getCurrentLanguage(language);
  
  if (isGenerating) throw new Error(getErrorMessage(ERROR_TYPES.ALREADY_GENERATING, currentLang));
  if (!fieldName) throw new Error(getErrorMessage(ERROR_TYPES.INVALID_FIELD, currentLang));
  if (!userPrompt?.trim()) throw new Error(getErrorMessage(ERROR_TYPES.EMPTY_PROMPT, currentLang));

  isGenerating = true;

  try {
    const config = getConfig();
    
    if (!config.apiKey) throw new Error(ERROR_TYPES.NOT_CONFIGURED);

    const prompts = PROMPTS[currentLang] || PROMPTS.en;
    
    const response = await makeApiCall(
      API_CONFIG.BASE_URL,
      API_CONFIG.ENDPOINT,
      {
        model: config.model,
        messages: [
          { role: ROLES.SYSTEM, content: prompts.system },
          { role: ROLES.USER, content: buildUserPrompt(fieldName, userPrompt, formContext, currentLang) }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature
      },
      {
        'Authorization': `Bearer ${config.apiKey}`,
        ...API_CONFIG.DEFAULT_HEADERS
      }
    );

    const suggestion = response.data.choices[0]?.message?.content?.trim();
    if (!suggestion) throw new Error(getErrorMessage(ERROR_TYPES.NO_SUGGESTION, currentLang));

    return cleanSuggestion(suggestion, currentLang);

  } catch (error) {
    handleError(error, currentLang);
  } finally {
    isGenerating = false;
  }
};

export const cancelGeneration = () => {
  isGenerating = false;
};

export default { getPredefinedSuggestions, generateSuggestion, cancelGeneration };