import { Response, Request, NextFunction } from "express";
import { LoginInterface } from "../interface/auth.interface";
import { LoginServiceResponseInterface } from "../interface/auth.routes.interface";
import { loginService } from "../services/auth.services";


const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: LoginInterface = req.body as LoginInterface;
        const result: LoginServiceResponseInterface = await loginService(data);
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
    loginController
};