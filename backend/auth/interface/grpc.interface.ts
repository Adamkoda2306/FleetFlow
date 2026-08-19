export interface CreateUserRequest {
    name: string;
    email: string;
    password_hash: string;
}


export interface CreateUserResponse {
    statusCode: number;
    success: boolean;
    message: string;
    id?: string;
    role?: string;
}

export interface GetUserRequest {
    id: string;
}


export interface GetUserResponse {
    statusCode: number;
    success: boolean;
    message: string;
}