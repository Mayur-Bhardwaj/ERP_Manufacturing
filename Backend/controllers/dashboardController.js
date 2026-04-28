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
      gstPayable,
      overduePayments
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


      // Overdue Payments
      prisma.invoice.count({
        where:{
          status: "UNPAID",
          invoiceDate: {
             lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),  // after 7 days
          },
        },
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
        overduePayments,
        lowStockItems: 0 // temporary fallback
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





export const getDashboardAnalytics = async (req, res) => {
  try {
    const { range = "7" } = req.query;

    const days = parseInt(range);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch data
    const productions = await prisma.production.findMany({
      where: { createdAt: { gte: startDate } },
      select: { quantity: true, unitCost: true, createdAt: true },
    });

    const payments = await prisma.payment.findMany({
      where: { createdAt: { gte: startDate } },
      select: { amount: true, createdAt: true },
    });

    const productionMap = {};
    const revenueMap = {};
    const costMap = {};

    // Production + Cost
    productions.forEach((p) => {
      const date = p.createdAt.toISOString().split("T")[0];

      productionMap[date] = (productionMap[date] || 0) + p.quantity;

      const cost = p.quantity * (p.unitCost || 0);
      costMap[date] = (costMap[date] || 0) + cost;
    });

    // Revenue
    payments.forEach((p) => {
      const date = p.createdAt.toISOString().split("T")[0];
      revenueMap[date] = (revenueMap[date] || 0) + p.amount;
    });

    // Final result
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const date = d.toISOString().split("T")[0];

      const production = productionMap[date] || 0;
      const revenue = revenueMap[date] || 0;
      const cost = costMap[date] || 0;

      result.push({
        date,
        production,
        revenue,
        cost,
        profit: revenue - cost,
      });
    }

    res.json({
      success: true,
      chart: result,
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ success: false });
  }
};