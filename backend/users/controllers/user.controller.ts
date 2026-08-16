import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { 
    createUserInterface, 
    generalResponseInterface, 
    getUsersInterface 
} from "../interface/user.route.interface";
import { 
    createUser,
    deleteUser,
    getUserByEmail,
    getUserById,
    getUsers, 
    updateUserName,
    updateUserPassword,
    updateUserRole
} from "../services/user.services";
import { UserRole } from "../models/user.model";

const getUsersController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const email: string | null = req.query.email as string || null;
            let result: getUsersInterface;
            if (email != null) {
                result = await getUserByEmail(email);
            } else {
                result = await getUsers();
            }
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
                ...(result.users.length > 0 && {
                    user: result.users.map((user) => ({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    })),
                })
            });
        } catch (err: any) {
            return res.status(500).json({ 
                success: false, 
                message: "Internal Server Error!"
            });
        }
    }
    return res.status(401).json({ 
        success: false, 
        message: "Invalid token payload"
    });
};

const getUserByIdController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const result: getUsersInterface = await getUserById(id);
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
                ...(result.users.length > 0 && {
                    user: result.users.map((user) => ({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    })),
                })
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error!"
            });
        }
    }
    return res.status(401).json({ 
        success: false,
        message: "Invalid token payload"
    });
};

const createUserController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const data: createUserInterface = req.body;
            const result: generalResponseInterface = await createUser(data);
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error!"
            });
        }
    }
    return res.status(401).json({
        success: false,
        message: "Invalid token payload"
    });
};

const updateNameController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const name: string = req.body.name as string;
            const result: generalResponseInterface = await updateUserName(id, name);
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            });
        }
    }
    return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
    });
};

const updatePasswordController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const password_hash: string = req.body.password_hash as string;
            const result: generalResponseInterface = await updateUserPassword(id, password_hash);
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            });
        }
    }
    return res.status(401).json({
        success: false,
        message: "Invalid token payload"
    });
};

const updateRoleController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const role: UserRole = req.body.role as UserRole;
            const result: generalResponseInterface = await updateUserRole(id, role);
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            });
        }
    }
    return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
    });
};

const deleteUserController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const result: generalResponseInterface = await deleteUser(id);
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            });
        }
    } 
    return res.status(401).json({
        success: false,
        message: 'Invalid token payload'
    });
};

export {
    getUsersController,
    getUserByIdController,
    createUserController,
    updateNameController,
    updatePasswordController,
    updateRoleController,
    deleteUserController
};