import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    //timeout: 10000,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Remove authorization header if no token exists
        delete config.headers.Authorization;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear auth data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth-expired'));
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;