import transporter from "../config/mail.js";
import ApiError from "../utils/ApiError.js";

/**
 * ==========================================
 * Send Email
 * ==========================================
 */
export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}) => {
  try {
    const mailOptions = {
      from: `"Sales CRM" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    throw new ApiError(
      500,
      `Failed to send email: ${error.message}`
    );
  }
};

/**
 * ==========================================
 * Welcome Email
 * ==========================================
 */
export const sendWelcomeEmail = async ({
  name,
  email,
}) => {
  return await sendEmail({
    to: email,
    subject: "Welcome to Sales CRM",

    text: `Welcome ${name}! Your Sales CRM account has been created successfully.`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Welcome to Sales CRM 🎉</h2>

        <p>Hello <strong>${name}</strong>,</p>

        <p>
          Your account has been created successfully.
        </p>

        <p>
          You can now log in and start using the CRM.
        </p>

        <br>

        <p>Regards,</p>
        <p><strong>Sales CRM Team</strong></p>
      </div>
    `,
  });
};

/**
 * ==========================================
 * Lead Assigned Email
 * ==========================================
 */
export const sendLeadAssignedEmail = async ({
  salesExecutive,
  email,
  leadName,
  company,
}) => {
  return await sendEmail({
    to: email,
    subject: "New Lead Assigned",

    text: `Hi ${salesExecutive}, a new lead (${leadName}) has been assigned to you.`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">

        <h2>New Lead Assigned</h2>

        <p>Hello <strong>${salesExecutive}</strong>,</p>

        <p>
          A new lead has been assigned to you.
        </p>

        <table cellpadding="8">

          <tr>
            <td><strong>Lead</strong></td>
            <td>${leadName}</td>
          </tr>

          <tr>
            <td><strong>Company</strong></td>
            <td>${company}</td>
          </tr>

        </table>

        <br>

        <p>Please follow up with the customer as soon as possible.</p>

      </div>
    `,
  });
};

/**
 * ==========================================
 * Password Reset Email
 * ==========================================
 */
export const sendPasswordResetEmail = async ({
  email,
  resetLink,
}) => {
  return await sendEmail({
    to: email,

    subject: "Reset Your Password",

    text: `Reset your password using the following link: ${resetLink}`,

    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">

        <h2>Password Reset</h2>

        <p>
          Click the button below to reset your password.
        </p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>

        <p>
          If you didn't request this, please ignore this email.
        </p>

      </div>
    `,
  });
};