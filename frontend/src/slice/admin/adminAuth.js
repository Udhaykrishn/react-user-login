// adminAuthSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getInitialAdminState = () => ({
  pending: false,
  error: null,
  isAdmin: localStorage.getItem("isAdmin") === "true",
  isInitialized: false  // Add this to track initial auth check
});

// Add axios interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("isAdmin");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const checkAdminAuth = createAsyncThunk(
  "admin/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/dashboard/check-auth");
      return response.data.isAuthenticated;
    } catch (error) {
      console.log(error)
      localStorage.removeItem("isAdmin");
      return rejectWithValue(false);
    }
  }
);

export const adminAuthLogin = createAsyncThunk(
  "admin/login",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/admin/login", payload);
      localStorage.setItem("isAdmin", "true");
      return data?.admin;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const adminAuthLogout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/admin/dashboard/logout");
      localStorage.removeItem("isAdmin");
      return data?.success;
    } catch (error) {
      localStorage.removeItem("isAdmin");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: getInitialAdminState(),
  extraReducers: (builder) => {
    builder
      .addCase(checkAdminAuth.pending, (state) => {
        state.pending = true;
      })
      .addCase(checkAdminAuth.fulfilled, (state, action) => {
        state.isAdmin = action.payload;
        state.isInitialized = true;
        state.pending = false;
      })
      .addCase(checkAdminAuth.rejected, (state) => {
        state.isAdmin = false;
        state.isInitialized = true;
        state.pending = false;
      })
      .addCase(adminAuthLogin.pending, (state) => {
        state.pending = true;
      })
      .addCase(adminAuthLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAdmin = false;
        state.pending = false;
      })
      .addCase(adminAuthLogin.fulfilled, (state) => {
        state.error = null;
        state.pending = false;
        state.isAdmin = true;
      })
      .addCase(adminAuthLogout.fulfilled, (state) => {
        state.isAdmin = false;
        state.error = null;
      })
      .addCase(adminAuthLogout.rejected, (state, action) => {
        state.error = action.payload;
        state.isAdmin = false;
      });
  }
});

export default adminAuthSlice.reducer;