import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

import {
  SOCKET_EVENTS,
  MESSAGE_STATUS,
} from "../constants/chat.constants.js";

/**
 * ==========================================
 * Chat Socket
 * ==========================================
 */
const connectedUsers = new Map();

const registerChatSocket = (io) => {
  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log(`Socket Connected : ${socket.id}`);

    /**
     * ==========================================
     * User Online
     * ==========================================
     */
    socket.on(SOCKET_EVENTS.USER_ONLINE, (userId) => {
      connectedUsers.set(userId.toString(), socket.id);

      socket.userId = userId;

      io.emit(SOCKET_EVENTS.USER_ONLINE, userId);
    });

    /**
     * ==========================================
     * Join Conversation
     * ==========================================
     */
    socket.on(
      SOCKET_EVENTS.JOIN_CONVERSATION,
      (conversationId) => {
        socket.join(conversationId);
      }
    );

    /**
     * ==========================================
     * Leave Conversation
     * ==========================================
     */
    socket.on(
      SOCKET_EVENTS.LEAVE_CONVERSATION,
      (conversationId) => {
        socket.leave(conversationId);
      }
    );

    /**
     * ==========================================
     * Typing
     * ==========================================
     */
    socket.on(
      SOCKET_EVENTS.TYPING,
      ({ conversationId, sender }) => {
        socket
          .to(conversationId)
          .emit(SOCKET_EVENTS.TYPING, {
            conversationId,
            sender,
          });
      }
    );

    /**
     * ==========================================
     * Stop Typing
     * ==========================================
     */
    socket.on(
      SOCKET_EVENTS.STOP_TYPING,
      ({ conversationId, sender }) => {
        socket
          .to(conversationId)
          .emit(SOCKET_EVENTS.STOP_TYPING, {
            conversationId,
            sender,
          });
      }
    );

    /**
     * ==========================================
     * Send Message
     * ==========================================
     *
     * REST API creates the message.
     * Socket only broadcasts it.
     */
    socket.on(
      SOCKET_EVENTS.SEND_MESSAGE,
      (message) => {
        io.to(message.conversation.toString()).emit(
          SOCKET_EVENTS.RECEIVE_MESSAGE,
          message
        );
      }
    );

    /**
     * ==========================================
     * Message Seen
     * ==========================================
     */
    socket.on(
      SOCKET_EVENTS.MESSAGE_SEEN,
      async ({ messageId }) => {
        try {
          const message = await Message.findById(messageId);

          if (!message) return;

          message.isSeen = true;
          message.status = MESSAGE_STATUS.SEEN;
          message.seenAt = new Date();

          await message.save({
            validateBeforeSave: false,
          });

          io.to(
            message.conversation.toString()
          ).emit(SOCKET_EVENTS.MESSAGE_SEEN, {
            messageId: message._id,
            conversationId: message.conversation,
            seenAt: message.seenAt,
          });
        } catch (error) {
          socket.emit(SOCKET_EVENTS.ERROR, {
            message: error.message,
          });
        }
      }
    );

    /**
     * ==========================================
     * Disconnect
     * ==========================================
     */
    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      if (socket.userId) {
        connectedUsers.delete(socket.userId.toString());

        io.emit(
          SOCKET_EVENTS.USER_OFFLINE,
          socket.userId
        );
      }

      console.log(
        `Socket Disconnected : ${socket.id}`
      );
    });
  });
};

export default registerChatSocket;