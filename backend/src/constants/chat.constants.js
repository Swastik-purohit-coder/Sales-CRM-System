// ===============================================
// Chat Constants
// ===============================================

export const CONVERSATION_TYPE = {
  PRIVATE: "PRIVATE",
  GROUP: "GROUP",
};

export const MESSAGE_TYPE = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  FILE: "FILE",
  PDF: "PDF",
  SYSTEM: "SYSTEM",
};

export const MESSAGE_STATUS = {
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  SEEN: "SEEN",
};

export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  JOIN_CONVERSATION: "join_conversation",
  LEAVE_CONVERSATION: "leave_conversation",

  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",

  TYPING: "typing",
  STOP_TYPING: "stop_typing",

  MESSAGE_SEEN: "message_seen",

  USER_ONLINE: "user_online",
  USER_OFFLINE: "user_offline",

  ERROR: "error",
};

export const CHAT_NOTIFICATION_TYPE = {
  NEW_MESSAGE: "NEW_MESSAGE",
  MESSAGE_SEEN: "MESSAGE_SEEN",
};

Object.freeze(CONVERSATION_TYPE);
Object.freeze(MESSAGE_TYPE);
Object.freeze(MESSAGE_STATUS);
Object.freeze(SOCKET_EVENTS);
Object.freeze(CHAT_NOTIFICATION_TYPE);