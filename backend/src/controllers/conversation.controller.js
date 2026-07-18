import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createConversation,
  getAllConversations,
  getConversationById,
  deleteConversation,
} from "../services/conversation.service.js";

/**
 * ==========================================
 * Create Conversation
 * POST /conversations
 * ==========================================
 */
export const createConversationController = asyncHandler(
  async (req, res) => {
    const conversation = await createConversation(
      req.body,
      req.user._id
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Conversation created successfully.",
        conversation
      )
    );
  }
);

/**
 * ==========================================
 * Get All Conversations
 * GET /conversations
 * ==========================================
 */
export const getAllConversationsController =
  asyncHandler(async (req, res) => {
    const result = await getAllConversations({
      userId: req.user._id,
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      order: req.query.order,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Conversations fetched successfully.",
        result
      )
    );
  });

/**
 * ==========================================
 * Get Conversation By ID
 * GET /conversations/:conversationId
 * ==========================================
 */
export const getConversationByIdController =
  asyncHandler(async (req, res) => {
    const conversation = await getConversationById(
      req.params.conversationId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Conversation fetched successfully.",
        conversation
      )
    );
  });

/**
 * ==========================================
 * Delete Conversation
 * DELETE /conversations/:conversationId
 * ==========================================
 */
export const deleteConversationController =
  asyncHandler(async (req, res) => {
    const result = await deleteConversation(
      req.params.conversationId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result.message,
        null
      )
    );
  });