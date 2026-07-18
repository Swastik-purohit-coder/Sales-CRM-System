/**
 * Activity Action Types
 *
 * These constants are used across the application
 * for tracking lead activities and audit logs.
 */

export const ACTIVITY_ACTION = Object.freeze({
  LEAD_CREATED: "LEAD_CREATED",

  LEAD_UPDATED: "LEAD_UPDATED",

  LEAD_ASSIGNED: "LEAD_ASSIGNED",

  LEAD_REASSIGNED: "LEAD_REASSIGNED",

  STATUS_CHANGED: "STATUS_CHANGED",

  FOLLOWUP_UPDATED: "FOLLOWUP_UPDATED",

  NOTE_UPDATED: "NOTE_UPDATED",

  LEAD_DELETED: "LEAD_DELETED",
});

/**
 * Activity Entity Types
 *
 * Useful for future scalability when the CRM
 * starts tracking multiple entities.
 */

export const ACTIVITY_ENTITY = Object.freeze({
  LEAD: "LEAD",
  USER: "USER",
});

/**
 * Activity Severity Levels
 *
 * Used for dashboard highlighting,
 * notifications and future audit reports.
 */

export const ACTIVITY_LEVEL = Object.freeze({
  INFO: "INFO",
  WARNING: "WARNING",
  SUCCESS: "SUCCESS",
  DANGER: "DANGER",
});