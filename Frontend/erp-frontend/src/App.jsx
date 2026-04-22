// import {React } from 'react';
// import AppRoutes from './routes/appRoute';


// function App() {
//   return <AppRoutes />
// }

// export default App;

import React, { useEffect } from "react";
import AppRoutes from "./routes/appRoute";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { notification } from "antd";

// Add a autologout after 24 hrs / token expires

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000; // convert to ms
      const currentTime = Date.now();

      const timeLeft = expiryTime - currentTime;

      if (timeLeft <= 0) {

        notification.warning({
        message: "Session Expired",
        description: "Please login again",
      });
        dispatch(logout());
      } else {
        const timer = setTimeout(() => {
           notification.warning({
            message: "Session Expired",
            description: "Please login again",
            placement: "topRight",
          });
          dispatch(logout());
        }, timeLeft);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return <AppRoutes />;
}

export default App;