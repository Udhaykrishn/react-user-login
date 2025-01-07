// adminAuthSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get initial state from localStorage
const getInitialAdminState = () => ({
  pending: false,
  error: null,
  isAdmin: localStorage.getItem("isAdmin") === "true"
});

export const adminAuthLogin = createAsyncThunk(
  "admin/login",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/admin/login", payload);
      // Only store the isAdmin status
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
      // Remove isAdmin status on logout
      localStorage.removeItem("isAdmin");
      return data?.success;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: getInitialAdminState(),
  extraReducers: (builder) => {
    builder
      .addCase(adminAuthLogin.pending, (state) => {
        state.pending = true;
      })
      .addCase(adminAuthLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAdmin = false;
        state.pending = false;
        localStorage.removeItem("isAdmin");
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
      });
  }
});

export default adminAuthSlice.reducer;