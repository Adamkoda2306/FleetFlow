import { 
    CreateUserRequest, 
    FinalUserResponse,
    UpdateUserLogin, 
    UpdateUserLogout,
    UpdateUserName,
    UpdateUserPhonenumber 
} from "../interface/grpc.interface";
import { userClient } from "./grpc.client";


// ===============================
// CREATE USER
// ===============================

const createUserGrpc = (data: CreateUserRequest): Promise<FinalUserResponse> => {
    return new Promise( (resolve, reject) => {
            const deadline = new Date(Date.now() + 3000);
            userClient.registerUser( data, { deadline }, ( error: any, response: FinalUserResponse ) => {
                    if (error) {
                        return reject(error);
                    }
                    // console.log("createUser GRPC in user.grpc: ", response);
                    resolve(response);
                }
            );
        }
    );
};


// ===============================
// LOGIN UPDATE
// ===============================

const loginUpdateGrpc = (data: UpdateUserLogin): Promise<FinalUserResponse> => {
    return new Promise((resolve, reject) => {
            const deadline = new Date(Date.now() + 3000);
            userClient.updateLogin(data, { deadline }, (error: any, response: FinalUserResponse) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(response);
                }
            );
        }
    );
};

// ===============================
// LOGOUT UPDATE
// ===============================

const logoutUpdateGrpc = (data: UpdateUserLogout): Promise<FinalUserResponse> => {
    return new Promise((resolve, reject) => {
        const deadline = new Date(Date.now() + 3000);
        userClient.updateLogout(data, { deadline }, (error: any, response: FinalUserResponse) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
}

// ===============================
// UPDATE NAME
// ===============================

const updateNameGrpc = async (data: UpdateUserName): Promise<FinalUserResponse> => {
    return new Promise((resolve, reject) => {
        const deadline = new Date(Date.now() + 3000);
        userClient.updateName(data, { deadline }, (error: any, response: FinalUserResponse) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    }); 
}

// ===============================
// UPDATE PHONENUMBER
// ===============================

const updatePhonenumberGrpc = async (data: UpdateUserPhonenumber): Promise<FinalUserResponse> => {
    return new Promise((resolve, reject) => {
        const deadline = new Date(Date.now() + 3000);
        userClient.updatePhonenumber(data, { deadline }, (error: any, response: FinalUserResponse) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    }); 
}

export {
    createUserGrpc,
    loginUpdateGrpc,
    logoutUpdateGrpc,
    updateNameGrpc,
    updatePhonenumberGrpc
};