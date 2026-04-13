import express from "express";
import { updateUserStatus } from "../controllers/userController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 Admin can update user status
router.put(
  "/users/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUserStatus
);

export default router;