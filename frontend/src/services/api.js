import axios from "axios";

const API_BASE = "https://ai-code-review-assistant-o7vm.onrender.com/api";

// AUTH
export const authAPI = {
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),

  register: (data) => axios.post(`${API_BASE}/auth/register`, data),

  verify: () =>
    axios.get(`${API_BASE}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

// REVIEW
export const reviewAPI = {
  analyze: (data) =>
    axios.post(`${API_BASE}/review/analyze`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};