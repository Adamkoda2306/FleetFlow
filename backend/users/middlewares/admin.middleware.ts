import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Forbidden | Unauthorized Access!",
    });
  }

  next();
};

export default adminMiddleware;