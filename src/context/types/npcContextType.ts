import { ReactNode } from "react";

interface NPCContextProps {
    loadSound: (soundIndex?: number) => Promise<void>;
    increaseSpeedRate: (rate: number) => Promise<void>;
    stopTypingSound: () => Promise<void>;
    loadTypingSound: () => Promise<void>;
}

interface NPCProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

export { NPCContextProps, NPCProviderProps }