import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../src/models/User.js";
import connectDB from "../src/config/db.js";
import { ROLES } from "../src/constants/roles.js";

const createAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit();
    }

    await User.create({
      fullName: "System Administrator",
      email: "admin@gmail.com",
      password: "Admin@123",
      phone: "9876543210",
      role: ROLES.ADMIN,
    });

    console.log("Admin Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();