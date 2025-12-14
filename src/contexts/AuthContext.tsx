import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { LoginRequest, RegisterRequest } from '../types/auth';

interface User {
    id: string;
    email: string;
    name: string;
    program: string;
    year: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (credentials: RegisterRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const initAuth = async () => {
            const existingToken = authService.getToken();
            const storedUser = localStorage.getItem('user');
            
            if (existingToken && storedUser) {
                setToken(existingToken);
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        };

        initAuth();

        // Listen for auth expiration events
        const handleAuthExpired = () => {
            setToken(null);
            setUser(null);
        };

        window.addEventListener('auth-expired', handleAuthExpired);
        return () => window.removeEventListener('auth-expired', handleAuthExpired);
    }, []);

    const login = async (credentials: LoginRequest) => {
        const response = await authService.login(credentials);
        const userData: User = {
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            program: response.data.program,
            year: response.data.year,
        };
        setToken(response.data.token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const register = async (credentials: RegisterRequest) => {
        const response = await authService.register(credentials);
        const userData = {
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            program: response.data.program,
            year: response.data.year,
        };
        setToken(response.data.token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        authService.logout();
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}