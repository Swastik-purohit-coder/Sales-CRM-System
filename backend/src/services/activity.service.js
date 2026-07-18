import Activity from "../models/Activity.js";
import Lead from "../models/Lead.js";
import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";

/**
 * ============================================================
 * Create Activity
 * ============================================================
 */
export const createActivity = async ({
  entityType,
  entityId,
  lead = null,
  performedBy,
  action,
  level,
  message,
  oldValue = null,
  newValue = null,
  remarks = "",
}) => {
  const activity = await Activity.create({
    entityType,
    entityId,
    lead,
    performedBy,
    action,
    level,
    message,
    oldValue,
    newValue,
    remarks,
  });

  return await Activity.findById(activity._id)
    .populate("performedBy", "fullName email role")
    .populate("lead", "name company status assignedTo")
    .lean();
};

/**
 * ============================================================
 * Get Activity By ID
 * ============================================================
 */
export const getActivityById = async (activityId) => {
  const activity = await Activity.findOne({
    _id: activityId,
    isDeleted: false,
  })
    .populate("performedBy", "fullName email role")
    .populate("lead", "name company status assignedTo")
    .lean();

  if (!activity) {
    throw new ApiError(404, "Activity not found.");
  }

  return activity;
};

/**
 * ============================================================
 * Get Lead Timeline
 * ============================================================
 */
export const getLeadActivities = async (
  leadId,
  {
    page = 1,
    limit = 10,
  } = {}
) => {
  const lead = await Lead.findOne({
    _id: leadId,
    isDeleted: false,
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  const skip = (Number(page) - 1) * Number(limit);

  const activities = await Activity.find({
    lead: leadId,
    isDeleted: false,
  })
    .populate("performedBy", "fullName email role")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  const total = await Activity.countDocuments({
    lead: leadId,
    isDeleted: false,
  });

  return {
    activities,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};
/**
 * ============================================================
 * Get User Activities
 * ============================================================
 */
export const getUserActivities = async (
  userId,
  {
    page = 1,
    limit = 10,
  } = {}
) => {
  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const skip = (Number(page) - 1) * Number(limit);

  const activities = await Activity.find({
    performedBy: userId,
    isDeleted: false,
  })
    .populate("performedBy", "fullName email role")
    .populate("lead", "name company status assignedTo")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  const total = await Activity.countDocuments({
    performedBy: userId,
    isDeleted: false,
  });

  return {
    activities,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * ============================================================
 * Get All Activities
 * ============================================================
 */
export const getAllActivities = async ({
  page = 1,
  limit = 10,
  search = "",
  action,
  level,
  performedBy,
  sortBy = "createdAt",
  order = "desc",
}) => {
  const query = {
    isDeleted: false,
  };

  if (action) {
    query.action = action;
  }

  if (level) {
    query.level = level;
  }

  if (performedBy) {
    query.performedBy = performedBy;
  }

  if (search) {
    query.$or = [
      {
        message: {
          $regex: search,
          $options: "i",
        },
      },
      {
        remarks: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const activities = await Activity.find(query)
    .populate("performedBy", "fullName email role")
    .populate("lead", "name company status assignedTo")
    .sort({
      [sortBy]: order === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  const total = await Activity.countDocuments(query);

  return {
    activities,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};
/**
 * ============================================================
 * Soft Delete Activity
 * ============================================================
 */
export const deleteActivity = async (activityId) => {
  const activity = await Activity.findOne({
    _id: activityId,
    isDeleted: false,
  });

  if (!activity) {
    throw new ApiError(404, "Activity not found.");
  }

  activity.isDeleted = true;

  await activity.save({
    validateBeforeSave: false,
  });

  return {
    message: "Activity deleted successfully.",
  };
};

/**
 * ============================================================
 * Get Recent Activities
 * Used for Dashboard Timeline
 * ============================================================
 */
export const getRecentActivities = async (limit = 10) => {
  return await Activity.find({
    isDeleted: false,
  })
    .populate("performedBy", "fullName email role")
    .populate("lead", "name company status assignedTo")
    .sort({
      createdAt: -1,
    })
    .limit(Number(limit))
    .lean();
};

/**
 * ============================================================
 * Get Activity Statistics
 * ============================================================
 */
export const getActivityStatistics = async () => {
  const totalActivities = await Activity.countDocuments({
    isDeleted: false,
  });

  const activitiesByAction = await Activity.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$action",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        action: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  return {
    totalActivities,
    activitiesByAction,
  };
};