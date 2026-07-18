import express from "express";

import {
  sendMessageController,
  getMessagesController,
  getMessageByIdController,
  markMessageAsSeenController,
  deleteMessageController,
} from "../controllers/message.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import {
  sendMessageValidation,
  conversationIdValidation,
  messageIdValidation,
} from "../validations/message.validation.js";

import validate from "../middleware/validation.middleware.js";

const router = express.Router();

/**
 * ==========================================
 * All Message Routes Require Authentication
 * ==========================================
 */
router.use(protect);

/**
 * ==========================================
 * Send Message
 * POST /messages
 * ==========================================
 */
router.post(
  "/",
  sendMessageValidation,
  validate,
  sendMessageController
);

/**
 * ==========================================
 * Get Messages of a Conversation
 * GET /messages/:conversationId
 * ==========================================
 */
router.get(
  "/:conversationId",
  conversationIdValidation,
  validate,
  getMessagesController
);

/**
 * ==========================================
 * Get Message By ID
 * GET /messages/details/:messageId
 * ==========================================
 */
router.get(
  "/details/:messageId",
  messageIdValidation,
  validate,
  getMessageByIdController
);

/**
 * ==========================================
 * Mark Message As Seen
 * PATCH /messages/:messageId/seen
 * ==========================================
 */
router.patch(
  "/:messageId/seen",
  messageIdValidation,
  validate,
  markMessageAsSeenController
);

/**
 * ==========================================
 * Delete Message
 * DELETE /messages/:messageId
 * ==========================================
 */
router.delete(
  "/:messageId",
  messageIdValidation,
  validate,
  deleteMessageController
);

export default router;