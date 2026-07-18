import express from "express";

import {
  getSingleActivity,
  getLeadTimeline,
  getUserTimeline,
  getActivities,
  removeActivity,
  recentActivities,
  activityStatistics,
} from "../controllers/activity.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  activityIdValidation,
  leadTimelineValidation,
  userTimelineValidation,
  activityQueryValidation,
  recentActivityValidation,
} from "../validations/activity.validation.js";

const router = express.Router();

/**
 * All Activity Routes Require Authentication
 */
router.use(protect);

/**
 * Get Recent Activities
 * GET /api/v1/activities/recent
 */
router.get(
  "/recent",
  authorize(ROLES.ADMIN),
  recentActivityValidation,
  validate,
  recentActivities
);

/**
 * Get Activity Statistics
 * GET /api/v1/activities/statistics
 */
router.get(
  "/statistics",
  authorize(ROLES.ADMIN),
  activityStatistics
);

/**
 * Get Lead Activity Timeline
 * GET /api/v1/activities/lead/:leadId
 */
router.get(
  "/lead/:leadId",
  leadTimelineValidation,
  validate,
  getLeadTimeline
);

/**
 * Get User Activity Timeline
 * GET /api/v1/activities/user/:userId
 */
router.get(
  "/user/:userId",
  userTimelineValidation,
  validate,
  getUserTimeline
);

/**
 * Get All Activities
 * GET /api/v1/activities
 */
router.get(
  "/",
  activityQueryValidation,
  validate,
  getActivities
);

/**
 * Get Activity By ID
 * GET /api/v1/activities/:activityId
 */
router.get(
  "/:activityId",
  activityIdValidation,
  validate,
  getSingleActivity
);

/**
 * Delete Activity
 * DELETE /api/v1/activities/:activityId
 */
router.delete(
  "/:activityId",
  authorize(ROLES.ADMIN),
  activityIdValidation,
  validate,
  removeActivity
);

export default router;