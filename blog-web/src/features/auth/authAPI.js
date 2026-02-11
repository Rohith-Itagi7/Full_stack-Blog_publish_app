import api from "../../services/axios";

// 🔑 Register
export const registerAPI = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// 🔑 Login
export const loginAPI = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// 👤 Get Profile
export const getProfileAPI = async (userId) => {
  const res = await api.get(`/profile/${userId}`);
  return res.data;
};

// ✏️ Update Profile
export const updateProfileAPI = async (data) => {
  const res = await api.put("/profile", data);
  return res.data;
};
