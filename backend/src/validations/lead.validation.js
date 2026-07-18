import { body, param, query } from "express-validator";
import {
  LEAD_PRIORITY,
  LEAD_SOURCE,
  LEAD_STATUS,
} from "../constants/lead.constants.js";

/**
 * Common Mongo ObjectId Validation
 */
export const validateLeadId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid lead ID."),
];

/**
 * Create Lead Validation
 */
export const createLeadValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Lead name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Lead name must be between 2 and 100 characters."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits."),

  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name cannot exceed 100 characters."),

  body("source")
    .optional()
    .isIn(Object.values(LEAD_SOURCE))
    .withMessage("Invalid lead source."),

  body("priority")
    .optional()
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage("Invalid lead priority."),

  body("notes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Notes cannot exceed 5000 characters."),

  body("followUpDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid follow-up date."),

  body("assignedTo")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid assigned user ID."),
];

/**
 * Update Lead Validation
 */
export const updateLeadValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Lead name must be between 2 and 100 characters."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits."),

  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name cannot exceed 100 characters."),

  body("source")
    .optional()
    .isIn(Object.values(LEAD_SOURCE))
    .withMessage("Invalid lead source."),

  body("priority")
    .optional()
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage("Invalid lead priority."),

  body("notes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Notes cannot exceed 5000 characters."),

  body("followUpDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid follow-up date."),
];

/**
 * Assign Lead Validation
 */
export const assignLeadValidation = [
  body("assignedTo")
    .notEmpty()
    .withMessage("Assigned user is required.")
    .isMongoId()
    .withMessage("Invalid assigned user ID."),
];

/**
 * Update Lead Status Validation
 */
export const updateLeadStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Lead status is required.")
    .isIn(Object.values(LEAD_STATUS))
    .withMessage("Invalid lead status."),
];

/**
 * Get All Leads Validation
 */
export const getLeadsValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be at least 1."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("search")
    .optional()
    .trim(),

  query("status")
    .optional()
    .isIn(Object.values(LEAD_STATUS))
    .withMessage("Invalid lead status."),

  query("priority")
    .optional()
    .isIn(Object.values(LEAD_PRIORITY))
    .withMessage("Invalid lead priority."),

  query("source")
    .optional()
    .isIn(Object.values(LEAD_SOURCE))
    .withMessage("Invalid lead source."),

  query("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid assigned user ID."),

  query("sortBy")
    .optional()
    .isIn([
      "name",
      "company",
      "priority",
      "status",
      "source",
      "createdAt",
      "followUpDate",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc."),
];