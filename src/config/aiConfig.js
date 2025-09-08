// Get OpenAI configuration settings from environment variables
export const getOpenAIConfig = () => {
  return {
    // API Configuration
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
    
    // Generation Parameters
    maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS) || 200,
    temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE) || 0.7,
    
    // Request Settings
    timeout: parseInt(import.meta.env.VITE_OPENAI_TIMEOUT) || 30000,
    
    // Development Settings
    useMockInDevelopment: import.meta.env.DEV && !import.meta.env.VITE_OPENAI_API_KEY,
    
    // Configuration validation function
    isConfigured: () => {
      const config = getOpenAIConfig();
      return Boolean(config.apiKey && config.apiKey.startsWith('sk-'));
    }
  };
};