import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,
} from "../services/user.service.js";

/**
 * @desc Create Sales User
 * @route POST /api/v1/users
 * @access Private (Admin)
 */
export const createSalesUser = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Sales user created successfully.", user));
});

/**
 * @desc Get All Users
 * @route GET /api/v1/users
 * @access Private (Admin)
 */
export const getUsers = asyncHandler(async (req, res) => {
  const result = await getAllUsers(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully.", result));
});

/**
 * @desc Get Single User
 * @route GET /api/v1/users/:id
 * @access Private (Admin)
 */
export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully.", user));
});

/**
 * @desc Update User
 * @route PUT /api/v1/users/:id
 * @access Private (Admin)
 */
export const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully.", user));
});

/**
 * @desc Activate / Deactivate User
 * @route PATCH /api/v1/users/:id/status
 * @access Private (Admin)
 */
export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await toggleUserStatus(req.params.id);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `User ${user.isActive ? "activated" : "deactivated"} successfully.`,
        user
      )
    );
});

/**
 * @desc Soft Delete User
 * @route DELETE /api/v1/users/:id
 * @access Private (Admin)
 */
export const removeUser = asyncHandler(async (req, res) => {
  const result = await deleteUser(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, result.message));
});