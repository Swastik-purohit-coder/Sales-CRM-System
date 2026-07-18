import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 * @param {String} userId - MongoDB User ID
 * @param {String} role - User Role (admin/sales)
 * @returns {String} JWT Token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role: role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;