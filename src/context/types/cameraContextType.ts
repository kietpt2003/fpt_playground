import { ReactNode } from "react";
import * as MediaLibrary from 'expo-media-library';

interface CameraContextProps {
    isNeedCameraPermission: boolean;
    canAskAgain: boolean;
    requestCameraPermissionWithoutLinking: () => Promise<{
        status: MediaLibrary.PermissionStatus,
        canAskAgain: boolean
    }>;
    requestCameraPermission: () => Promise<string>;
}

interface CameraProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

export { CameraContextProps, CameraProviderProps }
