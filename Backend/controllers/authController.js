// Both login + SignUp should be in same file because they both belong to the same Authentication
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

//  -----------------------------------------Login -----------------------------------------------

export const login = async (req, res) =>{
  try{
    const {email, password} = req.body;

    // check user exists
    const user = await prisma.user.findUnique({
      where : {email}
    });

    if(!user){
      return res.status(400).json({message: "Invalid Email or Password !!"})
    }
    // compare password
    const isMatch  = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({message: "Invalid Email or Password."});
    }

    // generate token
    const token = jwt.sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn : "1d"}  // again login after 24 hr, automatic logout
    );

    // remove password which is shown in db
    const { password: _, ...safeuser} = user;

    res.json({
      message: "Login Successful",
      token,
      user: safeuser,
      expiresIn: "1d"  // this will go to frontend.
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "Login Failed"});
  }
}