import { body, param } from "express-validator";
import mongoose from "mongoose";
import { CONVERSATION_TYPE } from "../constants/chat.constants.js";

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const createConversationValidation = [
  body("participants")
    .isArray({ min: 1 })
    .withMessage("Participants must be a non-empty array"),

  body("participants.*")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid participant ID");
      }
      return true;
    }),

  body("type")
    .optional()
    .isIn(Object.values(CONVERSATION_TYPE))
    .withMessage("Invalid conversation type"),

  body("groupName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Group name cannot exceed 100 characters"),
];

export const conversationIdValidation = [
  param("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid conversation ID");
      }
      return true;
    }),
];