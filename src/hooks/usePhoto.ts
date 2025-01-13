import { useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";

const usePhoto = () => {
    const context = useContext(PhotoContext);
    if (!context) {
        throw new Error('usePhoto must be used within an PhotoProvider');
    }
    return context;
};

export default usePhoto;
