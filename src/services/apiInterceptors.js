import axios from 'axios';
import { API_CONFIG, ERROR_MESSAGES_API, HTTP_STATUS } from '../config/constants';

const apiClient = axios.create({
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    
    const status = error.response?.status;
    
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      throw new Error(ERROR_MESSAGES_API.AUTH_FAILED);
    }
    if (status === HTTP_STATUS.RATE_LIMITED) {
      throw new Error(ERROR_MESSAGES_API.RATE_LIMITED);
    }
    if (status >= HTTP_STATUS.SERVER_ERROR) {
      throw new Error(ERROR_MESSAGES_API.SERVER_ERROR);
    }
    if (!error.response) {
      throw new Error(ERROR_MESSAGES_API.NETWORK_ERROR);
    }
    
    throw new Error(error.response?.data?.message || ERROR_MESSAGES_API.REQUEST_FAILED);
  }
);

export const makeApiCall = async (baseURL, endpoint, data = null, headers = {}) => {
  const config = {
    baseURL,
    url: endpoint,
    method: data ? 'POST' : 'GET',
    ...(Object.keys(headers).length && { headers })
  };
  
  if (data) {
    config.data = data;
  }
  
  return apiClient(config);
};

export default apiClient;