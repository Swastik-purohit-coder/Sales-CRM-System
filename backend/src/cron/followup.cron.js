import cron from "node-cron";
import Lead from "../models/Lead.js";
import { createNotification } from "../services/notification.service.js";

import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from "../constants/notification.constants.js";

/**
 * ==========================================
 * Follow-up Reminder Cron
 * Runs Every Hour
 * ==========================================
 */

const startFollowupCron = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("⏰ Running Follow-up Reminder Cron...");

      const now = new Date();

      const leads = await Lead.find({
        isDeleted: false,
        followUpDate: {
          $lte: now,
        },
      })
        .populate(
          "assignedTo",
          "fullName email"
        )
        .populate(
          "createdBy",
          "fullName email"
        );

      console.log(
        `📌 ${leads.length} follow-up(s) found.`
      );

      /**
       * ==========================================
       * Future Integration
       * ==========================================
       *
       * Notification Module
       * Email Module
       * Socket.IO
       *
       * Example:
       *
       * await createNotification(...)
       *
       * await sendLeadReminderEmail(...)
       *
       */

      for (const lead of leads) {
        await createNotification({
  recipient: lead.assignedTo,
  title: "Follow-up Reminder",
  message: `Follow up with ${lead.name} today.`,
  type: NOTIFICATION_TYPE.FOLLOWUP_REMINDER,
  priority: NOTIFICATION_PRIORITY.HIGH,
  referenceId: lead._id,
  referenceModel: "Lead",
});
        console.log(
          `Lead: ${lead.name} | Assigned To: ${
            lead.assignedTo?.fullName || "Unassigned"
          }`
        );
      }
    } catch (error) {
      console.error(
        "❌ Follow-up Cron Error:",
        error.message
      );
    }
  });

  console.log("✅ Follow-up Cron Started");
};

export default startFollowupCron;