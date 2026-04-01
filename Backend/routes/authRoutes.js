import express from "express";
import { signup } from "../controllers/authController.js";
// const { register, login, signup } = require("../controllers/authController.js");

const router = express.Router();
// Here write ROUTES Only.

// router.post("/register", register);
// router.post("/login", login);
router.post("/signup", signup);

export default router;