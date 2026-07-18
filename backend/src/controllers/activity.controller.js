import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createActivity,
  getActivityById,
  getLeadActivities,
  getUserActivities,
  getAllActivities,
  deleteActivity,
  getRecentActivities,
  getActivityStatistics,
} from "../services/activity.service.js";

/**
 * ============================================================
 * Create Activity
 * POST /activity
 * ============================================================
 */
export const createNewActivity = asyncHandler(async (req, res) => {
  const activity = await createActivity(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      activity,
      "Activity created successfully."
    )
  );
});

/**
 * ============================================================
 * Get Activity By ID
 * GET /activity/:activityId
 * ============================================================
 */
export const getSingleActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;

  const activity = await getActivityById(activityId);

  return res.status(200).json(
    new ApiResponse(
      200,
      activity,
      "Activity fetched successfully."
    )
  );
});

/**
 * ============================================================
 * Get Lead Timeline
 * GET /activity/lead/:leadId
 * ============================================================
 */
export const getLeadTimeline = asyncHandler(async (req, res) => {
  const { leadId } = req.params;
  const { page, limit } = req.query;

  const activities = await getLeadActivities(leadId, {
    page,
    limit,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      activities,
      "Lead activity timeline fetched successfully."
    )
  );
});

/**
 * ============================================================
 * Get User Activities
 * GET /activity/user/:userId
 * ============================================================
 */
export const getUserTimeline = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page, limit } = req.query;

  const activities = await getUserActivities(userId, {
    page,
    limit,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      activities,
      "User activities fetched successfully."
    )
  );
});

/**
 * ============================================================
 * Get All Activities
 * GET /activity
 * ============================================================
 */
export const getActivities = asyncHandler(async (req, res) => {
  const activities = await getAllActivities(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      activities,
      "Activities fetched successfully."
    )
  );
});

/**
 * ============================================================
 * Delete Activity
 * DELETE /activity/:activityId
 * ============================================================
 */
export const removeActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;

  const result = await deleteActivity(activityId);

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Activity deleted successfully."
    )
  );
});

/**
 * ============================================================
 * Dashboard Recent Activities
 * GET /activity/recent
 * ============================================================
 */
export const recentActivities = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const activities = await getRecentActivities(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      activities,
      "Recent activities fetched successfully."
    )
  );
});

/**
 * ============================================================
 * Activity Statistics
 * GET /activity/statistics
 * ============================================================
 */
export const activityStatistics = asyncHandler(async (req, res) => {
  const statistics = await getActivityStatistics();

  return res.status(200).json(
    new ApiResponse(
      200,
      statistics,
      "Activity statistics fetched successfully."
    )
  );
});