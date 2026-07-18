import Lead from "../models/Lead.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";
import { LEAD_STATUS } from "../constants/lead.constants.js";

/**
 * Dashboard Overview
 */
export const getOverview = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [
    totalLeads,
    wonLeads,
    lostLeads,
    activeLeads,
    todayFollowUps,
    totalSalesExecutives,
  ] = await Promise.all([
    Lead.countDocuments({
      isDeleted: false,
    }),

    Lead.countDocuments({
      isDeleted: false,
      status: LEAD_STATUS.WON,
    }),

    Lead.countDocuments({
      isDeleted: false,
      status: LEAD_STATUS.LOST,
    }),

    Lead.countDocuments({
      isDeleted: false,
      status: {
        $nin: [LEAD_STATUS.WON, LEAD_STATUS.LOST],
      },
    }),

    Lead.countDocuments({
      isDeleted: false,
      followUpDate: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }),

    User.countDocuments({
      role: ROLES.SALES,
      isDeleted: false,
      isActive: true,
    }),
  ]);

  return {
    totalLeads,
    activeLeads,
    wonLeads,
    lostLeads,
    todayFollowUps,
    totalSalesExecutives,
  };
};

/**
 * Lead Status Statistics
 */
export const getLeadStatusStats = async () => {
  return await Lead.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);
};

/**
 * Lead Source Statistics
 */
export const getLeadSourceStats = async () => {
  return await Lead.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$source",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        source: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);
};
/**
 * Monthly Lead Statistics
 */
export const getMonthlyLeadStats = async () => {
  return await Lead.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
          year: {
            $year: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        year: "$_id.year",
        count: 1,
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ]);
};

/**
 * Top Sales Executives
 */
export const getTopSalesExecutives = async (limit = 5) => {
  return await Lead.aggregate([
    {
      $match: {
        isDeleted: false,
        assignedTo: {
          $ne: null,
        },
      },
    },

    {
      $group: {
        _id: "$assignedTo",

        assignedLeads: {
          $sum: 1,
        },

        wonLeads: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", LEAD_STATUS.WON],
              },
              1,
              0,
            ],
          },
        },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "salesExecutive",
      },
    },

    {
      $unwind: "$salesExecutive",
    },

    {
      $project: {
        _id: 0,

        userId: "$salesExecutive._id",

        fullName: "$salesExecutive.fullName",

        email: "$salesExecutive.email",

        assignedLeads: 1,

        wonLeads: 1,

        conversionRate: {
          $round: [
            {
              $multiply: [
                {
                  $divide: [
                    "$wonLeads",
                    {
                      $cond: [
                        {
                          $eq: ["$assignedLeads", 0],
                        },
                        1,
                        "$assignedLeads",
                      ],
                    },
                  ],
                },
                100,
              ],
            },
            2,
          ],
        },
      },
    },

    {
      $sort: {
        wonLeads: -1,
        assignedLeads: -1,
      },
    },

    {
      $limit: Number(limit),
    },
  ]);
};
/**
 * Today's Follow Ups
 */
export const getTodayFollowUps = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return await Lead.find({
    isDeleted: false,
    followUpDate: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
  })
    .populate("assignedTo", "fullName email phone")
    .populate("createdBy", "fullName email")
    .sort({
      followUpDate: 1,
    })
    .lean();
};

/**
 * Recent Leads
 */
export const getRecentLeads = async (limit = 10) => {
  return await Lead.find({
    isDeleted: false,
  })
    .populate("assignedTo", "fullName email")
    .populate("createdBy", "fullName email")
    .sort({
      createdAt: -1,
    })
    .limit(Number(limit))
    .lean();
};

/**
 * Complete Dashboard
 */
export const getDashboardOverview = async () => {
  const [
    overview,
    leadStatus,
    leadSource,
    monthlyLeads,
    topSalesExecutives,
    todayFollowUps,
    recentLeads,
  ] = await Promise.all([
    getOverview(),
    getLeadStatusStats(),
    getLeadSourceStats(),
    getMonthlyLeadStats(),
    getTopSalesExecutives(),
    getTodayFollowUps(),
    getRecentLeads(),
  ]);

  return {
    overview,
    leadStatus,
    leadSource,
    monthlyLeads,
    topSalesExecutives,
    todayFollowUps,
    recentLeads,
  };
};