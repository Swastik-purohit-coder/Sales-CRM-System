import express from "express";

import {
  dashboardOverview,
  overviewCards,
  leadStatusStatistics,
  leadSourceStatistics,
  monthlyLeadStatistics,
  topSalesExecutives,
  todayFollowUps,
  recentLeads,
} from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  validateDashboardOverview,
  validateOverviewCards,
  validateLeadStatusStatistics,
  validateLeadSourceStatistics,
  validateMonthlyLeadStatistics,
  validateTopSales,
  validateTodayFollowUps,
  validateRecentLeads,
} from "../validations/dashboard.validation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard Overview
|--------------------------------------------------------------------------
*/

router.get(
  "/overview",
  protect,
  authorize(ROLES.ADMIN),
  validateDashboardOverview,
  validate,
  dashboardOverview
);

/*
|--------------------------------------------------------------------------
| Overview Cards
|--------------------------------------------------------------------------
*/

router.get(
  "/cards",
  protect,
  authorize(ROLES.ADMIN),
  validateOverviewCards,
  validate,
  overviewCards
);

/*
|--------------------------------------------------------------------------
| Lead Status Statistics
|--------------------------------------------------------------------------
*/

router.get(
  "/lead-status",
  protect,
  authorize(ROLES.ADMIN),
  validateLeadStatusStatistics,
  validate,
  leadStatusStatistics
);

/*
|--------------------------------------------------------------------------
| Lead Source Statistics
|--------------------------------------------------------------------------
*/

router.get(
  "/lead-source",
  protect,
  authorize(ROLES.ADMIN),
  validateLeadSourceStatistics,
  validate,
  leadSourceStatistics
);

/*
|--------------------------------------------------------------------------
| Monthly Lead Statistics
|--------------------------------------------------------------------------
*/

router.get(
  "/monthly-leads",
  protect,
  authorize(ROLES.ADMIN),
  validateMonthlyLeadStatistics,
  validate,
  monthlyLeadStatistics
);

/*
|--------------------------------------------------------------------------
| Top Sales Executives
|--------------------------------------------------------------------------
*/

router.get(
  "/top-sales",
  protect,
  authorize(ROLES.ADMIN),
  validateTopSales,
  validate,
  topSalesExecutives
);

/*
|--------------------------------------------------------------------------
| Today's Follow Ups
|--------------------------------------------------------------------------
*/

router.get(
  "/today-followups",
  protect,
  authorize(ROLES.ADMIN),
  validateTodayFollowUps,
  validate,
  todayFollowUps
);

/*
|--------------------------------------------------------------------------
| Recent Leads
|--------------------------------------------------------------------------
*/

router.get(
  "/recent-leads",
  protect,
  authorize(ROLES.ADMIN),
  validateRecentLeads,
  validate,
  recentLeads
);

export default router;