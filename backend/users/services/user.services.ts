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

const getUserByPhoneNumber = async (phonenumber: string): Promise<getUsersInterface> => {
    try {
        const result: User | [] = await UserModel.findByPhonenumber(phonenumber);
        const userFound = !Array.isArray(result);
        return {
            statusCode: userFound ? 200 : 404,
            success: userFound,
            message: userFound ? 'Successfully found the User!' : 'User not Found',
            users: userFound ? [result] : result
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!',
            users:[]
        }
    }
}

const createUser = async (data: createUserInterface): Promise<generalResponseInterface> => {
    try {
        const id: string = 'USR-' + randomUUID();
        const { name, email, phonenumber, fcm_token } = data;
        const result: User | [] = await UserModel.create(id, name, email, phonenumber, fcm_token, true);
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

const updateUserFCMToken = async (id: string, fcm_token: string): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.updateFcmToken(id, fcm_token);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully Updated the Fcm Token!' : 'Unable to update the FCM_Token!'
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        }
    }
}

const updateUserPhoneNumber = async (id: string, phonenumber: string): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.updatePhonenumber(id, phonenumber);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully Updated the Phonenumber!' : 'Unable to Update Phonenumber'
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};

const updateUserIsActive = async (id: string, is_active: boolean): Promise<generalResponseInterface> => {
    try {
        const result: boolean = await UserModel.updateIsActive(id, is_active);
        return {
            statusCode: result ? 200 : 400,
            success: result,
            message: result ? 'Successfully Updated the IsActive!' : 'Unable to Update IsActive!'
        }
    } catch (err: any) {
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        }
    }
}

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
    getUserByPhoneNumber,
    getUserById,
    createUser,
    updateUserName,
    updateUserPhoneNumber,
    updateUserFCMToken,
    updateUserIsActive,
    updateUserRole,
    deleteUser
};