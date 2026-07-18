import { body, param, query } from "express-validator";

import {
  ACTIVITY_ACTION,
  ACTIVITY_ENTITY,
  ACTIVITY_LEVEL,
} from "../constants/activity.constants.js";

/**
 * ============================================================
 * Create Activity Validation
 * ============================================================
 */

export const createActivityValidation = [
  body("entityType")
    .notEmpty()
    .withMessage("Entity type is required.")
    .isIn(Object.values(ACTIVITY_ENTITY))
    .withMessage("Invalid entity type."),

  body("entityId")
    .notEmpty()
    .withMessage("Entity ID is required.")
    .isMongoId()
    .withMessage("Invalid entity ID."),

  body("lead")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid lead ID."),

  body("performedBy")
    .notEmpty()
    .withMessage("PerformedBy is required.")
    .isMongoId()
    .withMessage("Invalid user ID."),

  body("action")
    .notEmpty()
    .withMessage("Action is required.")
    .isIn(Object.values(ACTIVITY_ACTION))
    .withMessage("Invalid activity action."),

  body("level")
    .optional()
    .isIn(Object.values(ACTIVITY_LEVEL))
    .withMessage("Invalid activity level."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters."),

  body("remarks")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Remarks cannot exceed 1000 characters."),
];

/**
 * ============================================================
 * Activity ID Validation
 * ============================================================
 */

export const activityIdValidation = [
  param("activityId")
    .isMongoId()
    .withMessage("Invalid activity ID."),
];

/**
 * ============================================================
 * Lead Timeline Validation
 * ============================================================
 */

export const leadTimelineValidation = [
  param("leadId")
    .isMongoId()
    .withMessage("Invalid lead ID."),
];

/**
 * ============================================================
 * User Timeline Validation
 * ============================================================
 */

export const userTimelineValidation = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user ID."),
];

/**
 * ============================================================
 * Pagination Validation
 * ============================================================
 */

export const activityQueryValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("search")
    .optional()
    .trim(),

  query("action")
    .optional()
    .isIn(Object.values(ACTIVITY_ACTION))
    .withMessage("Invalid activity action."),

  query("level")
    .optional()
    .isIn(Object.values(ACTIVITY_LEVEL))
    .withMessage("Invalid activity level."),

  query("performedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID."),

  query("sortBy")
    .optional()
    .isIn([
      "createdAt",
      "action",
      "level",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

/**
 * ============================================================
 * Recent Activity Validation
 * ============================================================
 */

export const recentActivityValidation = [
  query("limit")
    .optional()
    .isInt({
      min: 1,
      max: 50,
    })
    .withMessage("Limit must be between 1 and 50."),
];