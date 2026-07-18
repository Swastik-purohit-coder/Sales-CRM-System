import express from "express";

import {
  createConversationController,
  getAllConversationsController,
  getConversationByIdController,
  deleteConversationController,
} from "../controllers/conversation.controller.js";

import { protect } from "../middleware/auth.middleware.js";

import {
  createConversationValidation,
  conversationIdValidation,
} from "../validations/conversation.validation.js";

import validate from "../middleware/validation.middleware.js";

const router = express.Router();

/**
 * ==========================================
 * All Conversation Routes Require Login
 * ==========================================
 */
router.use(protect);

/**
 * ==========================================
 * Create Conversation
 * POST /conversations
 * ==========================================
 */
router.post(
  "/",
  createConversationValidation,
  validate,
  createConversationController
);

/**
 * ==========================================
 * Get All Conversations
 * GET /conversations
 * ==========================================
 */
router.get(
  "/",
  getAllConversationsController
);

/**
 * ==========================================
 * Get Conversation By ID
 * GET /conversations/:conversationId
 * ==========================================
 */
router.get(
  "/:conversationId",
  conversationIdValidation,
  validate,
  getConversationByIdController
);

/**
 * ==========================================
 * Delete Conversation
 * DELETE /conversations/:conversationId
 * ==========================================
 */
router.delete(
  "/:conversationId",
  conversationIdValidation,
  validate,
  deleteConversationController
);

export default router;