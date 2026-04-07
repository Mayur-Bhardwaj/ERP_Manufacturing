import express from "express";
import { login, signup } from "../controllers/authController.js";
// const { register, login, signup } = require("../controllers/authController.js");

const router = express.Router();
// Here write ROUTES Only.

// router.post("/register", register);
// router.post("/login", login);
router.post("/signup", signup);
router.post("/login", login);

export default router;