import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function NavBar() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const initialTheme = savedTheme || systemTheme;
        
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Get user initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <nav className="border-b bg-background"> {/* Navbar container change border here*/ }
            <div className="container mx-auto px-8 h-18 flex items-center justify-between">
                {/* Logo/Brand */}
                <Link to="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                    RavenRate
                </Link>
                
                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="w-9 h-9"
                            >
                                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                            <Link 
                                to="/profile" 
                                className="text-sm font-medium hover:text-foreground transition-colors"
                            >
                                Profile
                            </Link>
                            
                            <div className="flex items-center gap-3 pl-4 border-l">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                            {user?.name ? getInitials(user.name) : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium hidden sm:inline">
                                        {user?.name}
                                    </span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="w-9 h-9"
                            >
                                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                            <Button className="text-sm font-medium"
                                variant="ghost" 
                                size="sm"
                                asChild
                            >
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button className="text-sm font-medium"
                                size="sm"
                                asChild
                            >
                                <Link to="/register">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;