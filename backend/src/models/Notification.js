import mongoose from "mongoose";
import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPE,
} from "../constants/notification.constants.js";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPE),
      default: NOTIFICATION_TYPE.SYSTEM,
    },

    priority: {
      type: String,
      enum: Object.values(NOTIFICATION_PRIORITY),
      default: NOTIFICATION_PRIORITY.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(NOTIFICATION_STATUS),
      default: NOTIFICATION_STATUS.UNREAD,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    referenceModel: {
      type: String,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * ==========================================
 * Indexes
 * ==========================================
 */

// Fast lookup for user notifications
notificationSchema.index({
  recipient: 1,
  isDeleted: 1,
});

// Latest notifications first
notificationSchema.index({
  createdAt: -1,
});

// Unread notifications
notificationSchema.index({
  recipient: 1,
  status: 1,
});

// Reference lookup
notificationSchema.index({
  referenceId: 1,
});

/**
 * ==========================================
 * Export Model
 * ==========================================
 */

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;