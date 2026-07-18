import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

// Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
];

if (process.env.CLIENT_URL) {
  const normalizedUrl = process.env.CLIENT_URL.replace(/\/$/, "");
  if (!allowedOrigins.includes(normalizedUrl)) {
    allowedOrigins.push(normalizedUrl);
  }
}

// CORS Configuration
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without Origin (Postman, server-to-server, health checks)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.some(
        (allowed) => allowed.replace(/\/$/, "") === normalizedOrigin
      );

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cookies
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sales CRM API is running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api/v1", routes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;