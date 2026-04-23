import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getDashboardStats = async(req, res) =>{
  try{
    //total users
    const totalUsers = await prisma.user.count({
      where: { isDeleted: false},
    });
    //Active Users
    const activeUsers = await prisma.user.count({
      where: {
        status: "ACTIVE",
        isDeleted: false,
      },
       });
      // Inactive Users
      const inactiveUsers = await prisma.user.count({
        where: {
          status: "INACTIVE",
          isDeleted: false
        },
      });
      // Admin count
      const adminUsers = await prisma.user.count({
        where: {
          role: "ADMIN",
          isDeleted: false
        },
      });
      // Recent Users
      const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name:true,
          email: true,
          role: true,
          createdAt: true
        },
      });

      return res.json({
        success: true,
        data: {
          totalUsers,
          activeUsers,
          inactiveUsers,
          adminUsers,
          recentUsers
        },
      });

  }catch(error){
    console.log("Dashboard Error",error);
    res.status(500).json({
      success: false,
      message: "Dashboard data failed"
    });
  }
};