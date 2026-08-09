import express, { Application, Request, Response, NextFunction } from "express";
import type { RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import { dashboardRouter, log } from "logsave-hub";

const app: Application = express();

/* -------------------- Middlewares -------------------- */
// Secure HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Prevent HTTP parameter pollution
app.use(hpp());

// Global rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});
app.use(globalLimiter);

// Body Parsing
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

/* ----------------------- ROUTES ------------------------ */
// Root health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "FleetFlow Auth Service is Live",
  });
});

// Dashboard for Backend Logs
app.use("/logsave-hub", dashboardRouter as unknown as RequestHandler);

// API routes


// 404 handling
app.use((req: Request, res: Response) => {
    log.warn(`Route Not Found -> ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Not Found!"});
});

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error(`Error: `, err.message);
    res.status(500).json({ error: "Internal Server Error!"});
});

export { app };
export default app;