import { ReactNode } from "react";

interface ClickContextProps {
    playSound: () => Promise<void>;
}

interface ClickProviderProps {
    children: ReactNode; // Định nghĩa children là ReactNode
}

export { ClickContextProps, ClickProviderProps }