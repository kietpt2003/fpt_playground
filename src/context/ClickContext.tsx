import React, { createContext, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { ClickContextProps, ClickProviderProps } from './types/clickContextType';

const ClickContext = createContext<ClickContextProps | undefined>(undefined);

function ClickProvider({ children }: ClickProviderProps) {
    const soundRef = useRef<Audio.Sound | null>(null);

    // Phát bài hát đã chọn
    const playSound = async () => {
        if (soundRef.current) {
            await soundRef.current.replayAsync(); // Phát lại âm thanh
        }
    };

    // Load âm thanh khi component được mount
    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/audios/click.mp3') // Đường dẫn tới file âm thanh
            );
            soundRef.current = sound;
        };

        loadSound();

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync(); // Giải phóng tài nguyên khi component bị unmount
            }
        };
    }, []);

    return (
        <ClickContext.Provider value={{
            playSound,
        }}>
            {children}
        </ClickContext.Provider>
    );
};

export { ClickContext, ClickProvider };
