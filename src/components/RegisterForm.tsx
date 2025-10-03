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

const MAJORS = [
    "Accounting",
    "Accounting (BAcc)",
    "Actuarial Science",
    "Aerospace Engineering",
    "Africa and Globalization",
    "African Studies",
    "Algorithms",
    "Anthropology",
    "Applied Linguistics and Discourse Studies",
    "Applied Physics",
    "Architectural Conservation and Sustainability Engineering",
    "Architectural Studies (BAS)",
    "Art History",
    "Artificial Intelligence and Machine Learning",
    "Arts (BA)",
    "Biochemistry",
    "Bioinformatics",
    "Biology (BA)",
    "Biology (BSc)",
    "Biomedical and Electrical Engineering",
    "Biomedical and Mechanical Engineering",
    "Biomedical Sciences",
    "Biotechnology",
    "Business Analytics",
    "Chemistry",
    "Childhood and Youth Studies",
    "Civil Engineering",
    "Cognitive Science (BCogSc)",
    "Commerce (Business) (BCom)",
    "Communication and Media Studies (BCoMS)",
    "Communications Engineering",
    "Computational and Applied Mathematics and Statistics",
    "Computer Game Development",
    "Computer Science (BCS)",
    "Computer Systems Engineering",
    "Criminology and Criminal Justice",
    "Cybersecurity",
    "Cybersecurity (BCyber)",
    "Data Science (BDS)",
    "Disability and Chronic Illness",
    "Earth Sciences",
    "Earth Sciences in Vertebrate Paleontology and Paleoecology",
    "Economics (BEcon)",
    "Electrical Engineering",
    "Engineering (BEng)",
    "Engineering Physics",
    "English",
    "Entrepreneurship",
    "Environment and Health",
    "Environmental and Climate Change Studies",
    "Environmental Engineering",
    "Environmental Science",
    "Europe and Russia in the World",
    "European and Russian Studies",
    "Film Studies",
    "Finance",
    "French",
    "General Studies (Online)",
    "Geography (BA)",
    "Geomatics",
    "Geomatics (BSc)",
    "Global and International Studies (BGInS)",
    "Global and Transnational History",
    "Global Development",
    "Global Genders and Sexualities",
    "Global Health",
    "Global Inequalities and Social Change",
    "Global Law and Social Justice",
    "Global Media and Communication",
    "Global Politics",
    "Global Religions: Identity and Community",
    "Globalization and the Environment",
    "Globalization, Culture, and Power",
    "Greek and Roman Studies",
    "Health Sciences (BHSc)",
    "Health Throughout the Lifespan",
    "History",
    "History and Theory of Architecture",
    "Human Rights and Social Justice (BA)",
    "Humanities (Great Books) (includes HUMS-Biology) (BHum)",
    "Humanities and Biology",
    "Indigenous Studies",
    "Industrial Design (BID)",
    "Information Resource Management (IRM)",
    "Information Systems",
    "Information Technology (BIT)",
    "Interactive Multimedia and Design (IMD)",
    "International Business (BCom)",
    "International Business (BIB)",
    "International Economic Policy",
    "Journalism (BJ)",
    "Journalism and Humanities (BJHum)",
    "Latin American and Caribbean Studies",
    "Law (BA)",
    "Linguistics (BA)",
    "Linguistics (BSc)",
    "Management",
    "Management and Business Systems",
    "Marketing",
    "Mathematics",
    "Mathematics (BMath)",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Media Production and Design (BMPD)",
    "Music (BA)",
    "Music (BMus)",
    "Nanoscience",
    "Network Technology (NET)",
    "Neuroscience and Mental Health",
    "Nursing (BScN)",
    "Philosophy",
    "Physical Geography",
    "Physics",
    "Political Science",
    "Psycholinguistics and Communication Differences",
    "Psychology (BA)",
    "Psychology (BSc)",
    "Public Affairs and Policy Management (BPAPM)",
    "Religion",
    "Science (BSc)",
    "Social Work (BSW)",
    "Sociology",
    "Software Engineering (BEng)",
    "Software Engineering (Computer Science)",
    "Statistics",
    "Supply Chain Management",
    "Sustainable and Renewable Energy Engineering",
    "Undeclared",
    "User Experience and User Interfaces (UX/UI)",
    "Women’s and Gender Studies"
];

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
                                            <SelectContent className="max-h-[300px] overflow-y-auto">
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