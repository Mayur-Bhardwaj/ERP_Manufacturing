// Axios --> Axios is a popular, promise-based JavaScript library used to make HTTP requests (GET, POST, etc.) from web browsers or Node.js to APIs. It simplifies data fetching, handles JSON automatically, and supports request interception and cancellation. Axios is favored for its ease of use compared to the Fetch API

import axios from "axios";
import { notification } from "antd";
import { store } from "../app/store.js";
import { logout } from "../features/auth/authSlice";


const API =  axios.create({
  baseURL: "http://localhost:5000/api",   // our backend
});

// Prevent from multiple logout calls.
let isLoggingOut = false;

// Request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  // const token = store.getState().auth.token;  // read from redux state.

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
// Response
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      // 🔥 Clear redux state
      store.dispatch(logout());

      // 🔥 Remove token
      // localStorage.removeItem("token");

      // 🔥 Show message
      notification.warning({
        message: "Session Expired",
        description: "Please login again",
      });

      // 🔥 Redirect Safety (with slight delay)
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    }

    return Promise.reject(err);
  }
);
  
export default API;