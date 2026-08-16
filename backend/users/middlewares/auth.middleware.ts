import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthPayload {
  id: string;
  role: "USER" | "ADMIN" | "MEDIATER";
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

// authMiddleware
const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const secret = process.env.SECRET_KEY as string;
    if (!secret) {
      throw new Error("JWT_SECRET not configured in environment");
    }

    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    if (
      typeof decoded.id !== "string" ||
      !["USER", "ADMIN", "MEDIATER"].includes(decoded.role as string)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }
    
    req.user = {
      id: decoded.id,
      role: decoded.role as AuthPayload["role"],
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default authMiddleware;