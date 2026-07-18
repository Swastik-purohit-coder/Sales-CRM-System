import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGE_STATUS } from "../constants/chat.constants.js";
import { createNotification } from "./notification.service.js";

import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from "../constants/notification.constants.js";

/**
 * ==========================================
 * Send Message
 * ==========================================
 */
export const sendMessage = async (
  messageData,
  currentUserId
) => {
  const {
    conversation: conversationId,
    receiver,
    message,
    messageType,
    attachment,
  } = messageData;

  const conversation = await Conversation.findOne({
    _id: conversationId,
    isDeleted: false,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found.");
  }

  const isParticipant = conversation.participants.some(
    (participant) =>
      participant.toString() === currentUserId.toString()
  );

  if (!isParticipant) {
    throw new ApiError(
      403,
      "You are not authorized to send messages in this conversation."
    );
  }

  const newMessage = await Message.create({
    conversation: conversationId,
    sender: currentUserId,
    receiver,
    message,
    messageType,
    attachment,
  });

  conversation.lastMessage = newMessage._id;
  conversation.lastMessageAt = new Date();

  await conversation.save({
    validateBeforeSave: false,
  });

  await createNotification({
  recipient: receiver,
  sender: currentUserId,
  title: "New Message",
  message: "You have received a new message.",
  type: NOTIFICATION_TYPE.NEW_MESSAGE,
  priority: NOTIFICATION_PRIORITY.MEDIUM,
  referenceId: newMessage._id,
  referenceModel: "Message",
});

  return await Message.findById(newMessage._id)
    .populate("sender", "fullName email role")
    .populate("receiver", "fullName email role")
    .populate("conversation");
};

/**
 * ==========================================
 * Get Messages
 * ==========================================
 */
export const getMessages = async ({
  conversationId,
  currentUserId,
  page = 1,
  limit = 20,
}) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    isDeleted: false,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found.");
  }

  const isParticipant = conversation.participants.some(
    (participant) =>
      participant.toString() === currentUserId.toString()
  );

  if (!isParticipant) {
    throw new ApiError(
      403,
      "You are not authorized to access this conversation."
    );
  }

  const skip = (Number(page) - 1) * Number(limit);

  const messages = await Message.find({
    conversation: conversationId,
    isDeleted: false,
  })
    .populate("sender", "fullName email role")
    .populate("receiver", "fullName email role")
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(Number(limit));

  const total = await Message.countDocuments({
    conversation: conversationId,
    isDeleted: false,
  });

  return {
    messages,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * ==========================================
 * Get Message By ID
 * ==========================================
 */
export const getMessageById = async (
  messageId,
  currentUserId
) => {
  const message = await Message.findOne({
    _id: messageId,
    isDeleted: false,
  })
    .populate("sender", "fullName email role")
    .populate("receiver", "fullName email role")
    .populate("conversation");

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  const conversation = await Conversation.findOne({
    _id: message.conversation._id,
    isDeleted: false,
  });

  const isParticipant = conversation.participants.some(
    (participant) =>
      participant.toString() === currentUserId.toString()
  );

  if (!isParticipant) {
    throw new ApiError(
      403,
      "You are not authorized to access this message."
    );
  }

  return message;
};

/**
 * ==========================================
 * Mark Message As Seen
 * ==========================================
 */
export const markMessageAsSeen = async (
  messageId,
  currentUserId
) => {
  const message = await Message.findOne({
    _id: messageId,
    isDeleted: false,
  });

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  if (
    message.receiver.toString() !==
    currentUserId.toString()
  ) {
    throw new ApiError(
      403,
      "You are not allowed to update this message."
    );
  }

  message.isSeen = true;
  message.seenAt = new Date();
  message.status = MESSAGE_STATUS.SEEN;

  await message.save({
    validateBeforeSave: false,
  });

  return await Message.findById(message._id)
    .populate("sender", "fullName email role")
    .populate("receiver", "fullName email role");
};

/**
 * ==========================================
 * Soft Delete Message
 * ==========================================
 */
export const deleteMessage = async (
  messageId,
  currentUserId
) => {
  const message = await Message.findOne({
    _id: messageId,
    isDeleted: false,
  });

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  if (
    message.sender.toString() !==
    currentUserId.toString()
  ) {
    throw new ApiError(
      403,
      "You can delete only your own messages."
    );
  }

  message.isDeleted = true;

  await message.save({
    validateBeforeSave: false,
  });

  return {
    message: "Message deleted successfully.",
  };
};