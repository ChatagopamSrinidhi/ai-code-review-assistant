import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

export const reviewAPI = {
  analyze: (code, language, beginnerMode) => 
    api.post('/review/analyze', { code, language, beginner_mode: beginnerMode }),
  uploadFile: (file, beginnerMode) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('beginner_mode', beginnerMode);
    return api.post('/review/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getHistory: () => api.get('/history/reviews'),
};

export default api;