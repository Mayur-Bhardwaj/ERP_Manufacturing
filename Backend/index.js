import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import {authMiddleware }from "./middleware/authMiddleware.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
const port = 5000;
import dotenv from "dotenv";
import { userInfo } from "node:os";

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// middleware (important for future APIs)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


// home route
app.get('/', (req, res) =>{
  res.send("Hurry !! Server is runnig.");
});

// Dashboard Route
app.use("/api", dashboardRouter);
app.use("/api", userRoutes);

app.get('/api/protected', authMiddleware, (req,res)=>{
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});


app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}`);
});