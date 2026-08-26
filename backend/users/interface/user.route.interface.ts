import { User } from "../models/user.model";

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
    name: string;
    email: string;
    phonenumber: string;
    fcm_token: string;
};

export interface loginUserInterface {
    id: string;
    fcm_token: string;
    is_active: boolean;
}