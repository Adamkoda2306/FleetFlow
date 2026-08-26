import { pool } from "../config/db.config";
import { createUserInterface, generalResponseInterface, loginUserInterface } from "../interface/user.route.interface";
import { User, UserModel } from "../models/user.model";
import { createUser, updateUserName, updateUserPhoneNumber } from "../services/user.services";

const registerUserDetails = async (call: any, callback: any) => {
    try {
        const data: createUserInterface = call.request;
        const result: generalResponseInterface = await createUser(data);
        return callback(null, result);
    } catch (error: any) {
        console.error('Error at registerUser in user-utils.grpc: ', error.message);
        return callback(null, {
                statusCode: 500,
                success: false,
                message: 'Internal Server Error!'
            }
        );
    }
};


const updateUserNameDetails = async (call: any, callback: any) => {
    try {
        const data: { id: string, name: string } = call.request;
        const result: generalResponseInterface = await updateUserName(data.id, data.name);
        return callback(null, result);
    } catch (err: any) {
        return callback(null, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        });
    }
}

const updateUserPhonenumberDetails = async (call: any, callback: any) => {
    try {
        const data: { id: string, phonenumber: string } = call.request;
        const result: generalResponseInterface = await updateUserPhoneNumber(data.id, data.phonenumber);
        return callback(null, result);
    } catch (err: any) {
        return callback(null, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        });
    }
}


/*
    MULTIPLE TRANSACTIONS
*/

const updateLoginDetails = async (call: any, callback: any) => {
    const connection = await pool.getConnection();
    try {
        const data: loginUserInterface = call.request;

        await connection.beginTransaction();
        
        const user: User | [] = await UserModel.findById(data.id, connection);
        if (Array.isArray(user)) {
            await connection.rollback();
            return callback(null, {
                    statusCode: 404,
                    success: false,
                    message: 'User Not Found!'
                }
            );
        }

        const resultUpdateIsActive: boolean = await UserModel.updateIsActive(data.id, data.is_active, connection);
        if (!resultUpdateIsActive) throw new Error('Is Active is not updated in the DB');

        const resultUpdateFCMToken: boolean = await UserModel.updateFcmToken(data.id, data.fcm_token, connection);
        if (!resultUpdateFCMToken) throw new Error('FCM Token is not updated in the DB');
        
        await connection.commit();

        return callback(null, {
            statusCode: 200,
            success: true,
            message: 'Successfully Updated Details for Login!',
            id: user.id,
            role: user.role
        });
    } catch (err: any) {
        await connection.rollback();
        return callback(null, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        });
    } finally {
        connection.release();
    }
}

const updateLogoutDetails = async (call: any, callback: any) => {
    const connection = await pool.getConnection();
    try {
        const data: { id: string, is_active: boolean } = call.request;

        await connection.beginTransaction();

        const user: User | [] = await UserModel.findById(data.id, connection);
        if (Array.isArray(user)) {
            await connection.rollback();
            return callback(null, {
                statusCode: 404,
                success: false,
                message: 'User Not Found!'
            });
        }

        const resultUpdateIsActive: boolean = await UserModel.updateIsActive(data.id, data.is_active, connection);
        if (!resultUpdateIsActive) throw new Error('Is Active is not updated in the DB');

        await connection.commit();

        return callback(null, {
            statusCode: 200,
            success: true,
            message: 'Successfully Updated the Logout Details!'
        });
    } catch (err: any) {
        await connection.rollback();
        return callback(null, {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        });
    } finally {
        connection.release();
    }
}


/*
    EXPORTING
*/

export {
    registerUserDetails,
    updateLoginDetails,
    updateLogoutDetails,
    updateUserNameDetails,
    updateUserPhonenumberDetails
};