import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { AxiosError } from 'axios';

import { Link, useNavigate } from "react-router-dom";

interface ApiErrorResponse {
    message?: string;
    error?: string;
    violations?: Array<{
        field: string;
        message: string;
    }>;
}

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);  

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true);
        setError(null);

        try {
            await login(values);
            console.log('Logged in');
            navigate('/');
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            
            if (axiosError.response?.data) {
                const errorData = axiosError.response.data;
                
                // Handle string response
                if (typeof errorData === 'string') {
                    setError(errorData);
                }
                // Handle object response with message
                else if (errorData.message) {
                    setError(errorData.message);
                }
                // Handle validation errors array
                else if (errorData.violations && errorData.violations.length > 0) {
                    const errorMessages = errorData.violations.map(v => v.message).join(', ');
                    setError(errorMessages);
                }
                // Handle generic error object
                else if (errorData.error) {
                    setError(errorData.error);
                }
                else {
                    setError('Login failed. Please try again.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
            
            console.error('Login failed:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="you@example.com" 
                                                type="email"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;