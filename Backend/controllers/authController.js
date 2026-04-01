// // LOGIN + REGISTER Logic.
// // In controller write API Logic.

// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Make sure to set this in your environment variables
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// // REGISTER
// exports.register = (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }

//   const hash = bcrypt.hashSync(password, 10);

//   const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
//   db.query(sql, [username, hash], (err) => {
//     if (err) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     res.json({ message: "User registered successfully" });
//   });
// };

// // LOGIN
// exports.login = (req, res) => {
//   const { username, password } = req.body;
//     if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }


//   const sql = "SELECT * FROM users WHERE username = ?";
//   db.query(sql, [username], (err, result) => {
//     if (err) return res.status(500).json({ message: "Server error" });

//     if (result.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = result[0];
//     const isMatch = bcrypt.compareSync(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({ message: "Login successful", userId: user.id });

//      // 🔐 Create token (8 hours expiry)
//     const token = jwt.sign(
//       { userId: user.id, username: user.username },
//       JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       expiresIn: "8 hours",
//       userId: user.id
//     });
//   });
// };

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where : {email}
    });
    if(existingUser){
      return res.status(400).json({message : "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data:{
        name,
        email,
        password: hashedPassword,
        role
      }
    });

    // remove password
    const {password: _, ...safeuser} = user;
    res.json({message: "User is created", user : safeuser});
  } catch (error){
    console.log(error);
    res.status(500).json({"message": "SignUp Failed"})
  }
};