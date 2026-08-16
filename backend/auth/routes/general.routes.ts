import express, { Request, Response, NextFunction } from "express";
import type { RequestHandler } from "express";
import { dashboardRouter, log } from "logsave-hub";
const router = express.Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     description: Checks whether the FleetFlow Auth Service is running.
 *     tags:
 *       - Health
 *
 *     responses:
 *       200:
 *         description: Service is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: FleetFlow Auth Service is Live
 */
router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "FleetFlow Auth Service is Live",
  });
});

// Logs DashBoard
router.use("/logsave-hub", dashboardRouter as unknown as RequestHandler);

// 404 handling
router.use((req: Request, res: Response) => {
    log.warn(`Route Not Found -> ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Not Found!"});
});

// Error Handling
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error(`Error: `, err.message);
    res.status(500).json({ error: "Internal Server Error!"});
});

export default router;