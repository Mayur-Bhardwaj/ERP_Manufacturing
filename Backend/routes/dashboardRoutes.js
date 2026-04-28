import express from "express";
import {authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { getDashboardStats, getDashboardAnalytics } from "../controllers/dashboardController.js";

const  dashboardRouter = express.Router();

// Protected Route -- This is for Normal User or Main Dashboard API
dashboardRouter.get("/stats", authMiddleware, getDashboardStats);
console.log("Dashboard router loaded");

// Admins Only

dashboardRouter.get("/admin", authMiddleware, authorizeRoles("ADMIN"), (req, res) =>{
  res.json({
    message: "Admin Dashboard"
  });
});

dashboardRouter.get("/analytics",authMiddleware, getDashboardAnalytics);


dashboardRouter.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");
  res.send("Dashboard route working");
});

export default dashboardRouter;