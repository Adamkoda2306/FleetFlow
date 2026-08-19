import { Response, Request, NextFunction } from "express";
import { RegisterInterface } from "../interface/auth.interface";
import { RegisterServiceResponseInterface } from "../interface/auth.routes.interface";
import { registerService } from "../services/auth.services";


const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: RegisterInterface = req.body as RegisterInterface;
        const result: RegisterServiceResponseInterface = await registerService(data);
        return res.status(result.statusCode).json({ 
            success: result.success, 
            message: result.message, 
            ...(result.accessToken && {accessToken: result.accessToken}), 
            ...(result.refreshToken && {refreshToken: result.refreshToken})
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export {
    registerController
};