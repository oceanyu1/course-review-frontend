import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom";

const MAJORS = ["Computer Science", "Business", "Biology", "Psychology", "Engineering", "Nursing", "Education", "Economics", "Political Science", "Sociology"];

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    program: z.string().min(1, "Please select your program."),
    year: z.number().min(1, "Please select your year of study."),
});

function RegisterForm() {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            program: "",
            year: 0,
        },
    })
    
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    // const [program, setProgram] = useState('');
    // const [year, setYear] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (values: z.infer<typeof registerSchema>) => {
        setLoading(true);
        setError(null);

        try {
            await register(values);
            console.log('Register success');
            navigate('/');
            // Redirect or update UI after successful login
        } catch (err) {
            setError('Register failed');
            console.error('Register failed:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information to get started. Note that you must have a Carleton email to register.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="mb-1">
                                            <FormLabel>Name</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input 
                                                placeholder="John Doe" 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="mb-1">
                                            <FormLabel>Email</FormLabel>
                                        </div>
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
                                        <div className="mb-1">
                                            <FormLabel>Password</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="program"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="mb-1">
                                            <FormLabel>Program</FormLabel>
                                        </div>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your program" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {MAJORS.map(major => (
                                                    <SelectItem key={major} value={major}>
                                                        {major}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="mb-1">
                                            <FormLabel>Year of Study</FormLabel>
                                        </div>
                                        <Select 
                                            onValueChange={(value) => field.onChange(parseInt(value))} 
                                            defaultValue={field.value?.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">First Year</SelectItem>
                                                <SelectItem value="2">Second Year</SelectItem>
                                                <SelectItem value="3">Third Year</SelectItem>
                                                <SelectItem value="4">Fourth Year</SelectItem>
                                                <SelectItem value="5">Fifth Year+</SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                {loading ? 'Registering...' : 'Register'}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <a href="/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterForm;