import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createNotification,
  getMyNotifications,
  getNotificationById,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  deleteNotification,
} from "../services/notification.service.js";

/**
 * ==========================================
 * Create Notification
 * POST /notifications
 * ==========================================
 */
export const createNotificationController = asyncHandler(
  async (req, res) => {
    const notification = await createNotification(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "Notification created successfully.",
        notification
      )
    );
  }
);

/**
 * ==========================================
 * Get My Notifications
 * GET /notifications
 * ==========================================
 */
export const getMyNotificationsController = asyncHandler(
  async (req, res) => {
    const notifications = await getMyNotifications({
      userId: req.user._id,
      page: req.query.page,
      limit: req.query.limit,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Notifications fetched successfully.",
        notifications
      )
    );
  }
);

/**
 * ==========================================
 * Get Notification By ID
 * GET /notifications/:notificationId
 * ==========================================
 */
export const getNotificationByIdController =
  asyncHandler(async (req, res) => {
    const notification = await getNotificationById(
      req.params.notificationId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Notification fetched successfully.",
        notification
      )
    );
  });

/**
 * ==========================================
 * Mark Notification As Read
 * PATCH /notifications/:notificationId/read
 * ==========================================
 */
export const markNotificationAsReadController =
  asyncHandler(async (req, res) => {
    const notification = await markNotificationAsRead(
      req.params.notificationId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Notification marked as read.",
        notification
      )
    );
  });

/**
 * ==========================================
 * Mark All Notifications As Read
 * PATCH /notifications/read-all
 * ==========================================
 */
export const markAllNotificationsAsReadController =
  asyncHandler(async (req, res) => {
    const result = await markAllNotificationsAsRead(
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result.message,
        null
      )
    );
  });

/**
 * ==========================================
 * Get Unread Count
 * GET /notifications/unread-count
 * ==========================================
 */
export const getUnreadNotificationCountController =
  asyncHandler(async (req, res) => {
    const count = await getUnreadNotificationCount(
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Unread notification count fetched successfully.",
        count
      )
    );
  });

/**
 * ==========================================
 * Delete Notification
 * DELETE /notifications/:notificationId
 * ==========================================
 */
export const deleteNotificationController =
  asyncHandler(async (req, res) => {
    const result = await deleteNotification(
      req.params.notificationId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result.message,
        null
      )
    );
  });