import { statusCodes } from "@react-native-google-signin/google-signin";
import { AppError } from "../components/types/errorModalTypes";
import { Dispatch, SetStateAction } from "react";

export const handleError = (
    error: AppError,
    setStringErr: Dispatch<SetStateAction<string>>,
    setIsError: Dispatch<SetStateAction<boolean>>
) => {
    if ('code' in error) {
        // Lỗi từ Google SignIn
        switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
                console.log("SIGN_IN_CANCELLED");
                break;
            case statusCodes.IN_PROGRESS:
                console.log("IN_PROGRESS");
                break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                console.log("PLAY_SERVICES_NOT_AVAILABLE");
                break;
            default:
                console.log("Google Sign-In Error:", error.message);
        }
    } else if ('statusCode' in error) {
        // Lỗi mạng
        console.log(`Network Error: ${error.message}, Status Code: ${error.statusCode}`);
    } else {
        // Generic lỗi khác
        console.log("Some other error happened:", error.message);
    }

    setStringErr(error.message || "Lỗi không xác định. Vui lòng thử lại.");
    setIsError(true);
};