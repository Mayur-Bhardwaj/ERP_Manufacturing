import express from "express";
import authRoutes from "./routes/authRoutes.js"
const app = express();
const port = 5000;

// middleware (important for future APIs)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// home route
app.get('/', (req, res) =>{
  res.send("Hurry !! Server is runnig.");
});



app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}`);
});