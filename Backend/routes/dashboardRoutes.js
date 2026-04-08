import express from "express";
import authMiddleware, { authorizeRoles } from "../middleware/authMiddleware.js";
import router from "./authRoutes.js";
const  dashboardRouter = express.Router();

// Protected Route -- This is for Normal User
dashboardRouter.get('/dashboard', authMiddleware, (req, res) =>{
  res.json({
    message: "Welcome to Dashboard",
    user: req.user
  });
});

// Admins Only

router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) =>{
  res.json({
    message: "Admin Panel"
  });
});

export default dashboardRouter;