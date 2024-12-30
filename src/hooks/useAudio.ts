import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";

// Hook để sử dụng AudioContext
const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

export default useAudio;
