import nodemailer from "nodemailer";

/**
 * ==========================================
 * Nodemailer Transporter
 * ==========================================
 */

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * ==========================================
 * Verify Connection
 * ==========================================
 */

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email configuration failed:", error.message);
  } else {
    console.log("✅ Email service connected.");
  }
});

export default transporter;