import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../services/api";

// API Call
export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async(_, { getState }) =>{
    const token = getState().auth.token; //get token from redux
    console.log("TOKEN:", token);
    // const res = await axios.get("http://localhost:5000/api/dashboard/stats",{  // change the url later now it is dummy
    //   headers:{
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const res = await API.get("/dashboard/stats");
        console.log("API RESPONSE:", res.data);
    return res.data; //only return real data
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {},
    recentUsers : [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) =>{
        state.loading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) =>{
          console.log("PAYLOAD:", action.payload); // ✅ ADD THIS

        state.loading = false;
        state.stats = action.payload.stats;
        state.recentUsers = action.payload.recentUsers;
      })
      .addCase(getDashboardStats.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default dashboardSlice.reducer;