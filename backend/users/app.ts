import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";
import generalRoutes from "./routes/general.routes";
import userRoutes from "./routes/user.routes";


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
// Swagger API Documentation UI
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// General API routes
app.use("/", generalRoutes);

// API routes
app.use("/api/v1/", userRoutes);



export { app };
export default app;