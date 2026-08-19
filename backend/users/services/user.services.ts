import { createUserInterface, generalResponseInterface, getUsersInterface } from "../interface/user.route.interface";
import { User, UserModel, UserRole } from "../models/user.model";
import { randomUUID } from "crypto";


const getUsers = async (): Promise<getUsersInterface> => {
    try {
        const result: User[] | [] = await UserModel.getAllUsers();
        return {
            statusCode: 200,
            success: true,
            message: 'Successfully Extracted All Users',
            users: result
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!',
            users: []
        };
    }
};

const getUserByEmail = async (email: string): Promise<getUsersInterface> => {
    try {
        const result: User | [] = await UserModel.findByEmail(email);
        const userFound = !Array.isArray(result);
        return {
            statusCode: userFound ? 200 : 404,
            success: userFound ? true : false,
            message: userFound
                ? "Successfully found the user!"
                : "User not found!",
            users: userFound ? [result] : result,
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!',
            users: []
        };
    }
};

const getUserById = async (id: string): Promise<getUsersInterface> => {
    try {
        const result: User | [] = await UserModel.findById(id);
        const userFound = !Array.isArray(result);
        return {
            statusCode: userFound ? 200 : 404,
            success: userFound ? true : false,
            message: userFound 
                ? 'Successfully found the user!'
                : 'User not found!',
            users: userFound ? [result] : result
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!',
            users: []
        };
    }
};

const createUser = async (data: createUserInterface): Promise<generalResponseInterface> => {
    try {
        const id: string = 'USR-' + randomUUID();
        const { name, email, password_hash } = data;
        const result: User | [] = await UserModel.create(id, name, email, password_hash);
        const userCreated = !Array.isArray(result);
        return {
            statusCode: userCreated ? 201 : 400,
            success: userCreated,
            message: userCreated ? 'Successfully Created the User!' : 'Unable to Create User',
            ...(userCreated ? { id: result.id, role: result.role } : {}),
        };
    } catch (err: any) {
        console.log('Error at createUser in user.service: ', err.message);
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};

const updateUserName = async (id: string, name: string): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.updateName(id, name);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully Updated the name' : 'Unable to Update name'
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};

const updateUserPassword = async (id: string, password_hash: string): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.updatePassword(id, password_hash);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully Updated the Password!' : 'Unable to Update password'
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};

const updateUserRole = async (id: string, role: UserRole): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.updateRole(id, role);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully Update the Role for the User!' : 'Unable to update role for the user'
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};

const deleteUser = async (id: string): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.delete(id);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully deleted the User!' : 'Unable to delete the User'
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};


export {
    getUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUserName,
    updateUserPassword,
    updateUserRole,
    deleteUser
};