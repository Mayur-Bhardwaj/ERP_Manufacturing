// Both login + SignUp should be in same file because they both belong to the same Authentication
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validaton

    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message: "All Fields are required"
      });
    }

    // 2. Checking existing user
    const existingUser = await prisma.user.findUnique({
      where : {email}
    });
    if(existingUser){
      return res.status(400).json({message : "User already exists"});
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user (for default role = "user")
    const user = await prisma.user.create({
      data:{
        name,
        email,
        password: hashedPassword,
        role: role || "user", //default role
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

    // 1. Validation
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }
    // 2. check user exists
    const user = await prisma.user.findUnique({
      where : {email}
    });

    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password !!"
      });
    }

    // 2.1 Check user Status
    if(user.status !== "ACTIVE"){
      return res.status(403).json({
        success: false,
        message: "User is inactive, Contact Admin.",
      });
    }
    // 3. Compare password
    const isMatch  = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password."
      });
    }

    // 4. Generate token
    const token = jwt.sign({
      id: user.id,
       email: user.email, 
       role: user.role  // imp
      },
      process.env.JWT_SECRET,
      { expiresIn : "1d"}  // again login after 24 hr, automatic logout
    );

    // 5. remove password which is shown in db
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
    res.status(500).json({
      success:false,
      message: "Login Failed"
    });
  }
};