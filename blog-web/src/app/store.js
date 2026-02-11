// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export default store;
