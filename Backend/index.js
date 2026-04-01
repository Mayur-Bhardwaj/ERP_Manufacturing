import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = 5000;

// middleware (important for future APIs)
app.use(express.json());

// home route
app.get('/', (req, res) =>{
  res.send("Hurry !! Server is runnig.");
});

// test api
app.get('/test', async (req, res) =>{
 try{
  const users = await prisma.user.findMany();
  res.json(users);
 } catch(error){
  console.log(error);
  res.status(500).json({error: "Something went wrong !!"});
 }
});

app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}`);
});