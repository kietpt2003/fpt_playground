import { useContext } from "react";
import { NonPlayerCharacterContext } from "../context/NonPlayerCharacterContext";

// Hook để sử dụng AudioContext
const useNPC = () => {
    const context = useContext(NonPlayerCharacterContext);
    if (!context) {
        throw new Error('useNPC must be used within an NonPlayerCharacterProvider');
    }
    return context;
};

export default useNPC;
