import { useContext } from "react";
import { ClickContext } from "../context/ClickContext";

// Hook để sử dụng AudioContext
const useClick = () => {
    const context = useContext(ClickContext);
    if (!context) {
        throw new Error('useClick must be used within an ClickProvider');
    }
    return context;
};

export default useClick;
