import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Corrected path from "@/contexts/AuthContext"
import { reviewService } from "../services/reviewService"; // Corrected path from "@/services/reviewService"
import type { Review } from "@/types/review";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, FileText } from 'lucide-react';
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router-dom"; // Assuming you use react-router-dom for navigation

// Component to display an individual review card on the profile page
const ProfileReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
                {/* Link to the course page */}
                <Link to={`/course/${review.courseId}`} className="hover:text-primary transition-colors">
                    <CardTitle className="text-lg flex items-center">
                        {review.courseName} {review.courseNumber}
                    </CardTitle>
                </Link>
                <div className="flex items-center font-semibold text-lg">
                    {review.rating.toFixed(1)}
                    <Star className="w-5 h-5 ml-1 fill-amber-500 stroke-none" />
                </div>
            </div>
            <CardDescription className="pt-1">
                Posted on {formatDate(review.datePosted)}
                {review.lastEdited && (
                    <span className="text-xs ml-2 italic text-muted-foreground">(last edited: {formatDate(review.lastEdited)})</span>
                )}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-3 line-clamp-3">
                "{review.content}"
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span>Difficulty: {review.difficulty}/5</span>
                <span>Workload: {review.workload}/5</span>
            </div>
        </CardContent>
    </Card>
);


const UserProfile = () => {
    const { user, isLoading: authLoading } = useAuth();
    const [userReviews, setUserReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setLoadingReviews(false);
            return;
        }

        const loadUserReviews = async () => {
            setLoadingReviews(true);
            try {
                // Ensure the service method reviewService.getReviewsByUserId is available
                const response = await reviewService.getReviewsByUser();
                setUserReviews(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load your reviews.');
                console.error("Error loading user reviews:", err);
            } finally {
                setLoadingReviews(false);
            }
        };

        loadUserReviews();
    }, [user]);

    if (authLoading) {
        return <div className="text-center py-20">Loading authentication data...</div>;
    }

    if (!user) {
        return <div className="text-center py-20 text-red-500">You must be logged in to view this profile.</div>;
    }

    // Main Content
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
            {/* User Details Card */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                    <CardDescription>
                        User ID: <span className="font-mono text-xs bg-gray-100 p-1 rounded">{user.id}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold text-sm text-muted-foreground">Program:</p>
                        <p className="text-base">{user.program || "N/A"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-muted-foreground">Year:</p>
                        <p className="text-base">{user.year || "N/A"}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews Section */}
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Your Submitted Reviews ({userReviews.length})</h2>

            {loadingReviews ? (
                <div className="text-center py-10 text-muted-foreground">Loading your reviews...</div>
            ) : error ? (
                <div className="text-red-500 p-4 border border-red-500/50 rounded-lg">{error}</div>
            ) : userReviews.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">You have not submitted any reviews yet.</div>
            ) : (
                <div className="space-y-4">
                    {userReviews.map(review => (
                        <ProfileReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
