import express from "express";

import {
  login,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import validate from "../middleware/validation.middleware.js";

import { loginValidation } from "../validations/auth.validation.js";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.post(
  "/logout",
  protect,
  logout
);

router.get(
  "/profile",
  protect,
  getProfile
);

export default router;