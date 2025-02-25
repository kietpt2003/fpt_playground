import { useContext } from "react";
import { ApiServerContext, ApiServerContextType } from "../context/ApiServerContext";

export const useApiServer = (): ApiServerContextType => {
    const context = useContext(ApiServerContext);
    if (!context) {
        throw new Error("useApiServer must be used within an ApiServerProvider");
    }
    return context;
};