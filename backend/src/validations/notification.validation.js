import { body, param, query } from "express-validator";

import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from "../constants/notification.constants.js";

/**
 * ==========================================
 * Create Notification Validation
 * ==========================================
 */
export const createNotificationValidation = [
  body("recipient")
    .notEmpty()
    .withMessage("Recipient is required.")
    .isMongoId()
    .withMessage("Invalid recipient ID."),

  body("sender")
    .optional()
    .isMongoId()
    .withMessage("Invalid sender ID."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 3, max: 500 })
    .withMessage("Message must be between 3 and 500 characters."),

  body("type")
    .optional()
    .isIn(Object.values(NOTIFICATION_TYPE))
    .withMessage("Invalid notification type."),

  body("priority")
    .optional()
    .isIn(Object.values(NOTIFICATION_PRIORITY))
    .withMessage("Invalid notification priority."),

  body("referenceId")
    .optional()
    .isMongoId()
    .withMessage("Invalid reference ID."),

  body("referenceModel")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Reference model must be between 2 and 50 characters."),
];

/**
 * ==========================================
 * Notification ID Validation
 * ==========================================
 */
export const notificationIdValidation = [
  param("notificationId")
    .isMongoId()
    .withMessage("Invalid notification ID."),
];

/**
 * ==========================================
 * Notification Pagination Validation
 * ==========================================
 */
export const notificationPaginationValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),
];