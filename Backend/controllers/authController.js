// Both login + SignUp should be in same file because they both belong to the same Authentication
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const prisma = new PrismaClient();

// ---------------------------- SIGNUP ----------------------------

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const normalizedEmail = email?.toLowerCase();  // remove the duplicacy

    // 1. Validaton

    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message: "All Fields are required"
      });
    }

    // 2. Check email format validation

    const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegix.test(normalizedEmail)){
     return res.status(400).json({
        success: false,
        message: "Invalid Email Format",
      });
    }

     // 3.check password length
    if(password.length < 6){
     return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    // 4. Checking existing user
    const existingUser = await prisma.user.findUnique({
      where : {email: normalizedEmail},
    });
    if(existingUser){
      return res.status(400).json({
        success: false,
        message : "User already exists"});
    }

    // 5. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

   

    // 6. Create user (for default role = "user")
    const user = await prisma.user.create({
      data:{
        name,
        email: normalizedEmail,  // remove the duplicacy
        password: hashedPassword,
        role: role || "USER", //default role
        status: "ACTIVE",
      }
    });

    // remove password
    const {password: _, ...safeUser} = user;
     return res.status(201).json({
      success: true,
      message: "User Created Successfully",
       user : safeUser
      });
  } catch (error){
    console.log("Sign UP Error",error);
    return res.status(500).json({
      success: false,
      message: "SignUp Failed",
    });
  }
};

//  -----------------------------------------Login -----------------------------------------------

export const login = async (req, res) =>{
  try{
    const {email, password} = req.body;

    const normalizedEmail = email.toLowerCase(); // remove the duplicacy

    // 1. Validation
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }
    // avoid duplicate emails

    // 2. check user exists
    const user = await prisma.user.findUnique({
      where : {email: normalizedEmail}  // remove the duplicacy
    });

    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
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
     JWT_SECRET,        // process.env.JWT_SECRET,
      { expiresIn : "1d"}  // again login after 24 hr, automatic logout
    );

    // 5. remove password which is shown in db
    const { password: _, ...safeUser} = user;

    return res.status(200).json({
      success:true,
      message: "Login Successful",
      token,
      user: safeUser,
      expiresIn: "1d"  // this will go to frontend.
    });
  }
  catch(error){
    console.log("Login Error",error);
    res.status(500).json({
      success:false,
      message: "Login Failed"
    });
  }
};

// ---------------------------- LOGOUT ----------------------------

export const logout = (req,res) =>{
  try{
    res.json({
      success: true,
      message: "Logged out Successfully"
    });

  } catch(error){
    console.log("Logout Error", error);
    res.status(500).json({
      success: false,
      message: "Login Failed",
    })
  }
}