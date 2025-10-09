import { useState, useEffect } from "react";
import { courseService } from "../services/courseService";
import type { Course } from "../services/courseService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface CourseListProps {
    departmentCode: string;
    sortBy: string;
    query?: string;
}

function CourseList({ departmentCode, sortBy, query }: CourseListProps) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize] = useState(60); // Courses per page
    
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            try {
                const deptCode = departmentCode === "empty" ? undefined : departmentCode;
                const searchQuery = query && query.trim() !== '' ? query : undefined;
                
                const response = await courseService.searchCourses(
                    searchQuery, 
                    sortBy, 
                    deptCode, 
                    currentPage, 
                    pageSize
                );
                
                setCourses(response.data.content || []);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setError(null);
            } catch (err) {
                setError('Failed to load courses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, [departmentCode, sortBy, query, currentPage, pageSize]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(0);
    }, [departmentCode, sortBy, query]);

    const handleCourseClick = (courseId: string) => {
        navigate(`/course/${courseId}`);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 990, behavior: 'smooth' }); // Scroll to top
    };

    if (error) return <div className="text-destructive p-4 border border-destructive/50 rounded-lg">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                    {departmentCode === "empty" ? "All Courses" : `Courses in ${departmentCode}`}
                    {query && ` (Search results for: "${query}")`}
                </h2>
                
                {/* Results count */}
                {!loading && (
                    <p className="text-sm text-muted-foreground">
                        {totalElements} course{totalElements !== 1 ? 's' : ''} found
                    </p>
                )}
            </div>
            
            {loading ? (
                <div className="text-center py-10 text-muted-foreground">Loading courses...</div>
            ) : courses.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No courses found matching your criteria.</div>
            ) : (
                <>
                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <Card key={course.id} 
                                className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/80 cursor-pointer" 
                                onClick={() => handleCourseClick(course.id)}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                        <span className="text-xl font-bold">
                                            {course.department.departmentCode} {course.courseNumber}
                                        </span>
                                        
                                        <div className="flex items-center text-lg font-semibold">
                                            {course.averageRating && course.averageRating > 0 ? (
                                                <>
                                                    {course.averageRating.toFixed(1)} 
                                                    <Star className="w-5 h-5 ml-1 fill-amber-500 stroke-none" />
                                                </>
                                            ) : (
                                                <Star className="w-5 h-5 ml-1 fill-gray-400 stroke-gray-400" />
                                            )}
                                        </div>
                                    </CardTitle>
                                    
                                    <CardDescription className="text-lg">
                                        {course.name}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {course.description}
                                    </p>
                                    <p className="mt-3 text-xs text-muted-foreground">Click for details/reviews...</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>

                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i;
                                    } else if (currentPage <= 2) {
                                        pageNum = i;
                                    } else if (currentPage >= totalPages - 3) {
                                        pageNum = totalPages - 5 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum + 1}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    {/* Page info */}
                    <div className="text-center text-sm text-muted-foreground">
                        Page {currentPage + 1} of {totalPages}
                    </div>
                </>
            )}
        </div>
    );
}

export default CourseList;