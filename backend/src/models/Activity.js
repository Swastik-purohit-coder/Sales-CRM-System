import mongoose from "mongoose";
import {
  ACTIVITY_ACTION,
  ACTIVITY_ENTITY,
  ACTIVITY_LEVEL,
} from "../constants/activity.constants.js";

const activitySchema = new mongoose.Schema(
  {
    /**
     * Entity Information
     */
    entityType: {
      type: String,
      enum: Object.values(ACTIVITY_ENTITY),
      required: true,
      default: ACTIVITY_ENTITY.LEAD,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    /**
     * Lead Reference
     */
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },

    /**
     * User who performed the activity
     */
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /**
     * Activity Action
     */
    action: {
      type: String,
      enum: Object.values(ACTIVITY_ACTION),
      required: true,
    },

    /**
     * Activity Severity
     */
    level: {
      type: String,
      enum: Object.values(ACTIVITY_LEVEL),
      default: ACTIVITY_LEVEL.INFO,
    },

    /**
     * Human Readable Message
     */
    message: {
      type: String,
      required: [true, "Activity message is required."],
      trim: true,
      maxlength: 500,
    },

    /**
     * Previous Value
     */
    oldValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    /**
     * New Value
     */
    newValue: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    /**
     * Additional Remarks
     */
    remarks: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },

    /**
     * Soft Delete
     */
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * ==========================
 * Database Indexes
 * ==========================
 */

activitySchema.index({
  entityType: 1,
});

activitySchema.index({
  entityId: 1,
});

activitySchema.index({
  lead: 1,
});

activitySchema.index({
  performedBy: 1,
});

activitySchema.index({
  action: 1,
});

activitySchema.index({
  createdAt: -1,
});

activitySchema.index({
  message: "text",
  remarks: "text",
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;