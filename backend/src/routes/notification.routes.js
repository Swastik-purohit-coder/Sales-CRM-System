import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import {
  createNotificationController,
  getMyNotificationsController,
  getNotificationByIdController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  getUnreadNotificationCountController,
  deleteNotificationController,
} from "../controllers/notification.controller.js";

import {
  createNotificationValidation,
  notificationIdValidation,
  notificationPaginationValidation,
} from "../validations/notification.validation.js";

const router = express.Router();

/**
 * ==========================================
 * Protected Routes
 * ==========================================
 */
router.use(protect);

/**
 * ==========================================
 * Notification Routes
 * ==========================================
 */

// Create Notification
router.post(
  "/",
  createNotificationValidation,
  validate,
  createNotificationController
);

// Get My Notifications
router.get(
  "/",
  notificationPaginationValidation,
  validate,
  getMyNotificationsController
);

// Get Unread Notification Count
router.get(
  "/unread-count",
  getUnreadNotificationCountController
);

// Mark All Notifications As Read
router.patch(
  "/read-all",
  markAllNotificationsAsReadController
);

// Get Notification By ID
router.get(
  "/:notificationId",
  notificationIdValidation,
  validate,
  getNotificationByIdController
);

// Mark Notification As Read
router.patch(
  "/:notificationId/read",
  notificationIdValidation,
  validate,
  markNotificationAsReadController
);

// Delete Notification
router.delete(
  "/:notificationId",
  notificationIdValidation,
  validate,
  deleteNotificationController
);

export default router;