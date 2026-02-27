import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./authService";
import axios from "axios";

// const BASE_URL =  "http://localhost:5000/api/auth";

// Get user from localStorage (if logged in previously)
const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await loginUser(data); // backend returns { token, userId, message }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,  // stores token & userId from backend
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    // Login Pending
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
            // LOGIN SUCCESS
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;  // store { token, userId, message } from backend

          // ✅ store token/user
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
            // LOGIN FAILED
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Login Failed";
        state.user = null;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
