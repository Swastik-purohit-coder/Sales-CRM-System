import mongoose from "mongoose";
import {
  LEAD_STATUS,
  LEAD_PRIORITY,
  LEAD_SOURCE,
} from "../constants/lead.constants.js";

const leadSchema = new mongoose.Schema(
  {
    // Lead Basic Information
    name: {
      type: String,
      required: [true, "Lead name is required."],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    // Lead Details
    source: {
      type: String,
      enum: Object.values(LEAD_SOURCE),
      default: LEAD_SOURCE.OTHER,
    },

    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
    },

    priority: {
      type: String,
      enum: Object.values(LEAD_PRIORITY),
      default: LEAD_PRIORITY.MEDIUM,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: 5000,
    },

    // Assignment
    assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Follow-up
    followUpDate: {
      type: Date,
      default: null,
    },

    lastContactedAt: {
      type: Date,
      default: null,
    },

    // Soft Delete
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
 * Database Indexes
 */

leadSchema.index({
  assignedTo: 1,
});

leadSchema.index({
  status: 1,
});

leadSchema.index({
  priority: 1,
});

leadSchema.index({
  source: 1,
});

leadSchema.index({
  createdAt: -1,
});

leadSchema.index({
  phone: 1,
});

leadSchema.index({
  email: 1,
});

leadSchema.index({
  name: "text",
  company: "text",
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;