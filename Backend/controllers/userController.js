// User Management
// Handles:

// Update status (ACTIVE/INACTIVE) ✅
// Get users ✅
// Delete users ✅

// 👉 Purpose = What can you do with users?

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { count } from "node:console";

const prisma = new PrismaClient();

// ---------------------------- CREATE USER (Admin) ----------------------------

export const createUser = async (req, res) =>{
  try{
    const {name, email, password, role} = req.body; // get data from the frontend

    // 1. Validation
    if(!name || !email || !password || !role){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing user

    const existingUser = await prisma.user.findUnique({
      where: {email },
    });
    if(existingUser){
      return res.status(400).json({
        success: false,
        message: "User Already Exists"
      });
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        status: "ACTIVE"
      }
    });

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user
    });
  } catch(error){
    console.log("Create User Error",error);
    res.status(500).json({
      success: false,
      message: "Failed to Create User"
    });
  }
}

// ---------------------------- GET ALL USERS ----------------------------

export const getAllUser = async (req, res) =>{
  try{
    const users = await prisma.user.findMany({
        where: { isDeleted: false }, // ✅ filter
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      },
    });
    res.json({
      success: true,
      count: users.length,
      users
    });
  }catch(error){
    console.log("Get All User Error", error);
    res.status(500).json({
      success: false,
      message: "Failed to Fetch Users"
    });
  }
};

// ---------------------------- GET SINGLE USER ----------------------------

export const getUserById = async (req, res) => {
  try{
    const {id} = req.params;
    
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
        // where: { isDeleted: false }, // ✅ filter
      },
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    // Not found user
    if(!user || user.isDeleted){
      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }
     res.json({success: true, user});

  } catch(error){
console.log("Get user error",error);
res.status(500).json({
  success: false,
  message: "Failed to fetch user",
});
  }
};

// 🔄 Update User Status (Admin only)  --> Change user status active or inactive
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

        // ✅ normalize + validate
    const formattedStatus = status?.toUpperCase();
    // validation
    if (!formattedStatus || !["ACTIVE", "INACTIVE"].includes(formattedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Status must be ACTIVE or INACTIVE",
      });
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {id: Number(id)},
    });
    if(!existingUser){
      return res.status(404).json({
        success: false,
        message: "User not Found"
      });
    }
    
    // update
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { status: formattedStatus },
    });

    res.json({
      success: true,
      message: "User status updated successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

// ---------------------------- UPDATE USER DETAILS ----------------------------

export const updateUser = async (req, res)=>{
  try{
      const {id} = req.params;
      const {name, role} =req.body;

      const user = await prisma.user.update({
        where: {id: Number(id)},
        data:{
          name,
          role
        }
      });

      res.json({
        success: true,
        message: "User update Successfully"
      });
  }
  catch(error){
    console.log("Update user error",error);
    res.status(500).json({
      success: false,
      message: "Failed to update user"
    });
  }
}

// ---------------------------- DELETE USER ---------------------------- 

export const deleteUser = async(req, res) => {
  try{
    const {id} = req.params;

    // if user exists
    const existingUser = await prisma.user.findUnique({
      where: {id: Number(id)},
    });

    if(!existingUser){
      return res.status(404).json({
        success: false,
        message:"User not found"
      });
    }
    // delete user
    await prisma.user.update({
      where: {id: Number(id)},
      data: { isDeleted: true },
    });
     // send response
  res.json({
    success: true,
    message: "User delete Successfully"
  });
  }
 
  catch(error){
    console.log("Delete User Error", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
}