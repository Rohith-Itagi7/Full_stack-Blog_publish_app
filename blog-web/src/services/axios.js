import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
// src/services/axios.js

// src/services/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
