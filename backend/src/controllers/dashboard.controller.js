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
  const dashboard = await getDashboardOverview(req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard overview fetched successfully.",
      dashboard
    )
  );
});

/**
 * Overview Cards
 * GET /dashboard/cards
 */
export const overviewCards = asyncHandler(async (req, res) => {
  const overview = await getOverview(req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Overview cards fetched successfully.",
      overview
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
      "Lead status statistics fetched successfully.",
      statistics
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
      "Lead source statistics fetched successfully.",
      statistics
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
      "Monthly lead statistics fetched successfully.",
      statistics
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
      "Top sales executives fetched successfully.",
      result
    )
  );
});

/**
 * Today's Follow Ups
 * GET /dashboard/today-followups
 */
export const todayFollowUps = asyncHandler(async (req, res) => {
  const followUps = await getTodayFollowUps(req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Today's follow-ups fetched successfully.",
      followUps
    )
  );
});

/**
 * Recent Leads
 * GET /dashboard/recent-leads
 */
export const recentLeads = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const leads = await getRecentLeads(limit, req.user);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Recent leads fetched successfully.",
      leads
    )
  );
});