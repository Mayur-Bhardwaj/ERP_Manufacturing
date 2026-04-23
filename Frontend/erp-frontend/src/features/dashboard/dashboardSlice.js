import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// API Call
export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async() =>{
    const res = await axios.get("/api/dashboard/stats",{  // change the url later now it is dummy
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data; //only return real data
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {},
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) =>{
        state.loading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) =>{
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default dashboardSlice.reducer;