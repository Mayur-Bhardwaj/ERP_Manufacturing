import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API from "../../services/api";

// API Call
// export const getDashboardStats = createAsyncThunk(
//   "dashboard/getStats",
//   async(_, { getState, rejectWithValue }) =>{
//     try{
//     const token = getState().auth.token; //get token from redux
//     console.log("TOKEN:", token);

//     const res = await API.get("http://localhost:5000/api/dashboard/stats",{  // change the url later now it is dummy
//       headers:{
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // const res = await API.get("/dashboard/stats");
//         // console.log("API RESPONSE:", res.data); 
//     return res.data; //only return real data
//   }
// );
export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API RESPONSE:", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Dashboard fetch failed"
      );
    }
  }
);

export const getDashboardAnalytics = createAsyncThunk(
  "dashboard/getAnalytics",
  async (range = 7, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await API.get(`/dashboard/analytics?range=${range}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.chart;
    } catch (error) {
      return rejectWithValue("Analytics fetch failed");
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      totalProduction: 0,
    activeOrders: 0,
    pendingOrders: 0,
    totalInvoices: 0,
    totalPayments: 0,
    gstPayable: 0,
    overduePayments: 0,
    lowStockItems: 0,  
    },
    recentUsers : [],
    chartData: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
    // Stats
      .addCase(getDashboardStats.pending, (state) =>{
        state.loading = true;
      })
      // .addCase(getDashboardStats.fulfilled, (state, action) =>{
      //     console.log("PAYLOAD:", action.payload); // ✅ ADD THIS

      //   state.loading = false;
      //   state.stats = action.payload.stats;
      //   state.recentUsers = action.payload.recentUsers;
      // })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;

        console.log("PAYLOAD:", action.payload);

        // ✅ FIX: Merge instead of overwrite
        // state.stats = {
        //   ...state.stats,
        //   ...action.payload?.stats,
        // };
        state.stats = action.payload.stats;
        state.recentUsers = action.payload?.recentUsers || [];
      })
      .addCase(getDashboardStats.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
    //  Analytics (chart)
    .addCase(getDashboardAnalytics.pending, (state) =>{
      state.loading = true;
    })
    .addCase(getDashboardAnalytics.fulfilled, (state, action) =>{
      state.loading = false;
      state.chartData = action.payload;
    })
    .addCase(getDashboardAnalytics.rejected, (state, action) =>{
      state.loading = false;
      state.action = action.payload;
    })
  },
});
export default dashboardSlice.reducer;