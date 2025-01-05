import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/profile");
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch user profile");
    }
  }
);

export const userLogout = createAsyncThunk(
  'user/userLogout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/logout");
      return response?.data?.success;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editUserProfile",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/user/update/${userId}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      if(response.data.success){
        return response?.data?.user;
      }
    } catch (error) {
      console.log(error.response.data.message)
      return rejectWithValue(error?.response?.data?.message || "Failed to edit user profile");
    }
  }
);

const userProfileSlice = createSlice({
  name: "profile",
  initialState: {
    data: {
      id: "",
      username: "",
      email: "",
      role: "user",
      photo: "",
      password: "••••••••"
    },
    loading: false,
    error: null,
    isLogged: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(userLogout.fulfilled,(state)=>{
        state.isLogged = false
        state.data = {}
      })
  }
});

export const { setData } = userProfileSlice.actions;
export default userProfileSlice.reducer;