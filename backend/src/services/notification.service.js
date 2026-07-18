import Notification from "../models/Notification.js";
import ApiError from "../utils/ApiError.js";
import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPE,
} from "../constants/notification.constants.js";

/**
 * ==========================================
 * Create Notification
 * ==========================================
 */
export const createNotification = async ({
  recipient,
  sender = null,
  title,
  message,
  type = NOTIFICATION_TYPE.SYSTEM,
  priority = NOTIFICATION_PRIORITY.MEDIUM,
  referenceId = null,
  referenceModel = null,
}) => {
  const notification = await Notification.create({
    recipient,
    sender,
    title,
    message,
    type,
    priority,
    referenceId,
    referenceModel,
  });

  return await Notification.findById(notification._id)
    .populate("recipient", "fullName email role")
    .populate("sender", "fullName email role");
};

/**
 * ==========================================
 * Get My Notifications
 * ==========================================
 */
export const getMyNotifications = async ({
  userId,
  page = 1,
  limit = 10,
}) => {
  const query = {
    recipient: userId,
    isDeleted: false,
  };

  const skip = (Number(page) - 1) * Number(limit);

  const notifications = await Notification.find(query)
    .populate("sender", "fullName email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Notification.countDocuments(query);

  return {
    notifications,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * ==========================================
 * Get Notification By ID
 * ==========================================
 */
export const getNotificationById = async (
  notificationId,
  userId
) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    recipient: userId,
    isDeleted: false,
  }).populate("sender", "fullName email");

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  return notification;
};

/**
 * ==========================================
 * Mark Notification As Read
 * ==========================================
 */
export const markNotificationAsRead = async (
  notificationId,
  userId
) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    recipient: userId,
    isDeleted: false,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  notification.isRead = true;
  notification.status = NOTIFICATION_STATUS.READ;
  notification.readAt = new Date();

  await notification.save({
    validateBeforeSave: false,
  });

  return notification;
};

/**
 * ==========================================
 * Mark All Notifications As Read
 * ==========================================
 */
export const markAllNotificationsAsRead = async (
  userId
) => {
  await Notification.updateMany(
    {
      recipient: userId,
      isDeleted: false,
      status: NOTIFICATION_STATUS.UNREAD,
    },
    {
      $set: {
        isRead: true,
        status: NOTIFICATION_STATUS.READ,
        readAt: new Date(),
      },
    }
  );

  return {
    message: "All notifications marked as read.",
  };
};

/**
 * ==========================================
 * Get Unread Count
 * ==========================================
 */
export const getUnreadNotificationCount =
  async (userId) => {
    const count = await Notification.countDocuments({
      recipient: userId,
      isDeleted: false,
      status: NOTIFICATION_STATUS.UNREAD,
    });

    return { unreadCount: count };
  };

/**
 * ==========================================
 * Delete Notification
 * ==========================================
 */
export const deleteNotification = async (
  notificationId,
  userId
) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    recipient: userId,
    isDeleted: false,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  notification.isDeleted = true;

  await notification.save({
    validateBeforeSave: false,
  });

  return {
    message: "Notification deleted successfully.",
  };
};