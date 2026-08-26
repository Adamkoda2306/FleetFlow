export interface CreateUserRequest {
    name: string;
    email: string;
    phonenumber: string;
    fcm_token: string;
}


export interface FinalUserResponse {
    statusCode: number;
    success: boolean;
    message: string;
    id?: string;
    role?: string;
}

export interface UpdateUserLogin {
    id: string;
    is_active: boolean;
    fcm_token: string;
}

export interface UpdateUserLogout {
    id: string;
    is_active: boolean;
}

export interface UpdateUserName {
    id: string;
    name: string;
}

export interface UpdateUserPhonenumber {
    id: string;
    phonenumber: string;
}
