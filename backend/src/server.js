import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import registerChatSocket from "./socket/chat.socket.js";
import startFollowupCron from "./cron/followup.cron.js";

const PORT = process.env.PORT || 5000;

/**
 * ==========================================
 * Connect Database
 * ==========================================
 */
connectDB();

/**
 * ==========================================
 * Create HTTP Server
 * ==========================================
 */
const server = http.createServer(app);

/**
 * ==========================================
 * Socket.IO Configuration
 * ==========================================
 */
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175"
];
if (process.env.CLIENT_URL && !allowedOrigins.includes(process.env.CLIENT_URL)) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

/**
 * ==========================================
 * Register Chat Socket
 * ==========================================
 */
registerChatSocket(io);

/**
 * ==========================================
 * Start Server
 * ==========================================
 */
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  /**
   * ==========================================
   * Start Cron Jobs
   * ==========================================
   */
  startFollowupCron();
});
