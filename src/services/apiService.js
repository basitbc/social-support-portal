// services/apiService.js
import { makeApiCall } from './apiInterceptors.js';
import { getOpenAIConfig } from '../config/aiConfig.js';
import i18n from '../i18n.js';

const openaiConfig = getOpenAIConfig();

/**
 * Enhanced AI service following the specified flow
 */
class APIService {
  constructor() {
    this.isGenerating = false;
  }

  /**
   * Get predefined suggestions for a field based on current language
   * @param {string} fieldName - Form field name
   * @param {string} language - Current language (en/ar)
   * @returns {Array<string>} Predefined suggestions
   */
  getPredefinedSuggestions(fieldName, language = null) {
    const currentLang = language || i18n.language;
    
    // Temporarily switch language if needed
    const originalLang = i18n.language;
    if (currentLang !== originalLang) {
      i18n.changeLanguage(currentLang);
    }
    
    try {
      const suggestions = i18n.t(`aiModal.predefinedOptions.${fieldName}`, { 
        returnObjects: true 
      });
      
      return Array.isArray(suggestions) ? suggestions : [];
    } finally {
      // Restore original language
      if (currentLang !== originalLang) {
        i18n.changeLanguage(originalLang);
      }
    }
  }

  /**
   * Generate AI suggestion from user prompt
   * @param {string} fieldName - Form field name
   * @param {string} userPrompt - User's prompt/input
   * @param {Object} formContext - Current form data for context
   * @param {string} language - Current language
   * @returns {Promise<string>} AI generated suggestion
   */
  async generateSuggestion(fieldName, userPrompt, formContext = {}, language = null) {
    const currentLang = language || i18n.language;
    
    if (this.isGenerating) {
      throw new Error(this.getErrorMessage('alreadyGenerating', currentLang));
    }

    // Validate inputs
    if (!fieldName) {
      throw new Error(this.getErrorMessage('invalidField', currentLang));
    }

    if (!userPrompt || !userPrompt.trim()) {
      throw new Error(this.getErrorMessage('emptyPrompt', currentLang));
    }

    this.isGenerating = true;

    try {
      // Check if OpenAI is configured
      if (!openaiConfig.apiKey) {
        console.warn('OpenAI not configured, using mock response');
        return await this.generateMockResponse(fieldName, userPrompt, formContext, currentLang);
      }

      const systemPrompt = this.buildSystemPrompt(currentLang);
      const userMessage = this.buildUserPrompt(fieldName, userPrompt, formContext, currentLang);

      const requestData = {
        model: openaiConfig.model || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      };

      const headers = {
        'Authorization': `Bearer ${openaiConfig.apiKey}`,
        'Content-Type': 'application/json'
      };

      const response = await makeApiCall(
        'https://api.openai.com/v1',
        '/chat/completions',
        requestData,
        headers
      );

      const suggestion = response.data.choices[0]?.message?.content?.trim();
      
      if (!suggestion) {
        throw new Error(this.getErrorMessage('noSuggestion', currentLang));
      }

      return this.postProcessSuggestion(suggestion, currentLang);

    } catch (error) {
      console.error('AI generation failed:', error);
      
      // Handle specific error types
      if (error.message.includes('rate limit')) {
        throw new Error(this.getErrorMessage('rateLimited', currentLang));
      }
      
      if (error.message.includes('Authentication')) {
        throw new Error(this.getErrorMessage('authFailed', currentLang));
      }

      // Fallback to mock for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Falling back to mock response');
        return await this.generateMockResponse(fieldName, userPrompt, formContext, currentLang);
      }

      throw new Error(this.getErrorMessage('generationFailed', currentLang));
    } finally {
      this.isGenerating = false;
    }
  }

  /**
   * Build system prompt based on language and context
   * @param {string} language - Current language
   * @returns {string} System prompt
   */
  buildSystemPrompt(language) {
    if (language === 'ar') {
      return `أنت مساعد ذكي متخصص في مساعدة الأشخاص على كتابة طلبات الدعم الاجتماعي والمساعدة المالية.

قواعد مهمة:
- اكتب باللغة العربية الفصحى
- استخدم لغة مهنية ومهذبة ومناسبة للطلبات الرسمية
- كن مختصراً وواضحاً (2-4 جمل فقط)
- ركز على الحقائق وتجنب المبالغة
- استخدم لهجة محترمة ومتفهمة
- لا تذكر معلومات طبية أو قانونية محددة
- اجعل النص مناسباً للاستخدام في طلب رسمي

اكتب نصاً يمكن استخدامه مباشرة في طلب الدعم الاجتماعي.`;
    }

    return `You are an AI assistant specialized in helping people write social support and financial assistance applications.

Important guidelines:
- Write in professional, respectful, and appropriate language for official applications
- Be concise and clear (2-4 sentences only)
- Focus on facts and avoid exaggeration
- Use a respectful and understanding tone
- Do not mention specific medical or legal information
- Make the text suitable for direct use in an official application
- Be empathetic but maintain professionalism

Generate text that can be used directly in a social support application.`;
  }

  /**
   * Build user prompt with context
   * @param {string} fieldName - Form field name
   * @param {string} userPrompt - User's input prompt
   * @param {Object} formContext - Form data context
   * @param {string} language - Current language
   * @returns {string} Complete user prompt
   */
  buildUserPrompt(fieldName, userPrompt, formContext, language) {
    const contextInfo = this.buildContextString(formContext, language);
    
    const fieldInstructions = this.getFieldInstructions(fieldName, language);
    
    if (language === 'ar') {
      return `السياق: ${contextInfo}

المطلوب: ${fieldInstructions}

توجيهات المستخدم: "${userPrompt}"

اكتب فقرة مهنية ومناسبة للاستخدام في طلب الدعم الاجتماعي:`;
    }

    return `Context: ${contextInfo}

Task: ${fieldInstructions}

User instructions: "${userPrompt}"

Write a professional paragraph suitable for use in a social support application:`;
  }

  /**
   * Get field-specific instructions
   * @param {string} fieldName - Form field name
   * @param {string} language - Current language
   * @returns {string} Field instructions
   */
  getFieldInstructions(fieldName, language) {
    const instructions = {
      en: {
        currentFinancialSituation: 'Describe the current financial situation clearly and factually',
        employmentCircumstances: 'Explain the employment situation and any challenges',
        reasonForApplying: 'Explain why assistance is needed and how it will help'
      },
      ar: {
        currentFinancialSituation: 'وصف الوضع المالي الحالي بوضوح وصدق',
        employmentCircumstances: 'شرح وضع العمل وأي تحديات تواجهها',
        reasonForApplying: 'شرح سبب الحاجة للمساعدة وكيف ستساعد'
      }
    };

    const langKey = language === 'ar' ? 'ar' : 'en';
    return instructions[langKey][fieldName] || instructions[langKey].currentFinancialSituation;
  }

  /**
   * Build context string from form data
   * @param {Object} formContext - Form data
   * @param {string} language - Current language
   * @returns {string} Context string
   */
  buildContextString(formContext, language) {
    const contextParts = [];
    
    if (language === 'ar') {
      if (formContext.employmentStatus) {
        contextParts.push(`حالة العمل: ${formContext.employmentStatus}`);
      }
      if (formContext.monthlyIncome) {
        contextParts.push(`الدخل الشهري: ${formContext.monthlyIncome}`);
      }
      if (formContext.maritalStatus) {
        contextParts.push(`الحالة الاجتماعية: ${formContext.maritalStatus}`);
      }
      if (formContext.dependents) {
        contextParts.push(`عدد المعالين: ${formContext.dependents}`);
      }
      if (formContext.housingStatus) {
        contextParts.push(`حالة السكن: ${formContext.housingStatus}`);
      }
    } else {
      if (formContext.employmentStatus) {
        contextParts.push(`Employment: ${formContext.employmentStatus}`);
      }
      if (formContext.monthlyIncome) {
        contextParts.push(`Monthly Income: ${formContext.monthlyIncome}`);
      }
      if (formContext.maritalStatus) {
        contextParts.push(`Marital Status: ${formContext.maritalStatus}`);
      }
      if (formContext.dependents) {
        contextParts.push(`Dependents: ${formContext.dependents}`);
      }
      if (formContext.housingStatus) {
        contextParts.push(`Housing: ${formContext.housingStatus}`);
      }
    }

    return contextParts.length > 0 ? contextParts.join(', ') : (language === 'ar' ? 'لا توجد معلومات إضافية' : 'No additional context');
  }

  /**
   * Generate mock response for development/fallback
   * @param {string} fieldName - Form field name
   * @param {string} userPrompt - User prompt
   * @param {Object} formContext - Form context
   * @param {string} language - Current language
   * @returns {Promise<string>} Mock response
   */
  async generateMockResponse(fieldName, userPrompt, formContext, language) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

    const mockResponses = {
      en: {
        currentFinancialSituation: "I am currently experiencing financial challenges due to reduced income and increased living expenses. My monthly budget is strained, making it difficult to cover essential needs such as housing, utilities, and groceries. I am actively working to improve my financial situation while seeking temporary assistance to help stabilize my circumstances.",
        
        employmentCircumstances: "I am currently facing employment difficulties that have impacted my income stability. Despite my efforts to secure consistent work, I have encountered challenges that have affected my ability to maintain steady employment. I remain committed to finding stable employment opportunities and am actively pursuing various avenues to improve my work situation.",
        
        reasonForApplying: "I am applying for financial assistance to help cover essential living expenses during this challenging period. This support would provide crucial stability for my family and allow me to focus on securing long-term employment. The assistance would help bridge the gap while I work toward achieving financial independence."
      },
      ar: {
        currentFinancialSituation: "أواجه حاليًا تحديات مالية بسبب انخفاض الدخل وزيادة نفقات المعيشة. ميزانيتي الشهرية مضغوطة، مما يجعل من الصعب تغطية الاحتياجات الأساسية مثل السكن والمرافق والطعام. أعمل بنشاط لتحسين وضعي المالي بينما أسعى للحصول على مساعدة مؤقتة لتحقيق الاستقرار.",
        
        employmentCircumstances: "أواجه حاليًا صعوبات في العمل أثرت على استقرار دخلي. رغم جهودي للحصول على عمل ثابت، واجهت تحديات أثرت على قدرتي على الحفاظ على عمل مستقر. أبقى ملتزمًا بإيجاد فرص عمل مستقرة وأسعى بنشاط لتحسين وضع عملي.",
        
        reasonForApplying: "أتقدم بطلب للحصول على مساعدة مالية لتغطية نفقات المعيشة الأساسية خلال هذه الفترة الصعبة. هذا الدعم سيوفر استقرارًا مهمًا لعائلتي ويسمح لي بالتركيز على تأمين عمل طويل الأمد. المساعدة ستساعد في سد الفجوة بينما أعمل نحو تحقيق الاستقلال المالي."
      }
    };

    const langKey = language === 'ar' ? 'ar' : 'en';
    const baseResponse = mockResponses[langKey][fieldName] || mockResponses[langKey].currentFinancialSituation;
    
    // Add some variation based on user prompt
    return this.customizeMockResponse(baseResponse, userPrompt, language);
  }

  /**
   * Customize mock response based on user prompt
   * @param {string} baseResponse - Base mock response
   * @param {string} userPrompt - User's prompt
   * @param {string} language - Current language
   * @returns {string} Customized response
   */
  customizeMockResponse(baseResponse, userPrompt, language) {
    // Simple customization based on keywords in user prompt
    const prompt = userPrompt.toLowerCase();
    
    if (language === 'ar') {
      if (prompt.includes('عائلة') || prompt.includes('أطفال')) {
        return baseResponse.replace('لعائلتي', 'لعائلتي وأطفالي');
      }
      if (prompt.includes('طبي') || prompt.includes('صحة')) {
        return baseResponse + ' كما أن هناك تحديات صحية إضافية تؤثر على وضعي.';
      }
    } else {
      if (prompt.includes('family') || prompt.includes('children')) {
        return baseResponse.replace('my family', 'my family and children');
      }
      if (prompt.includes('medical') || prompt.includes('health')) {
        return baseResponse + ' Additionally, there are health-related challenges that impact my situation.';
      }
    }
    
    return baseResponse;
  }

  /**
   * Post-process AI suggestion
   * @param {string} suggestion - Raw AI suggestion
   * @param {string} language - Current language
   * @returns {string} Processed suggestion
   */
  postProcessSuggestion(suggestion, language) {
    // Clean up the suggestion
    let processed = suggestion.trim();
    
    // Remove any unwanted prefixes or suffixes
    const unwantedPrefixes = [
      'Here is', 'Here\'s', 'This is', 'The following',
      'إليك', 'هذا هو', 'فيما يلي', 'النص التالي'
    ];
    
    for (const prefix of unwantedPrefixes) {
      if (processed.toLowerCase().startsWith(prefix.toLowerCase())) {
        processed = processed.substring(prefix.length).trim();
        if (processed.startsWith(':')) {
          processed = processed.substring(1).trim();
        }
      }
    }
    
    // Ensure proper capitalization
    if (processed.length > 0) {
      processed = processed.charAt(0).toUpperCase() + processed.slice(1);
    }
    
    return processed;
  }

  /**
   * Get error messages in appropriate language
   * @param {string} errorType - Type of error
   * @param {string} language - Current language
   * @returns {string} Error message
   */
  getErrorMessage(errorType, language) {
    const errors = {
      en: {
        alreadyGenerating: 'AI is already generating a response. Please wait.',
        invalidField: 'Invalid field name provided.',
        emptyPrompt: 'Please provide a prompt or select a suggestion first.',
        noSuggestion: 'No suggestion was generated. Please try again.',
        rateLimited: 'AI service is temporarily busy. Please try again in a moment.',
        authFailed: 'AI service authentication failed. Please check configuration.',
        generationFailed: 'Failed to generate suggestion. Please try again.',
        networkError: 'Network error. Please check your connection and try again.'
      },
      ar: {
        alreadyGenerating: 'الذكاء الاصطناعي يعمل على إنشاء رد. يرجى الانتظار.',
        invalidField: 'اسم الحقل المقدم غير صحيح.',
        emptyPrompt: 'يرجى تقديم نص أو اختيار اقتراح أولاً.',
        noSuggestion: 'لم يتم إنشاء اقتراح. يرجى المحاولة مرة أخرى.',
        rateLimited: 'خدمة الذكاء الاصطناعي مشغولة مؤقتاً. يرجى المحاولة بعد قليل.',
        authFailed: 'فشل في المصادقة مع خدمة الذكاء الاصطناعي. يرجى فحص الإعدادات.',
        generationFailed: 'فشل في إنشاء الاقتراح. يرجى المحاولة مرة أخرى.',
        networkError: 'خطأ في الشبكة. يرجى فحص الاتصال والمحاولة مرة أخرى.'
      }
    };

    const langKey = language === 'ar' ? 'ar' : 'en';
    return errors[langKey][errorType] || errors[langKey].generationFailed;
  }

  /**
   * Check if service is currently generating
   * @returns {boolean} True if generating
   */
  isCurrentlyGenerating() {
    return this.isGenerating;
  }

  /**
   * Cancel current generation (if possible)
   */
  cancelGeneration() {
    this.isGenerating = false;
  }
}

// Export singleton instance
const apiService = new APIService();
export default apiService;

// Named exports for specific functions
export const {
  getPredefinedSuggestions,
  generateSuggestion,
  isCurrentlyGenerating,
  cancelGeneration
} = apiService;