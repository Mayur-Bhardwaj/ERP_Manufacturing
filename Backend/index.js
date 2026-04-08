import express from "express";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

const app = express();
const port = 5000;
import dotenv from "dotenv";
import { userInfo } from "node:os";

dotenv.config();
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

app.get('/api/protected', authMiddleware, (req,res)=>{
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});


app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}`);
});