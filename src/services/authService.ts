import api from "./api";
import type { LoginRequest, RegisterRequest, JwtResponse } from "../types/auth";

const TOKEN_KEY = 'token';

export const authService = {
    login: async (credentials: LoginRequest) => {
        const response = await api.post<JwtResponse>('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem(TOKEN_KEY, response.data.token);
        }
        return response;
    },

    register: async (credentials: RegisterRequest) => {
        const response = await api.post<JwtResponse>('/auth/register', credentials);
        if (response.data.token) {
            localStorage.setItem(TOKEN_KEY, response.data.token);
        }
        return response;
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    isLoggedIn: (): boolean => {
        return !!localStorage.getItem(TOKEN_KEY);
    }
};