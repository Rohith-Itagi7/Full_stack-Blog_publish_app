//  import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     token: token || null,
//     user: user ? JSON.parse(user) : null,
//     isAuthenticated: !!token,
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;

//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;

//       localStorage.clear();
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;
// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

/* =========================
   ASYNC THUNKS
========================= */

// 🔄 UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await api.put("/profile", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

/* =========================
   INITIAL STATE
========================= */
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    builder
      // ===== UPDATE PROFILE =====
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          ...state.user,
          name: action.payload.name,
          bio: action.payload.bio,
          profilePic: action.payload.profilePic,
        };

        // 🔥 keep localStorage in sync
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
