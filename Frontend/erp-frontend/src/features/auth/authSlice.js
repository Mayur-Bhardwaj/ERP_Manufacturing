// Redux Slice is created
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, {rejectWithValue} ) => {
        console.log("API CALL STARTED", data); // ✅

    try{
        const res = await API.post("/auth/login", data);
              console.log("API RESPONSE", res.data); // ✅

        return res.data;
    }catch (err){
            console.log("API ERROR", err); // ✅

        return rejectWithValue(err.response.data);
    }
  }
);

// SIGNUP

export const signUpUser = createAsyncThunk(
  "auth/signupUser",
  async(data, {rejectWithValue}) =>{
    try{
        const res = await API.post("/auth/signup", data);
        return res.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    isLoggedIn: !!localStorage.getItem("token"),  // befor this false set and dut to which need login everytime.
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      // remove token from browser
      localStorage.removeItem("token");
    },
    resetLoginFlag: (state) =>{
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) =>{
    builder
    // LOGIN
    .addCase(loginUser.pending, (state) =>{
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) =>{
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      // store token
      localStorage.setItem("token", action.payload.token);

    })
    .addCase(loginUser.rejected, (state, action) =>{
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false; // prevent from false trigger
    })

    // SIGNUP
    .addCase(signUpUser.pending, (state) =>{
      state.loading = true;
    })
    .addCase(signUpUser.fulfilled, (state) =>{
      state.loading = false;
    })
    .addCase(signUpUser.rejected, (state,action) =>{
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { logout, resetLoginFlag } = authSlice.actions;
export default authSlice.reducer;