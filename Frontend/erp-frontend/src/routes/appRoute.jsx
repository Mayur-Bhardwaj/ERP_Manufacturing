import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signUp";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () =>{
  return(
    <BrowserRouter>
      <Routes>
      {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />

        {/* Protected Routes */}
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;