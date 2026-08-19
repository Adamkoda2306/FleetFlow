
import { createUserInterface, generalResponseInterface, getUsersInterface } from "../interface/user.route.interface";
import { createUser, getUserById } from "../services/user.services";

const registerUser = async (call: any, callback: any) => {
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

const getUser = async (call: any, callback: any) => {
    try {
        const id: string = call.request;
        const result: getUsersInterface = await getUserById(id);
        return callback(null, {
                statusCode: result.statusCode,
                success: result.success,
                message: result.message,
            }
        );
    } catch (error) {
        console.error(error);
        return callback(null, {
                statusCode: 500,
                success: false,
                message: 'Internal Server Error!'
            }
        );
    }
};

export {
    registerUser,
    getUser
};