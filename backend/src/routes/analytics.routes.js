import express from "express";
import { getReportsOverview } from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(protect);
router.use(authorize(ROLES.ADMIN));

/**
 * @route GET /api/v1/analytics
 * @desc Get Reports Overview
 * @access Admin
 */
router.get("/", getReportsOverview);

export default router;
