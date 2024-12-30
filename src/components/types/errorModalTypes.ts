import { Dispatch, SetStateAction } from "react";

export interface errorModalProps {
    stringErr: string,
    isError: boolean,
    setIsError: Dispatch<SetStateAction<boolean>>
}

interface GoogleSignInError {
    message: string;
    code?: string; // Có thể chứa các giá trị như `statusCodes.SIGN_IN_CANCELLED`
}

interface NetworkError {
    message: string;
    statusCode?: number; // HTTP status code
}

interface GenericError {
    message: string;
}

export type AppError = GoogleSignInError | NetworkError | GenericError | Error;