import mongoose from "mongoose";
import { CONVERSATION_TYPE } from "../constants/chat.constants.js";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    type: {
      type: String,
      enum: Object.values(CONVERSATION_TYPE),
      default: CONVERSATION_TYPE.PRIVATE,
    },

    groupName: {
      type: String,
      trim: true,
      default: null,
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * ==============================
 * Indexes
 * ==============================
 */

// Fast lookup by participants
conversationSchema.index({ participants: 1 });

// Latest conversations first
conversationSchema.index({ lastMessageAt: -1 });

// Ignore deleted conversations
conversationSchema.index({ isDeleted: 1 });

/**
 * ==============================
 * Export Model
 * ==============================
 */

const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;