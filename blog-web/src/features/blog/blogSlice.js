// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getAllBlogsAPI, getBlogByIdAPI } from "./blogAPI";
// import { deleteBlogAPI } from "./blogAPI";

// /* =========================
//    ASYNC THUNKS
// ========================= */

// // Fetch all blogs
// export const fetchBlogs = createAsyncThunk(
//   "blogs/fetchBlogs",
//   async (_, thunkAPI) => {
//     try {
//       return await getAllBlogsAPI();
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data);
//     }
//   }
// );

// // Fetch single blog by ID
// export const fetchSingleBlog = createAsyncThunk(
//   "blogs/fetchSingleBlog",
//   async (id, thunkAPI) => {
//     try {
//       return await getBlogByIdAPI(id);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data);
//     }
//   }
// );

// /* =========================
//    SLICE
// ========================= */

// const blogSlice = createSlice({
//   name: "blogs",
//   initialState: {
//     blogs: [],
//     singleBlog: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearSingleBlog: (state) => {
//       state.singleBlog = null;
//     },

//     // ❤️ LIKE / UNLIKE (LOCAL UPDATE)
//     toggleLikeLocal: (state, action) => {
//       if (!state.singleBlog) return;

//       state.singleBlog.likesCount = action.payload.likesCount;
//       state.singleBlog.isLiked = action.payload.isLiked;
//     },

//     // 🔖 BOOKMARK (LOCAL UPDATE)
//     toggleBookmarkLocal: (state, action) => {
//       if (!state.singleBlog) return;

//       state.singleBlog.bookmarks = action.payload;
//     },

//     // 💬 ADD COMMENT
//     addComment: (state, action) => {
//       if (!state.singleBlog) return;

//       state.singleBlog.comments = action.payload;
//     },

//     // ❌ DELETE COMMENT
//     removeComment: (state, action) => {
//       if (!state.singleBlog) return;

//       state.singleBlog.comments = state.singleBlog.comments.filter(
//         (c) => c._id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // ===== FETCH ALL BLOGS =====
//       .addCase(fetchBlogs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload.blogs;
//       })
//       .addCase(fetchBlogs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ===== FETCH SINGLE BLOG =====
//       .addCase(fetchSingleBlog.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSingleBlog.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleBlog = action.payload;
//       })
//       .addCase(fetchSingleBlog.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   clearSingleBlog,
//   toggleLikeLocal,
//   toggleBookmarkLocal,
//   addComment,
//   removeComment,
// } = blogSlice.actions;

// export default blogSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getAllBlogsAPI,
//   getBlogByIdAPI,
//   deleteBlogAPI,
// } from "./blogAPI";

// /* =========================
//    ASYNC THUNKS
// ========================= */

// // Fetch all blogs
// export const fetchBlogs = createAsyncThunk(
//   "blogs/fetchBlogs",
//   async (_, thunkAPI) => {
//     try {
//       return await getAllBlogsAPI();
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data);
//     }
//   }
// );

// // Fetch single blog by ID
// export const fetchSingleBlog = createAsyncThunk(
//   "blogs/fetchSingleBlog",
//   async (id, thunkAPI) => {
//     try {
//       return await getBlogByIdAPI(id);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data);
//     }
//   }
// );

// // 🗑 DELETE BLOG
// export const deleteBlog = createAsyncThunk(
//   "blogs/deleteBlog",
//   async (blogId, thunkAPI) => {
//     try {
//       return await deleteBlogAPI(blogId);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data || "Delete failed"
//       );
//     }
//   }
// );

// /* =========================
//    SLICE
// ========================= */

// const blogSlice = createSlice({
//   name: "blogs",
//   initialState: {
//     blogs: [],
//     singleBlog: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearSingleBlog: (state) => {
//       state.singleBlog = null;
//     },

//     // ❤️ LIKE / UNLIKE (LOCAL UPDATE)
//     toggleLikeLocal: (state, action) => {
//       if (!state.singleBlog) return;
//       state.singleBlog.likesCount = action.payload.likesCount;
//       state.singleBlog.isLiked = action.payload.isLiked;
//     },

