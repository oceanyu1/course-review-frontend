export interface JwtResponse {
    id: string;
    token: string;
    email: string;
    name: string;
    program: string;
    year: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    program: string;
    year: number;
}