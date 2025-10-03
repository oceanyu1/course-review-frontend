import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { courseService } from "../services/courseService";
import type { Course } from '../services/courseService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import ReviewList from '../components/ReviewList';
import CreateReviewDialog from '../components/CreateReviewDialog';
import { useAuth } from '../contexts/AuthContext';
import { reviewService } from '@/services/reviewService';

function CoursePage() {
    const { user } = useAuth();
    const { courseId } = useParams<{ courseId : string}>(); // Gets the ID from URL
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null as Course | null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reviewRefreshKey, setReviewRefreshKey] = useState(0);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [checkingReview, setCheckingReview] = useState(false);

    const checkUserReviewStatus = useCallback(async () => {
        // Only check if user is logged in AND we have a courseId
        if (!courseId || !user) {
            setHasReviewed(false);
            return;
        }

        setCheckingReview(true);
        try {
            // Call the service function using the existing courseId
            const response = await reviewService.hasUserReviewed(courseId);
            setHasReviewed(!!response.data);
        } catch (err) {
            console.error('Error checking review status:', err);
            // Default to false on error, allowing the user to try writing a review (where backend will block it)
            setHasReviewed(false); 
        } finally {
            setCheckingReview(false);
        }
    }, [courseId, user]);

    const fetchCourseData = useCallback(async () => {
        if (!courseId) return;
        
        setLoading(true);
        try {
            const courseResponse = await courseService.getCourse(courseId);
            setCourse(courseResponse.data);
            setError(null);
        } catch (err) {
            setError('Failed to load course data');
            console.error('Error fetching course:', err);
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    const handleReviewAction = () => {
        // 1. Re-fetch the Course data to update the average rating display
        fetchCourseData();
        // 2. Increment the key to force the ReviewList component to remount 
        //    (which makes it re-fetch the list of reviews)
        setReviewRefreshKey(prev => prev + 1);
        checkUserReviewStatus(); 
    };

    useEffect(() => {
        fetchCourseData();
    }, [courseId]);

    useEffect(() => {
        checkUserReviewStatus();
    }, [checkUserReviewStatus]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Loading course...</p>
                </div>
            </div>
        );
    }
    
    if (error || !course) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-3xl">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {error || 'Course not found'}
                        </p>
                        <Button onClick={() => navigate(-1)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const reviewButtonContent = () => {
        if (!user) {
            return (
                <div className="font-medium">
                    <a href="/login" className="text-primary hover:underline">
                        Log in
                    </a>
                    {' '}to write a review
                </div>
            );
        }

        if (checkingReview) {
            return <Button disabled>Checking review status...</Button>;
        }

        if (hasReviewed) {
            return (
                <div className="font-medium">
                    You have already reviewed this course. 
                    {/* TODO: Add logic/button here to allow the user to edit their existing review */}
                </div>
            );
        }

        return (
            <CreateReviewDialog 
                course={course as Course} 
                onReviewCreated={handleReviewAction}
            />
        );
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Back Button */}
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Courses
                </Button>

                {/* Course Header */}
                <Card className='border-gray-200'>
                    <CardHeader>
                        <div className="flex mb-5">
                            <span className="text-7xl font-bold">{(course.averageRating || 0).toFixed(1)}/<span className="text-3xl">5.0</span></span>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl font-bold mb-2">
                                    {course.department.departmentCode} {course.courseNumber}
                                </CardTitle>
                                <CardDescription className="text-xl">
                                    {course.name}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-7">
                            {course.description}
                        </p>
                        {reviewButtonContent()}
                    </CardContent>
                </Card>
                
                {/* Reviews Section */}
                <ReviewList course={course} key={reviewRefreshKey} onReviewChanged={handleReviewAction}/>
            </div>
        </div>
    );
}


export default CoursePage;