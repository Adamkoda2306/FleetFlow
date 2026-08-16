export interface LoginServiceResponseInterface { 
    statusCode: number;
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string
};