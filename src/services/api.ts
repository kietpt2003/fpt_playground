import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { env } from "../constants/environmentVariables";

const { NODE_ENV, DEV_API, PROD_API } = env;

const api = axios.create({
    baseURL:
        NODE_ENV == "development"
            ? DEV_API
            : PROD_API,
});

// Add a request interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const url =
            NODE_ENV == "development"
                ? (DEV_API + "/auth/refresh")
                : (PROD_API + "/auth/refresh");

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status >= 400 && error.response.status <= 500 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const currRefreshToken = await AsyncStorage.getItem("refreshToken");
                const response = await axios.post(url, {
                    refreshToken: currRefreshToken,
                });
                const { token, refreshToken } = response.data;

                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("refreshToken", refreshToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                console.log("loi o day", error);

            }
        }

        return Promise.reject(error);
    }
);

export default api;
