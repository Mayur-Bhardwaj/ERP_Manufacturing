import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);
console.log("THIS IS NEW SERVER FILE RUNNING");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});