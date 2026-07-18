import express from "express";

import healthCheck from "../controllers/health.controller.js";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import leadRoutes from "./lead.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import activityRoutes from "./activity.routes.js";
import conversationRoutes from "./conversation.routes.js";
import messageRoutes from "./message.routes.js";
import notificationRoutes from "./notification.routes.js";

const router = express.Router();

/**
 * Health Check
 */
router.get("/health", healthCheck);

/**
 * Authentication Routes
 */
router.use("/auth", authRoutes);

/**
 * User Management Routes
 */
router.use("/users", userRoutes);
router.use("/leads", leadRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/activities", activityRoutes);
router.use("/conversations", conversationRoutes);

router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
export default router;