import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import messaging from '@react-native-firebase/messaging';

export interface NotificationContextProps {
    deviceToken: string | null;
}

export interface NotificationProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

function NotificationProvider({ children }: NotificationProviderProps) {
    const [deviceToken, setDeviceToken] = useState<string | null>(null);

    // registerDeviceForRemoteMessages and getDeviceToken
    useEffect(() => {
        const registerFCM = async () => {
            await messaging().registerDeviceForRemoteMessages();
            let token = await messaging().getToken();
            setDeviceToken(token);
        }
        registerFCM()
    }, [])

    return (
        <NotificationContext.Provider value={{
            deviceToken,
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider };
