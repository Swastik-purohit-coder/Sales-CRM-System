import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  assignLead,
  updateLeadStatus,
  deleteLead,
} from "../services/lead.service.js";

/**
 * @desc Create Lead
 * @route POST /api/v1/leads
 * @access Private (Admin)
 */
export const createNewLead = asyncHandler(async (req, res) => {
  const lead = await createLead(req.body, req.user._id);

  res
    .status(201)
    .json(new ApiResponse(201, "Lead created successfully.", lead));
});

/**
 * @desc Get All Leads
 * @route GET /api/v1/leads
 * @access Private
 */
export const getLeads = asyncHandler(async (req, res) => {
  const result = await getAllLeads(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Leads fetched successfully.", result));
});

/**
 * @desc Get Lead By ID
 * @route GET /api/v1/leads/:id
 * @access Private
 */
export const getLead = asyncHandler(async (req, res) => {
  const lead = await getLeadById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Lead fetched successfully.", lead));
});

/**
 * @desc Update Lead
 * @route PUT /api/v1/leads/:id
 * @access Private (Admin)
 */
export const updateLeadDetails = asyncHandler(async (req, res) => {
  const lead = await updateLead(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Lead updated successfully.", lead));
});

/**
 * @desc Assign / Reassign Lead
 * @route PATCH /api/v1/leads/:id/assign
 * @access Private (Admin)
 */
export const assignLeadToSales = asyncHandler(async (req, res) => {
  const { assignedTo } = req.body;

  const lead = await assignLead(req.params.id, assignedTo);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Lead assigned successfully.", lead)
    );
});

/**
 * @desc Update Lead Status
 * @route PATCH /api/v1/leads/:id/status
 * @access Private
 */
export const changeLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const lead = await updateLeadStatus(
    req.params.id,
    status,
    req.user
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Lead status updated successfully.",
        lead
      )
    );
});

/**
 * @desc Delete Lead
 * @route DELETE /api/v1/leads/:id
 * @access Private (Admin)
 */
export const removeLead = asyncHandler(async (req, res) => {
  const result = await deleteLead(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, result.message));
});