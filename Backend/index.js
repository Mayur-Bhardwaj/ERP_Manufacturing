import express from "express";
const app = express();
const port = 5000;

app.get('/', (req, res) =>{
  res.send("Hurry !! Server is runnig.");
});

app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}`);
});