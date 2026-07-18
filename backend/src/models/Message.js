import mongoose from "mongoose";
import {
  MESSAGE_TYPE,
  MESSAGE_STATUS,
} from "../constants/chat.constants.js";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    messageType: {
      type: String,
      enum: Object.values(MESSAGE_TYPE),
      default: MESSAGE_TYPE.TEXT,
    },

    attachment: {
      url: {
        type: String,
        default: null,
      },

      fileName: {
        type: String,
        default: null,
      },

      mimeType: {
        type: String,
        default: null,
      },

      fileSize: {
        type: Number,
        default: null,
      },
    },

    status: {
      type: String,
      enum: Object.values(MESSAGE_STATUS),
      default: MESSAGE_STATUS.SENT,
    },

    isSeen: {
      type: Boolean,
      default: false,
    },

    seenAt: {
      type: Date,
      default: null,
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
 * ============================
 * Indexes
 * ============================
 */

messageSchema.index({ conversation: 1, createdAt: -1 });

messageSchema.index({ sender: 1 });

messageSchema.index({ receiver: 1 });

messageSchema.index({ status: 1 });

messageSchema.index({ isDeleted: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;