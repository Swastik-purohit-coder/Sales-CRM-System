import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

/**
 * @desc Protect Routes
 * @access Private
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check token from Cookies
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2. Check token from Authorization Header
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 3. If token is missing
  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  try {
    // 4. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Find User
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User not found.");
    }

    // 6. Check if account is active
    if (!user.isActive) {
      throw new ApiError(403, "Your account has been deactivated.");
    }

    // 7. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
        throw new ApiError(401, "Token has expired.");
    }

    if (error.name === "JsonWebTokenError") {
        throw new ApiError(401, "Invalid token.");
    }

    throw error;
}
});