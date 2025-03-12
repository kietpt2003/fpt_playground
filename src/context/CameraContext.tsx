import React, { createContext, useState } from 'react';
import { Linking } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { CameraContextProps, CameraProviderProps } from './types/cameraContextType';

const CameraContext = createContext<CameraContextProps | undefined>(undefined);

function CameraProvider({ children }: CameraProviderProps) {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [requestPermission, setRequestPermission] = useState(true);
    const [canAskAgain, setCanAskAgain] = useState(true);

    const requestPermissionAsync = async () => {
        const { status, canAskAgain: expoCanAskAgain } = await requestCameraPermission(); // Xin quyền truy cập
        if (status === 'granted') {
            setRequestPermission(false);
        } else {
            setRequestPermission(true);
        }
        setCanAskAgain(expoCanAskAgain);

        if (!expoCanAskAgain) {
            await Linking.openSettings();
        }
        return status;
    }

    const requestPermissionWithoutLinkingAsync = async () => {
        const { status, canAskAgain: expoCanAskAgain } = await requestCameraPermission(); // Xin quyền truy cập
        if (status === 'granted') {
            setRequestPermission(false);
        } else {
            setRequestPermission(true);
        }
        setCanAskAgain(expoCanAskAgain);
        return {
            status,
            canAskAgain: expoCanAskAgain
        };
    }


    return (
        <CameraContext.Provider value={{
            isNeedCameraPermission: requestPermission,
            canAskAgain,
            requestCameraPermissionWithoutLinking: requestPermissionWithoutLinkingAsync,
            requestCameraPermission: requestPermissionAsync,
        }}>
            {children}
        </CameraContext.Provider>
    );
};

export { CameraContext, CameraProvider };
