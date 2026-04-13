// User Management
// Handles:

// Update status (ACTIVE/INACTIVE) ✅
// Get users ✅
// Delete users ✅

// 👉 Purpose = What can you do with users?

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔄 Update User Status (Admin only)  --> Change user status active or inactive
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validation
    if (!status || !["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be ACTIVE or INACTIVE",
      });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { status },
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