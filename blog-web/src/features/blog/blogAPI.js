import api from "../../services/axios";

// 📝 Create blog
export const createBlogAPI = async (data) => {
  const res = await api.post("/blogs", data);
  return res.data;
};

// 📚 Get all blogs
export const getAllBlogsAPI = async (params = {}) => {
  const res = await api.get("/blogs", { params });
  return res.data;
};

// 📖 Get single blog
export const getBlogByIdAPI = async (id) => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

// ✏️ Update blog
export const updateBlogAPI = async ({ id, data }) => {
  const res = await api.put(`/blogs/${id}`, data);
  return res.data;
};


// ❌ Delete blog
export const deleteBlogAPI = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

// ❤️ Like / Unlike
export const toggleLikeAPI = async (id) => {
  const res = await api.put(`/blogs/${id}/like`);
  return res.data;
};

// 💬 Add comment
export const addCommentAPI = async (blogId, text) => {
  const res = await api.post(`/blogs/${blogId}/comment`, {
    text,
  });
  return res.data;
};

export const toggleBookmarkAPI = async (blogId) => {
  const res = await api.put(`/blogs/${blogId}/bookmark`);
  return res.data;
};

// DELETE COMMENT
export const deleteCommentAPI = async (blogId, commentId) => {
  const res = await api.delete(
    `/blogs/${blogId}/comment/${commentId}`
  );
  return res.data;
};

export const searchBlogsAPI = async (query) => {
  const res = await api.get(`/blogs/search?query=${query}`);
  return res.data;
};

// blogAPI.js
export const generateAIPreviewAPI = async (prompt) => {
  const res = await api.post("/ai/preview", { prompt });

  // ✅ ONLY return the string
  return res.data.preview;
};
