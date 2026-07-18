import Lead from "../models/Lead.js";
import User from "../models/User.js";
import { LEAD_STATUS } from "../constants/lead.constants.js";
import { ROLES } from "../constants/roles.js";

/**
 * Get Reports Analytics Data
 */
export const getReportsData = async () => {
  // 1. Stats overview
  const [totalLeads, wonLeads, lostLeads] = await Promise.all([
    Lead.countDocuments({ isDeleted: false }),
    Lead.countDocuments({ isDeleted: false, status: LEAD_STATUS.WON }),
    Lead.countDocuments({ isDeleted: false, status: LEAD_STATUS.LOST }),
  ]);

  const revenueAmount = wonLeads * 15000;

  const stats = {
    totalLeads,
    wonLeads,
    lostLeads,
    revenue: revenueAmount,
  };

  // 2. Sales and Revenue Trends (Monthly aggregation)
  const monthlyData = await Lead.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalLeads: { $sum: 1 },
        wonLeads: {
          $sum: {
            $cond: [{ $eq: ["$status", LEAD_STATUS.WON] }, 1, 0],
          },
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const sales = monthlyData.map((item) => {
    const monthIdx = item._id.month - 1;
    return {
      month: `${monthNames[monthIdx]} ${item._id.year}`,
      sales: item.totalLeads,
    };
  });

  const revenue = monthlyData.map((item) => {
    const monthIdx = item._id.month - 1;
    return {
      month: `${monthNames[monthIdx]} ${item._id.year}`,
      revenue: item.wonLeads * 15000,
    };
  });

  // 3. Lead Conversion Stats (Pie Chart Status Mix)
  const pendingLeads = totalLeads - (wonLeads + lostLeads);
  const conversion = [
    { status: "Won", value: wonLeads },
    { status: "Lost", value: lostLeads },
    { status: "Pending", value: pendingLeads },
  ];

  // 4. Sales Executive Performance Table
  const salesUsers = await User.find({ role: ROLES.SALES, isDeleted: false });

  const performance = await Promise.all(
    salesUsers.map(async (user) => {
      const [assigned, won, lost] = await Promise.all([
        Lead.countDocuments({ isDeleted: false, assignedTo: user._id }),
        Lead.countDocuments({ isDeleted: false, assignedTo: user._id, status: LEAD_STATUS.WON }),
        Lead.countDocuments({ isDeleted: false, assignedTo: user._id, status: LEAD_STATUS.LOST }),
      ]);

      return {
        _id: user._id,
        fullName: user.fullName,
        assigned,
        won,
        lost,
        revenue: won * 15000,
      };
    })
  );

  return {
    stats,
    sales,
    revenue,
    conversion,
    performance,
  };
};
