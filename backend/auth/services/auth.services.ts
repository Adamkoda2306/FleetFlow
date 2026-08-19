import { RegisterInterface } from "../interface/auth.interface";
import { RegisterServiceResponseInterface } from "../interface/auth.routes.interface";
import {
    createUserGrpc,
    getUserGrpc
} from "../grpc/user.grpc";
import { CreateUserResponse } from "../interface/grpc.interface";
import { generateTokenUser } from "../utils/jwt.utils";


const registerService = async (data: RegisterInterface): Promise<RegisterServiceResponseInterface> => {
    try {
        const result: CreateUserResponse = await createUserGrpc(data);
        if (!result.success) {
            // console.log('Error at registerService in auth.service due to grpc');
            return result;
        }
        if (!result.id || !result.role) {
            throw new Error('Internal Server Error!');
        }

        const accessToken = await generateTokenUser(result.id, result.role, false, false);
        const refreshToken = await generateTokenUser(result.id, result.role, true, false);

        if (!accessToken.success) {
            return { statusCode: 500, success: false, message: accessToken.message };
        }
        if (!refreshToken.success) {
            return { statusCode: 500, success: false, message: refreshToken.message };
        }

        return {
            statusCode: result.statusCode,
            success: result.success,
            message: result.message,
            accessToken: accessToken.token,
            refreshToken: refreshToken.token
        };
    } catch (err: any) {
        console.log('Error at registerService in auth.service :', err.message);
        return {
            statusCode: 500,
            success: false,
            message: 'Internal Server Error!'
        };
    }
};

export {
    registerService
};