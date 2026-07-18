import { loginUser, logoutUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * @desc Login User
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await loginUser(email, password);

 const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, "Login successful", {
        token,
        user,
      })
    );
});

/**
 * @desc Logout User
 * @route POST /api/v1/auth/logout
 * @access Private
 */
export const logout = asyncHandler(async (req, res) => {
  const result = await logoutUser();

  res
    .status(200)
    .clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
})
    .json(new ApiResponse(200, result.message));
});

/**
 * @desc Get Logged In User
 * @route GET /api/v1/auth/profile
 * @access Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      req.user
    )
  );
});