//     // 🔖 BOOKMARK (LOCAL UPDATE)
//     toggleBookmarkLocal: (state, action) => {
//       if (!state.singleBlog) return;
//       state.singleBlog.bookmarks = action.payload;
//     },

//     // 💬 ADD COMMENT
//     addComment: (state, action) => {
//       if (!state.singleBlog) return;
//       state.singleBlog.comments = action.payload;
//     },

//     // ❌ DELETE COMMENT
//     removeComment: (state, action) => {
//       if (!state.singleBlog) return;
//       state.singleBlog.comments = state.singleBlog.comments.filter(
//         (c) => c._id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // ===== FETCH ALL BLOGS =====
//       .addCase(fetchBlogs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload.blogs;
//       })
//       .addCase(fetchBlogs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ===== FETCH SINGLE BLOG =====
//       .addCase(fetchSingleBlog.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSingleBlog.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleBlog = action.payload;
//       })
//       .addCase(fetchSingleBlog.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ===== DELETE BLOG =====
//       .addCase(deleteBlog.fulfilled, (state, action) => {
//         state.blogs = state.blogs.filter(
//           (blog) => blog._id !== action.meta.arg
//         );
//         state.singleBlog = null;
//       });
//   },
// });

// export const {
//   clearSingleBlog,
//   toggleLikeLocal,
//   toggleBookmarkLocal,
//   addComment,
//   removeComment,
// } = blogSlice.actions;

// export default blogSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBlogsAPI,
  getBlogByIdAPI,
  deleteBlogAPI,
  createBlogAPI,
  generateAIPreviewAPI,
} from "./blogAPI";

/* =========================
   ASYNC THUNKS
========================= */

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      return await getAllBlogsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// Fetch single blog
export const fetchSingleBlog = createAsyncThunk(
  "blogs/fetchSingleBlog",
  async (id, thunkAPI) => {
    try {
      return await getBlogByIdAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// 📝 CREATE BLOG
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async ({ title, content }, thunkAPI) => {
    try {
      return await createBlogAPI({ title, content });
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Create blog failed"
      );
    }
  }
);

// 🤖 GENERATE AI CONTENT
export const generateAI = createAsyncThunk(
  "blogs/generateAI",
  async (title, thunkAPI) => {
    try {
      const previewText = await generateAIPreviewAPI(title);

      // ✅ This is now a STRING
      return previewText;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "AI generation failed"
      );
    }
  }
);



// 🗑 DELETE BLOG
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId, thunkAPI) => {
    try {
      return await deleteBlogAPI(blogId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Delete failed"
      );
    }
  }
);

/* =========================
   SLICE
========================= */

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    aiPreview: "",
    loading: false,
    error: null,
  },

  reducers: {
    clearSingleBlog: (state) => {
      state.singleBlog = null;
    },

    clearAIPreview: (state) => {
      state.aiPreview = "";
    },

    toggleLikeLocal: (state, action) => {
      if (!state.singleBlog) return;
      state.singleBlog.likesCount = action.payload.likesCount;
      state.singleBlog.isLiked = action.payload.isLiked;
    },

    toggleBookmarkLocal: (state, action) => {
      if (!state.singleBlog) return;
      state.singleBlog.bookmarks = action.payload;
    },

    addComment: (state, action) => {
      if (!state.singleBlog) return;
      state.singleBlog.comments = action.payload;
    },

    removeComment: (state, action) => {
      if (!state.singleBlog) return;
      state.singleBlog.comments = state.singleBlog.comments.filter(
        (c) => c._id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== FETCH BLOGS =====
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== SINGLE BLOG =====
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== CREATE BLOG =====
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })

      // ===== AI GENERATE =====
      .addCase(generateAI.fulfilled, (state, action) => {
        state.aiPreview = action.payload;
      })

      // ===== DELETE BLOG =====
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.meta.arg
        );
        state.singleBlog = null;
      });
  },
});

export const {
  clearSingleBlog,
  clearAIPreview,
  toggleLikeLocal,
  toggleBookmarkLocal,
  addComment,
  removeComment,
} = blogSlice.actions;

export default blogSlice.reducer;
