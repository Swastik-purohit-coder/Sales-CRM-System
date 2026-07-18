import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";

/**
 * @desc Role-Based Authorization Middleware
 * @param  {...String} roles - Allowed roles
 * @returns Middleware Function
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized. Please login first."));
    }

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access denied. ${req.user.role} is not authorized to access this resource.`
        )
      );
    }

    // User has required role
    next();
  };
};