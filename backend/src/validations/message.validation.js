import { body, param } from "express-validator";
import mongoose from "mongoose";
import { MESSAGE_TYPE } from "../constants/chat.constants.js";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

/**
 * ==========================================
 * Send Message Validation
 * ==========================================
 */
export const sendMessageValidation = [
  body("conversation")
    .notEmpty()
    .withMessage("Conversation ID is required")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid conversation ID");
      }
      return true;
    }),

  body("receiver")
    .notEmpty()
    .withMessage("Receiver ID is required")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid receiver ID");
      }
      return true;
    }),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Message cannot exceed 5000 characters"),

  body("messageType")
    .optional()
    .isIn(Object.values(MESSAGE_TYPE))
    .withMessage("Invalid message type"),
];

/**
 * ==========================================
 * Message ID Validation
 * ==========================================
 */
export const messageIdValidation = [
  param("id").custom((value) => {
    if (!isValidObjectId(value)) {
      throw new Error("Invalid message ID");
    }
    return true;
  }),
];

/**
 * ==========================================
 * Conversation ID Validation
 * ==========================================
 */
export const conversationIdValidation = [
  param("conversationId").custom((value) => {
    if (!isValidObjectId(value)) {
      throw new Error("Invalid conversation ID");
    }
    return true;
  }),
];