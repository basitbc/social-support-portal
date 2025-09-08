import axios from 'axios';

// Create axios instance with default configuration for API requests
const apiClient = axios.create({
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for logging and pre-processing requests
apiClient.interceptors.request.use(
  (config) => {
    // Pass through config unchanged - can add auth tokens, logging, etc. here
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and response processing
apiClient.interceptors.response.use(
  (response) => {
    // Return successful responses unchanged
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    
    // Handle specific HTTP status codes
    if (error.response?.status === 401) {
      throw new Error('Authentication failed');
    }
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    if (!error.response) {
      throw new Error('Network error. Check your connection.');
    }
    
    // Default error handling with custom message or fallback
    throw new Error(error.response?.data?.message || 'Request failed');
  }
);

// Generic API call function with dynamic base URL support
export const makeApiCall = async (baseURL, endpoint, data = null, headers = {}) => {
  // Build request configuration
  const config = {
    baseURL,
    url: endpoint,
    method: data ? 'POST' : 'GET', // Auto-determine method based on data presence
    ...headers && { headers } // Spread headers if provided
  };
  
  // Add data for POST requests
  if (data) {
    config.data = data;
  }
  
  return apiClient(config);
};

export default apiClient;