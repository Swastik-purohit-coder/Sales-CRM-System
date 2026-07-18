import express from "express";

import {
  createNewLead,
  getLeads,
  getLead,
  updateLeadDetails,
  assignLeadToSales,
  changeLeadStatus,
  removeLead,
} from "../controllers/lead.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import validate from "../middleware/validation.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  validateLeadId,
  createLeadValidation,
  updateLeadValidation,
  assignLeadValidation,
  updateLeadStatusValidation,
  getLeadsValidation,
} from "../validations/lead.validation.js";

const router = express.Router();

/**
 * All Lead Routes Require Authentication
 */
router.use(protect);

/**
 * Create Lead
 * POST /api/v1/leads
 */
router.post(
  "/",
  authorize(ROLES.ADMIN),
  createLeadValidation,
  validate,
  createNewLead
);

/**
 * Get All Leads
 * GET /api/v1/leads
 */
router.get(
  "/",
  getLeadsValidation,
  validate,
  getLeads
);

/**
 * Get Lead By ID
 * GET /api/v1/leads/:id
 */
router.get(
  "/:id",
  validateLeadId,
  validate,
  getLead
);

/**
 * Update Lead
 * PUT /api/v1/leads/:id
 */
router.put(
  "/:id",
  authorize(ROLES.ADMIN),
  validateLeadId,
  updateLeadValidation,
  validate,
  updateLeadDetails
);

/**
 * Assign / Reassign Lead
 * PATCH /api/v1/leads/:id/assign
 */
router.patch(
  "/:id/assign",
  authorize(ROLES.ADMIN),
  validateLeadId,
  assignLeadValidation,
  validate,
  assignLeadToSales
);

/**
 * Update Lead Status
 * PATCH /api/v1/leads/:id/status
 */
router.patch(
  "/:id/status",
  authorize(ROLES.ADMIN, ROLES.SALES),
  validateLeadId,
  updateLeadStatusValidation,
  validate,
  changeLeadStatus
);

/**
 * Delete Lead
 * DELETE /api/v1/leads/:id
 */
router.delete(
  "/:id",
  authorize(ROLES.ADMIN),
  validateLeadId,
  validate,
  removeLead
);

export default router;