import { OPENAI_CONSTANTS } from "./constants";

export const getOpenAIConfig = () => {
  return {
    apiKey: import.meta.env[OPENAI_CONSTANTS.ENV_KEYS.API_KEY] || '',
    model: import.meta.env[OPENAI_CONSTANTS.ENV_KEYS.MODEL] || OPENAI_CONSTANTS.DEFAULTS.MODEL,
    
    maxTokens: parseInt(import.meta.env[OPENAI_CONSTANTS.ENV_KEYS.MAX_TOKENS]) || OPENAI_CONSTANTS.DEFAULTS.MAX_TOKENS,
    temperature: parseFloat(import.meta.env[OPENAI_CONSTANTS.ENV_KEYS.TEMPERATURE]) || OPENAI_CONSTANTS.DEFAULTS.TEMPERATURE,
    
    timeout: parseInt(import.meta.env[OPENAI_CONSTANTS.ENV_KEYS.TIMEOUT]) || OPENAI_CONSTANTS.DEFAULTS.TIMEOUT,
    
    useMockInDevelopment: import.meta.env.DEV && !import.meta.env[OPENAI_CONSTANTS.ENV_KEYS.API_KEY],
    
    isConfigured: () => {
      const config = getOpenAIConfig();
      return Boolean(config.apiKey && config.apiKey.startsWith(OPENAI_CONSTANTS.VALIDATION.API_KEY_PREFIX));
    }
  };
};