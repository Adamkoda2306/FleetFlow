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
    getUserByPhoneNumber,
    getUsers, 
    updateUserFCMToken, 
    updateUserIsActive, 
    updateUserName,
    updateUserPhoneNumber,
    updateUserRole
} from "../services/user.services";
import { UserRole } from "../models/user.model";

const getUsersController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const email: string | null = req.query.email as string || null;
            const phonenumber: string | null = req.query.phonenumber as string || null;
            let result: getUsersInterface;
            if (email != null) {
                result = await getUserByEmail(email);
            } else if (phonenumber != null) {
                result = await getUserByPhoneNumber(phonenumber);
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
                        phonenumber: user.phonenumber,
                        role: user.role,
                        fcmToken: user.fcm_token,
                        is_active: user.is_active
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
                        email: user.email,
                        phonenumber: user.phonenumber,
                        role: user.role,
                        fcmToken: user.fcm_token,
                        is_active: user.is_active
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
                message: result.message,
                id: result.id,
                role: result.role
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

const updatePhoneNumberController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const phonenumber: string = req.body.phonenumber as string;
            const result: generalResponseInterface = await updateUserPhoneNumber(id, phonenumber);
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
}

const updateFCMTokenController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const fcmToken: string = req.params.fcm_token as string;
            const result: generalResponseInterface = await updateUserFCMToken(id, fcmToken);
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
}

const updateIsActiveController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (typeof req.user === 'object' && req.user !== null && 'id' in req.user) {
        try {
            const id: string = req.params.id as string;
            const is_active: boolean = req.body.is_active as boolean;
            const result: generalResponseInterface = await updateUserIsActive(id, is_active);
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
}

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
    updatePhoneNumberController,
    updateFCMTokenController,
    updateIsActiveController,
    updateRoleController,
    deleteUserController
};