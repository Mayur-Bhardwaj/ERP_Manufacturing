// Login API
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
// const bcrypt = require("bcryptjs");
// const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});

// | Action   | URL                                            |
// | -------- | ---------------------------------------------- |
// | Register | `POST http://localhost:5000/api/auth/register` |
// | Login    | `POST http://localhost:5000/api/auth/login`    |
