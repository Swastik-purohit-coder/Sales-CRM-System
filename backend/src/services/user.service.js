import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";

/**
 * Create Sales User
 */
export const createUser = async (userData) => {
  const { fullName, email, password, phone, avatar, role } = userData;

  // Check Email
  const emailExists = await User.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  });

  if (emailExists) {
    throw new ApiError(409, "Email already exists.");
  }

  // Check Phone
  const phoneExists = await User.findOne({
    phone,
    isDeleted: false,
  });

  if (phoneExists) {
    throw new ApiError(409, "Phone number already exists.");
  }

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    phone,
    avatar,
    role: role ? role.toLowerCase() : ROLES.SALES,
  });

  return await User.findById(user._id).select("-password");
};

/**
 * Get All Users
 */
export const getAllUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  order = "desc",
}) => {
  const query = {
    isDeleted: false,
  };

  if (search) {
    query.$or = [
      {
        fullName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .sort({
      [sortBy]: order === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(Number(limit));

  const totalUsers = await User.countDocuments(query);

  return {
    users,
    pagination: {
      total: totalUsers,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalUsers / limit),
    },
  };
};

/**
 * Get Single User
 */
export const getUserById = async (id) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: false,
  }).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

/**
 * Update User
 */
/**
 * Update User
 */
export const updateUser = async (id, updateData) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Allowed fields only
  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "avatar",
    "role",
  ];

  // Email validation
  if (
    updateData.email &&
    updateData.email.toLowerCase() !== user.email
  ) {
    const emailExists = await User.findOne({
      email: updateData.email.toLowerCase(),
      isDeleted: false,
      _id: { $ne: id },
    });

    if (emailExists) {
      throw new ApiError(409, "Email already exists.");
    }
  }

  // Phone validation
  if (
    updateData.phone &&
    updateData.phone !== user.phone
  ) {
    const phoneExists = await User.findOne({
      phone: updateData.phone,
      isDeleted: false,
      _id: { $ne: id },
    });

    if (phoneExists) {
      throw new ApiError(409, "Phone number already exists.");
    }
  }

  // Update only allowed fields
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      if (field === "email") {
        user[field] = updateData[field].toLowerCase();
      } else if (field === "role") {
        user[field] = updateData[field].toLowerCase();
      } else {
        user[field] = updateData[field];
      }
    }
  });

  await user.save();

  return await User.findById(id).select("-password");
};

/**
 * Activate / Deactivate User
 */
export const toggleUserStatus = async (id) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.isActive = !user.isActive;

  await user.save({
    validateBeforeSave: false,
  });

  return user;
};

/**
 * Soft Delete User
 */
export const deleteUser = async (id) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.isDeleted = true;
  user.isActive = false;

  await user.save({
    validateBeforeSave: false,
  });

  return {
    message: "User deleted successfully.",
  };
};