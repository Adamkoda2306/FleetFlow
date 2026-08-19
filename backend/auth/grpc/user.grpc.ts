import { CreateUserRequest, CreateUserResponse, GetUserRequest, GetUserResponse } from "../interface/grpc.interface";
import { userClient } from "./grpc.client";


// ===============================
// CREATE USER
// ===============================

const createUserGrpc = (data: CreateUserRequest): Promise<CreateUserResponse> => {
    return new Promise( (resolve, reject) => {
            const deadline = new Date(Date.now() + 3000);
            userClient.CreateUser( data, { deadline }, ( error: any, response: CreateUserResponse ) => {
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
// GET USER
// ===============================

const getUserGrpc = (data: GetUserRequest): Promise<GetUserResponse> => {
    return new Promise((resolve, reject) => {
            const deadline = new Date(Date.now() + 3000);
            userClient.GetUser(data, { deadline }, (error: any, response: GetUserResponse) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(response);
                }
            );
        }
    );
};

export {
    createUserGrpc,
    getUserGrpc
};