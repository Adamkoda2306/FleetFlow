import { LargeNumberLike } from "crypto";
import { User, UserRole } from "../models/user.model";

export interface getUsersInterface {
    statusCode: number;
    success: boolean;
    message: string;
    users: User[];
};

export interface generalResponseInterface {
    statusCode: number;
    success: boolean;
    message: string;
    id?: string;
    role?: string;
};

export interface createUserInterface {
    id: string;
    name: string;
    email: string;
    phonenumber: string;
    fcm_token: string;
};