export interface RegisterServiceResponseInterface { 
    statusCode: number;
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string
};