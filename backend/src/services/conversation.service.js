import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { CONVERSATION_TYPE } from "../constants/chat.constants.js";

/**
 * ==========================================
 * Create Conversation
 * ==========================================
 */
export const createConversation = async (
  conversationData,
  currentUserId
) => {
  const {
    participants,
    type = CONVERSATION_TYPE.PRIVATE,
    groupName,
  } = conversationData;

  // Remove duplicate participants
  const uniqueParticipants = [...new Set(participants.map(String))];

  // Ensure logged-in user is included
  if (!uniqueParticipants.includes(String(currentUserId))) {
    uniqueParticipants.push(String(currentUserId));
  }

  // Validate participants
  const users = await User.find({
    _id: { $in: uniqueParticipants },
    isDeleted: false,
    isActive: true,
  });

  if (users.length !== uniqueParticipants.length) {
    throw new ApiError(404, "One or more participants were not found.");
  }

  // Private conversation must contain exactly two users
  if (
    type === CONVERSATION_TYPE.PRIVATE &&
    uniqueParticipants.length !== 2
  ) {
    throw new ApiError(
      400,
      "Private conversation must contain exactly two participants."
    );
  }

  // Prevent duplicate private conversation
  if (type === CONVERSATION_TYPE.PRIVATE) {
    const existingConversation = await Conversation.findOne({
      type: CONVERSATION_TYPE.PRIVATE,
      participants: {
        $all: uniqueParticipants,
        $size: 2,
      },
      isDeleted: false,
    })
      .populate("participants", "fullName email role")
      .populate("createdBy", "fullName email")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "fullName email",
        },
      });

    if (existingConversation) {
      return existingConversation;
    }
  }

  // Create conversation
  const conversation = await Conversation.create({
    participants: uniqueParticipants,
    type,
    groupName:
      type === CONVERSATION_TYPE.GROUP
        ? groupName || null
        : null,
    createdBy: currentUserId,
  });

  return await Conversation.findById(conversation._id)
    .populate("participants", "fullName email role")
    .populate("createdBy", "fullName email")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "fullName email",
      },
    });
};
/**
 * ==========================================
 * Get All Conversations
 * ==========================================
 */
export const getAllConversations = async ({
  userId,
  page = 1,
  limit = 10,
  sortBy = "lastMessageAt",
  order = "desc",
}) => {
  const query = {
    participants: userId,
    isDeleted: false,
  };

  const skip = (Number(page) - 1) * Number(limit);

  const conversations = await Conversation.find(query)
    .populate("participants", "fullName email role profilePicture")
    .populate("createdBy", "fullName email")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "fullName email",
      },
    })
    .sort({
      [sortBy]: order === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(Number(limit));

  const total = await Conversation.countDocuments(query);

  return {
    conversations,
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
 * Get Conversation By ID
 * ==========================================
 */
export const getConversationById = async (
  conversationId,
  currentUserId
) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    isDeleted: false,
  })
    .populate("participants", "fullName email role profilePicture")
    .populate("createdBy", "fullName email")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "fullName email",
      },
    });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found.");
  }

  const isParticipant = conversation.participants.some(
    (participant) =>
      participant._id.toString() === currentUserId.toString()
  );

  if (!isParticipant) {
    throw new ApiError(
      403,
      "You are not authorized to access this conversation."
    );
  }

  return conversation;
};
/**
 * ==========================================
 * Soft Delete Conversation
 * ==========================================
 */
export const deleteConversation = async (
  conversationId,
  currentUserId
) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    isDeleted: false,
  });

  if (!conversation) {
    throw new ApiError(404, "Conversation not found.");
  }

  // Check whether the logged-in user is a participant
  const isParticipant = conversation.participants.some(
    (participant) =>
      participant.toString() === currentUserId.toString()
  );

  if (!isParticipant) {
    throw new ApiError(
      403,
      "You are not authorized to delete this conversation."
    );
  }

  // Soft Delete
  conversation.isDeleted = true;

  await conversation.save({
    validateBeforeSave: false,
  });

  return {
    message: "Conversation deleted successfully.",
  };
};