// Both login + SignUp should be in same file because they both belong to the same Authentication
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const prisma = new PrismaClient();


// -----------------------------ROLE DEFINED ----------------------

const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};
// ---------------------------- SIGNUP ----------------------------

export const signup = async (req, res) => {
  try {
    const { name,
        username,
        email,
        password,
        confirmPassword,
        role,
        phone,
        companyName,
        gstNumber,
        address,
        country,
        state,
        city,
        zipCode } = req.body;

    const normalizedEmail = email?.toLowerCase();  // remove the duplicacy
    const normalizedUsername = username?.toLowerCase();
    // 1. Validaton

    if(!name || !username || !email || !password || !confirmPassword){
      return res.status(400).json({
        success: false,
        message: "All Fields are required"
      });
    }

    // 2. Check email format validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(normalizedEmail)){
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

    // 4. Compare Password
    if(password !== confirmPassword){
      return res.status(400).json({
        success: false,
        message:"Password doesnot match"
      });
    }

    // Strong Password
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

     if(!passwordRegex.test(password)){
      return res.status(400).json({
        success: false,
        message: "Password must contain letter, number, special character"
      });
     }

     // Phone validation (India basic)
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

     // GST validation (optional)
    if (gstNumber && !/^[0-9A-Z]{15}$/.test(gstNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid GST number",
      });
    }

    // check existing email
    const existingEmail = await prisma.user.findUnique({
      where: {email:normalizedEmail}
    });
     if (existingEmail && !existingEmail.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 5. Checking existing user     // check duplicate username

    const existingUsername = await prisma.user.findUnique({
      where : { username: normalizedUsername },
    });
    if(existingUsername){
      return res.status(400).json({
        success: false,
        message : "User already exists for signup."});
    }

    // 5. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ROLE Handling
      let finalRole = ROLES.USER;
      if(role === ROLES.ADMIN) {
        finalRole = ROLES.ADMIN;
      }
    // 6. Create user (for default role = "user") and save in db
    const user = await prisma.user.create({
      data:{
        name,
        username: normalizedUsername,
        email: normalizedEmail,  // remove the duplicacy
        password: hashedPassword,
        role: finalRole, //default role
        status: "ACTIVE",
        isDeleted: false,
        phone,
        companyName,
        gstNumber,
        address,
        country,
        state,
        city,
        zipCode
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
    console.log("Signup Error",error);
    return res.status(500).json({
      success: false,
      message: "SignUp Failed",
    });
  }
};

//  -----------------------------------------Login -----------------------------------------------

export const login = async (req, res) =>{

  try{
    const {username, password} = req.body;

    const normalizedUsername= username?.toLowerCase(); // remove the duplicacy

    // 1. Validation
    if(!normalizedUsername || !password){
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    // 2. check user exists or find user by username 
    const user = await prisma.user.findUnique({
      where : {username: normalizedUsername}  // remove the duplicacy
    });

    if(!user){
      return res.status(400).json({
        success: false,
        message: "Invalid Username or Password"
      });
    }
    // Soft delete
      if (user.isDeleted) {
      return res.status(403).json({
        success: false,
        message: "Account removed. Contact admin.",
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
        message: "Invalid Username or Password."
      });
    }

    // 4. Generate token
    const token = jwt.sign({
       id: user.id,
       role: user.role  // role come from db
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