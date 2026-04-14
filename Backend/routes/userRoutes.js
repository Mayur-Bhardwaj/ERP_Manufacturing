import express from "express";
import { deleteUser, getAllUser, getUserById, updateUser, updateUserStatus } from "../controllers/userController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 👥 Get all users (Admin only) 
router.get("/users", authMiddleware, authorizeRoles("ADMIN"),getAllUser);

// 🔍 Get single user 
router.get("/users/:id", authMiddleware,authorizeRoles("ADMIN"), getUserById);



// 🔥 Admin can update user status
router.put(
  "/users/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUserStatus
);

// ✏️ Update user 
router.put("/users/:id",authMiddleware, authorizeRoles("ADMIN"),updateUser);

// Delete user
router.delete("/users/:id",authMiddleware, authorizeRoles("ADMIN"),deleteUser);

export default router;