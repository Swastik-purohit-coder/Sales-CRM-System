import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardOverview,
  getOverview,
  getLeadStatusStats,
  getLeadSourceStats,
  getMonthlyLeadStats,
  getTopSalesExecutives,
  getTodayFollowUps,
  getRecentLeads,
} from "../services/dashboard.service.js";

/**
 * Dashboard Overview (Complete Dashboard)
 * GET /dashboard/overview
 */
export const dashboardOverview = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardOverview();

  return res.status(200).json(
    new ApiResponse(
      200,
      dashboard,
      "Dashboard overview fetched successfully."
    )
  );
});

/**
 * Overview Cards
 * GET /dashboard/cards
 */
export const overviewCards = asyncHandler(async (req, res) => {
  const overview = await getOverview();

  return res.status(200).json(
    new ApiResponse(
      200,
      overview,
      "Overview cards fetched successfully."
    )
  );
});

/**
 * Lead Status Statistics
 * GET /dashboard/lead-status
 */
export const leadStatusStatistics = asyncHandler(async (req, res) => {
  const statistics = await getLeadStatusStats();

  return res.status(200).json(
    new ApiResponse(
      200,
      statistics,
      "Lead status statistics fetched successfully."
    )
  );
});

/**
 * Lead Source Statistics
 * GET /dashboard/lead-source
 */
export const leadSourceStatistics = asyncHandler(async (req, res) => {
  const statistics = await getLeadSourceStats();

  return res.status(200).json(
    new ApiResponse(
      200,
      statistics,
      "Lead source statistics fetched successfully."
    )
  );
});

/**
 * Monthly Lead Statistics
 * GET /dashboard/monthly-leads
 */
export const monthlyLeadStatistics = asyncHandler(async (req, res) => {
  const statistics = await getMonthlyLeadStats();

  return res.status(200).json(
    new ApiResponse(
      200,
      statistics,
      "Monthly lead statistics fetched successfully."
    )
  );
});

/**
 * Top Sales Executives
 * GET /dashboard/top-sales
 */
export const topSalesExecutives = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const result = await getTopSalesExecutives(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Top sales executives fetched successfully."
    )
  );
});

/**
 * Today's Follow Ups
 * GET /dashboard/today-followups
 */
export const todayFollowUps = asyncHandler(async (req, res) => {
  const followUps = await getTodayFollowUps();

  return res.status(200).json(
    new ApiResponse(
      200,
      followUps,
      "Today's follow-ups fetched successfully."
    )
  );
});

/**
 * Recent Leads
 * GET /dashboard/recent-leads
 */
export const recentLeads = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const leads = await getRecentLeads(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      leads,
      "Recent leads fetched successfully."
    )
  );
});