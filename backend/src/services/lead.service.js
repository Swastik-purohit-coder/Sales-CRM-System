import Lead from "../models/Lead.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";
import { createActivity } from "./activity.service.js";
import {
  ACTIVITY_ACTION,
  ACTIVITY_ENTITY,
  ACTIVITY_LEVEL,
} from "../constants/activity.constants.js";

import { createNotification } from "./notification.service.js";

import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from "../constants/notification.constants.js";

/**
 * Create Lead
 */
export const createLead = async (leadData, adminId) => {
  const {
    name,
    email,
    phone,
    company,
    source,
    priority,
    notes,
    followUpDate,
    assignedTo,
  } = leadData;

  let salesUser = null;

  if (assignedTo) {
    salesUser = await User.findOne({
      _id: assignedTo,
      role: ROLES.SALES,
      isActive: true,
      isDeleted: false,
    });

    if (!salesUser) {
      throw new ApiError(404, "Assigned sales executive not found.");
    }
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    company,
    source,
    priority,
    notes,
    followUpDate,
    assignedTo: salesUser ? salesUser._id : null,
    createdBy: adminId,
  });

  await createActivity({
    entityType: ACTIVITY_ENTITY.LEAD,
    entityId: lead._id,
    lead: lead._id,
    performedBy: adminId,
    action: ACTIVITY_ACTION.LEAD_CREATED,
    level: ACTIVITY_LEVEL.SUCCESS,
    message: `Lead "${lead.name}" created successfully.`,
    oldValue: null,
    newValue: {
      name: lead.name,
      company: lead.company,
      status: lead.status,
      assignedTo: lead.assignedTo,
    },
  });

  return await Lead.findById(lead._id)
    .populate("assignedTo", "fullName email phone")
    .populate("createdBy", "fullName email");
};

/**
 * Get All Leads
 */
export const getAllLeads = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  priority,
  source,
  assignedTo,
  sortBy = "createdAt",
  order = "desc",
}) => {
  const query = {
    isDeleted: false,
  };

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (source) query.source = source;
  if (assignedTo) query.assignedTo = assignedTo;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const leads = await Lead.find(query)
    .populate("assignedTo", "fullName email")
    .populate("createdBy", "fullName email")
    .sort({
      [sortBy]: order === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);

  return {
    leads,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * Get Lead By ID
 */
export const getLeadById = async (id) => {
  const lead = await Lead.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("assignedTo", "fullName email phone")
    .populate("createdBy", "fullName email");

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  return lead;
};
/**
 * Update Lead Details
 */
export const updateLead = async (id, updateData) => {
  const lead = await Lead.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  // Store old values for activity log
  const oldValue = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    source: lead.source,
    priority: lead.priority,
    notes: lead.notes,
    followUpDate: lead.followUpDate,
  };

  const allowedFields = [
    "name",
    "email",
    "phone",
    "company",
    "source",
    "priority",
    "notes",
    "followUpDate",
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      lead[field] = updateData[field];
    }
  });

  await lead.save();

  await createActivity({
    entityType: ACTIVITY_ENTITY.LEAD,
    entityId: lead._id,
    lead: lead._id,
    performedBy: lead.createdBy,
    action: ACTIVITY_ACTION.LEAD_UPDATED,
    level: ACTIVITY_LEVEL.SUCCESS,
    message: `Lead "${lead.name}" updated successfully.`,
    oldValue,
    newValue: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      source: lead.source,
      priority: lead.priority,
      notes: lead.notes,
      followUpDate: lead.followUpDate,
    },
  });

  return await getLeadById(id);
};

/**
 * Assign / Reassign Lead
 */
export const assignLead = async (leadId, salesUserId) => {
  const lead = await Lead.findOne({
    _id: leadId,
    isDeleted: false,
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  const salesUser = await User.findOne({
    _id: salesUserId,
    role: ROLES.SALES,
    isActive: true,
    isDeleted: false,
  });

  if (!salesUser) {
    throw new ApiError(404, "Sales executive not found.");
  }

  // Store old assigned user
  const oldAssignedTo = lead.assignedTo;

  // Assign new user
  lead.assignedTo = salesUser._id;

  await lead.save({
    validateBeforeSave: false,
  });
  await createNotification({
  recipient: lead.assignedTo,
  sender: currentUserId,
  title: "New Lead Assigned",
  message: `A new lead has been assigned to you.`,
  type: NOTIFICATION_TYPE.LEAD_ASSIGNED,
  priority: NOTIFICATION_PRIORITY.HIGH,
  referenceId: lead._id,
  referenceModel: "Lead",
});

  await createActivity({
    entityType: ACTIVITY_ENTITY.LEAD,
    entityId: lead._id,
    lead: lead._id,
    performedBy: lead.createdBy,
    action: oldAssignedTo
      ? ACTIVITY_ACTION.LEAD_REASSIGNED
      : ACTIVITY_ACTION.LEAD_ASSIGNED,
    level: ACTIVITY_LEVEL.SUCCESS,
    message: `Lead "${lead.name}" assigned to ${salesUser.fullName}.`,
    oldValue: {
      assignedTo: oldAssignedTo,
    },
    newValue: {
      assignedTo: salesUser._id,
    },
  });

  return await getLeadById(leadId);
};
/**
 * Update Lead Status
 */
export const updateLeadStatus = async (leadId, status) => {
  const lead = await Lead.findOne({
    _id: leadId,
    isDeleted: false,
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  // Store old status
  const oldStatus = lead.status;

  // Update status
  lead.status = status;
  lead.lastContactedAt = new Date();

  await lead.save({
    validateBeforeSave: false,
  });
  await createNotification({
  recipient: lead.assignedTo,
  sender: currentUserId,
  title: "Lead Status Updated",
  message: `Lead status has been changed to ${lead.status}.`,
  type: NOTIFICATION_TYPE.LEAD_STATUS_CHANGED,
  priority: NOTIFICATION_PRIORITY.MEDIUM,
  referenceId: lead._id,
  referenceModel: "Lead",
});

  // Create activity log
  await createActivity({
    entityType: ACTIVITY_ENTITY.LEAD,
    entityId: lead._id,
    lead: lead._id,
    performedBy: lead.createdBy,
    action: ACTIVITY_ACTION.STATUS_CHANGED,
    level: ACTIVITY_LEVEL.SUCCESS,
    message: `Lead "${lead.name}" status changed from "${oldStatus}" to "${status}".`,
    oldValue: {
      status: oldStatus,
    },
    newValue: {
      status,
    },
  });

  return await getLeadById(leadId);
};

/**
 * Soft Delete Lead
 */
export const deleteLead = async (id) => {
  const lead = await Lead.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  // Soft delete
  lead.isDeleted = true;

  await lead.save({
    validateBeforeSave: false,
  });

  // Create activity log
  await createActivity({
    entityType: ACTIVITY_ENTITY.LEAD,
    entityId: lead._id,
    lead: lead._id,
    performedBy: lead.createdBy,
    action: ACTIVITY_ACTION.LEAD_DELETED,
    level: ACTIVITY_LEVEL.DANGER,
    message: `Lead "${lead.name}" deleted successfully.`,
    oldValue: {
      isDeleted: false,
    },
    newValue: {
      isDeleted: true,
    },
  });

  return {
    message: "Lead deleted successfully.",
  };
};