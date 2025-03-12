import { useContext } from "react";
import { CameraContext } from "../context/CameraContext";

const useCamera = () => {
    const context = useContext(CameraContext);
    if (!context) {
        throw new Error('useCamera must be used within an CameraProvider');
    }
    return context;
};

export default useCamera;
