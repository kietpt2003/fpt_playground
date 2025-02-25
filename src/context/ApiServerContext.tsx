import { createContext, useEffect, useState } from "react";
import { env } from "../constants/environmentVariables";

export interface ApiServerContextType {
    apiUrl: string;
    setApiUrl: (url: string) => void;
}

const { NODE_ENV, DEV_API, DEV_API2, PROD_API, PROD_API2 } = env;

const SERVERS = [
    NODE_ENV == "development"
        ? DEV_API
        : PROD_API,
    NODE_ENV == "development"
        ? DEV_API2
        : PROD_API2,
];

export const ApiServerContext = createContext<ApiServerContextType | undefined>(undefined);

export const ApiServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apiUrl, setApiUrl] = useState(NODE_ENV == "development"
        ? DEV_API
        : PROD_API); // URL mặc định

    const checkServerWithTimeout = async (url: string, timeout = 3000): Promise<number | null> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const startTime = Date.now();
            const response = await fetch(url + "/ping", { method: "GET" });

            clearTimeout(timeoutId);
            if (!response.ok) throw new Error("Server Down");
            return Date.now() - startTime; // Trả về ping time
        } catch (error) {
            return null; // Server lỗi
        }
    };

    const getBestServer = async (): Promise<string | null> => {
        const results = await Promise.all(SERVERS.map(checkServerWithTimeout));
        const bestIndex = results.findIndex((time) => time !== null);

        return bestIndex !== -1 ? SERVERS[bestIndex] : null;
    };

    useEffect(() => {
        getBestServer().then((best) => {
            if (best != null) {
                setApiUrl(best)
            }
        });
        // if (NODE_ENV != "development") {
        // }
    }, []);

    return (
        <ApiServerContext.Provider value={{ apiUrl, setApiUrl }}>
            {children}
        </ApiServerContext.Provider>
    );
};