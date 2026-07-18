import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

/**
 * Login User Service
 */
export const loginUser = async (email, password) => {
  // Check if email and password are provided
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  // Find user and include password
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  // Check if user exists
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Check if user is active
  if (!user.isActive) {
    throw new ApiError(403, "Your account has been deactivated");
  }

  // Compare password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Update last login
await user.updateLastLogin();

  // Generate JWT Token
  const token = generateToken(user._id, user.role);

  // Remove password before returning user
  user.password = undefined;

  return {
    token,
    user,
  };
};

/**
 * Logout User Service
 */
export const logoutUser = async () => {
  return {
    message: "Logout successful",
  };
};