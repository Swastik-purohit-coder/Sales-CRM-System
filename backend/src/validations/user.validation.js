import { body, param, query } from "express-validator";

/**
 * Create Sales User Validation
 */
export const createUserValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters."),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid 10-digit Indian phone number."),

  body("avatar")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL."),
];

/**
 * Update User Validation
 */
export const updateUserValidation = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters."),

  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("phone")
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid 10-digit Indian phone number."),

  body("avatar")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL."),
];

/**
 * Validate MongoDB ObjectId
 */
export const userIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid user ID."),
];

/**
 * Pagination & Search Validation
 */
export const getUsersValidation = [
  query("page")
    .optional({ values: "falsy" })
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1.")
    .toInt(),

  query("limit")
    .optional({ values: "falsy" })
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100.")
    .toInt(),

  query("search")
    .optional({ values: "falsy" })
    .trim(),

  query("sortBy")
    .optional({ values: "falsy" })
    .isIn([
      "fullName",
      "email",
      "phone",
      "createdAt",
      "updatedAt",
      "lastLogin",
    ])
    .withMessage("Invalid sort field."),

  query("order")
    .optional({ values: "falsy" })
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc."),
];