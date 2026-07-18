import { query } from "express-validator";

/**
 * Validate Top Sales Query
 */
export const validateTopSales = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100."),
];

/**
 * Validate Recent Leads Query
 */
export const validateRecentLeads = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100."),
];

/**
 * Validate Monthly Lead Statistics Query
 *
 * Optional year filter for future scalability.
 */
export const validateMonthlyLeadStatistics = [
  query("year")
    .optional()
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Year must be a valid year."),
];

/**
 * Validate Dashboard Overview
 *
 * Reserved for future dashboard filters.
 */
export const validateDashboardOverview = [];

/**
 * Validate Overview Cards
 */
export const validateOverviewCards = [];

/**
 * Validate Lead Status Statistics
 */
export const validateLeadStatusStatistics = [];

/**
 * Validate Lead Source Statistics
 */
export const validateLeadSourceStatistics = [];

/**
 * Validate Today's Follow Ups
 */
export const validateTodayFollowUps = [];