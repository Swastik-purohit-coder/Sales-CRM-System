import express from "express";

import {
  createSalesUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserStatus,
  removeUser,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import validate from "../middleware/validation.middleware.js";

import {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
  getUsersValidation,
} from "../validations/user.validation.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * Apply Authentication & Authorization
 * All User routes are Admin only
 */
router.use(protect);
router.use(authorize(ROLES.ADMIN));

/**
 * @route   POST /api/v1/users
 * @desc    Create Sales User
 * @access  Admin
 */
router.post(
  "/",
  createUserValidation,
  validate,
  createSalesUser
);

/**
 * @route   GET /api/v1/users
 * @desc    Get All Users
 * @access  Admin
 */
router.get(
  "/",
  getUsersValidation,
  validate,
  getUsers
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get Single User
 * @access  Admin
 */
router.get(
  "/:id",
  userIdValidation,
  validate,
  getUser
);

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Update User
 * @access  Admin
 */
router.put(
  "/:id",
  userIdValidation,
  updateUserValidation,
  validate,
  updateUserDetails
);

/**
 * @route   PATCH /api/v1/users/:id/status
 * @desc    Activate / Deactivate User
 * @access  Admin
 */
router.patch(
  "/:id/status",
  userIdValidation,
  validate,
  updateUserStatus
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Soft Delete User
 * @access  Admin
 */
router.delete(
  "/:id",
  userIdValidation,
  validate,
  removeUser
);

export default router;