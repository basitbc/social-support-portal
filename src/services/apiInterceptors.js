import axios from 'axios';

// Create a single axios instance with dynamic base URL
const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    
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
    
    throw new Error(error.response?.data?.message || 'Request failed');
  }
);


export const makeApiCall = async (baseURL, endpoint, data = null, headers = {}) => {
  const config = {
    baseURL,
    url: endpoint,
    method: data ? 'POST' : 'GET',
    ...headers && { headers }
  };
  
  if (data) {
    config.data = data;
  }
  
  return apiClient(config);
};

export default apiClient;