import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  sendMessage,
  getMessages,
  getMessageById,
  markMessageAsSeen,
  deleteMessage,
} from "../services/message.service.js";

/**
 * ==========================================
 * Send Message
 * POST /messages
 * ==========================================
 */
export const sendMessageController = asyncHandler(
  async (req, res) => {
    const message = await sendMessage(
      req.body,
      req.user._id
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Message sent successfully.",
        message
      )
    );
  }
);

/**
 * ==========================================
 * Get Messages
 * GET /messages/:conversationId
 * ==========================================
 */
export const getMessagesController = asyncHandler(
  async (req, res) => {
    const result = await getMessages({
      conversationId: req.params.conversationId,
      currentUserId: req.user._id,
      page: req.query.page,
      limit: req.query.limit,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Messages fetched successfully.",
        result
      )
    );
  }
);

/**
 * ==========================================
 * Get Message By ID
 * GET /messages/details/:messageId
 * ==========================================
 */
export const getMessageByIdController = asyncHandler(
  async (req, res) => {
    const message = await getMessageById(
      req.params.messageId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Message fetched successfully.",
        message
      )
    );
  }
);

/**
 * ==========================================
 * Mark Message As Seen
 * PATCH /messages/:messageId/seen
 * ==========================================
 */
export const markMessageAsSeenController =
  asyncHandler(async (req, res) => {
    const message = await markMessageAsSeen(
      req.params.messageId,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Message marked as seen successfully.",
        message
      )
    );
  });

/**
 * ==========================================
 * Delete Message
 * DELETE /messages/:messageId
 * ==========================================
 */
export const deleteMessageController =
  asyncHandler(async (req, res) => {
    const result = await deleteMessage(
      req.params.messageId,
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