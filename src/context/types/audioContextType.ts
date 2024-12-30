import { Audio } from "expo-av";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface AudioContextProps {
    sound: Audio.Sound | null;
    setSound: Dispatch<SetStateAction<Audio.Sound | null>>,
    volume: number,
    setVolume: Dispatch<SetStateAction<number>>,
    currentSongIndex: number;
    setCurrentSongIndex: Dispatch<number>,
    isPlaying: boolean;
    playSong: (
        index: number,
    ) => Promise<void>;
    pauseSong: () => Promise<void>;
    resumeSong: () => Promise<void>;
    handleForward: () => Promise<void>;
    handleBackward: () => Promise<void>;
}

interface AudioProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

export { AudioContextProps, AudioProviderProps }