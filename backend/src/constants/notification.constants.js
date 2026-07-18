/**
 * ===============================================
 * Notification Types
 * ===============================================
 */
export const NOTIFICATION_TYPE = {
  LEAD_ASSIGNED: "LEAD_ASSIGNED",
  LEAD_UPDATED: "LEAD_UPDATED",
  LEAD_STATUS_CHANGED: "LEAD_STATUS_CHANGED",
  FOLLOWUP_REMINDER: "FOLLOWUP_REMINDER",
  NEW_MESSAGE: "NEW_MESSAGE",
  SYSTEM: "SYSTEM",
};

/**
 * ===============================================
 * Notification Status
 * ===============================================
 */
export const NOTIFICATION_STATUS = {
  UNREAD: "UNREAD",
  READ: "READ",
};

/**
 * ===============================================
 * Notification Priority
 * ===============================================
 */
export const NOTIFICATION_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};

/**
 * ===============================================
 * Freeze Objects
 * ===============================================
 */
Object.freeze(NOTIFICATION_TYPE);
Object.freeze(NOTIFICATION_STATUS);
Object.freeze(NOTIFICATION_PRIORITY);