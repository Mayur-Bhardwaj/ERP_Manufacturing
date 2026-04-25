import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {

    const [
      totalProduction,
      activeOrders,
      pendingOrders,
      totalInvoices,
      totalPayments,
      gstPayable
    ] = await Promise.all([
      //Total Production
      prisma.production.count(),

      //Active Orders
      prisma.order.count({
        where: { status: "ACTIVE" },
      }),

      // Pending Orders
      prisma.order.count({
        where: { status: "PENDING" },
      }),

      //Total Invoices
      prisma.invoice.count(),

            // Total Payments (sum)
      prisma.payment.aggregate({
        _sum: { amount: true },
      }),

            // GST Payable (sum)
      prisma.invoice.aggregate({
        _sum: { gstAmount: true },
      }),

    ]);

    res.json({
      success: true,
      stats: {
        totalProduction,
        activeOrders,
        pendingOrders,
        totalInvoices,
        totalPayments: totalPayments._sum?.amount || 0,
        gstPayable: gstPayable._sum?.gstAmount || 0,
      },
    });

  } catch (error) {
      console.error("Dashboard Error",error);
    res.status(500).json({
      success: false,
      message: "Dashboard error",
    });
  }
};