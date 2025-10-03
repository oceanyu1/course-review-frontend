import { useState, useEffect } from "react";
import { courseService } from "../services/courseService";
import type { Course } from "../services/courseService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Star } from 'lucide-react'; // Example for a star icon
import { useNavigate } from "react-router-dom";

interface CourseListProps {
    departmentCode: string;
    sortBy: string; // Add the new sortBy prop
    query?: string; // Optional search query
}

function CourseList({ departmentCode, sortBy, query }: CourseListProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            try {
                if (query && query.trim() !== "") {
                    const response = await courseService.searchCourses(query, sortBy, departmentCode);
                    setCourses(response.data);
                    setError(null);
                    setLoading(false);
                } else {
                    const response = await courseService.getCoursesByDepartment(departmentCode, sortBy);
                    setCourses(response.data);
                    setError(null);
                }
            } catch (err) {
                setError('Failed to load courses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, [departmentCode, sortBy, query])

    const handleCourseClick = (courseId: string) => {
        navigate(`/course/${courseId}`);
    };

    if (error) return <div className="text-destructive p-4 border border-destructive/50 rounded-lg">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
                Courses in {departmentCode} 
                {query && ` (Search results for: "${query}")`}
            </h2>
            
            {loading ? (
                // Use Shadcn spinner or placeholder for a better loading state
                <div className="text-center py-10 text-muted-foreground">Loading courses...</div>
            ) : courses.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No courses found matching your criteria.</div>
            ) : (
                // ✅ COURSE GRID STYLING
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        // Use the Card component for a clean, professional look
                        <Card key={course.id} 
                            className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/80" 
                            onClick={() => handleCourseClick(course.id)}>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    {/* Course Code and Number */}
                                    <span className="text-xl font-bold">
                                        {course.department.departmentCode} {course.courseNumber}
                                    </span>
                                    
                                    {/* ✅ AVERAGE RATING DISPLAY */}
                                    <div className="flex items-center text-lg font-semibold">
                                        {/* Use Math.round for display, adjust precision as needed */}
                                        {(course.averageRating || 0).toFixed(1)} 
                                        <Star className="w-5 h-5 ml-1 fill-amber-500 stroke-none" />
                                    </div>
                                </CardTitle>
                                
                                {/* Course Name */}
                                <CardDescription className="text-lg">
                                    {course.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Course Description or a summary of it */}
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {course.description}
                                </p>
                                <p className="mt-3 text-xs text-muted-foreground">Click for details/reviews...</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseList;