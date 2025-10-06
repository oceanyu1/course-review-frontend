import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Corrected path from "@/contexts/AuthContext"
import { reviewService } from "../services/reviewService"; // Corrected path from "@/services/reviewService"
import type { Review } from "@/types/review";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trash2 } from 'lucide-react';
import { formatDate } from "../utils/dateUtils";
import { Link, useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Component to display an individual review card on the profile page
const ProfileReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <Card className="shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
                {/* Link to the course page */}
                <Link to={`/course/${review.courseId}`} className="hover:text-primary transition-colors">
                    <CardTitle className="text-lg flex items-center">
                        {review.courseTitle}: {review.courseNumber}
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
    const { user, isLoading: authLoading, logout } = useAuth();
    const [userReviews, setUserReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

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
                console.log("Fetched reviews:", response.data);
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

    const handleDeleteAccount = () => {
        setIsDeleteDialogOpen(true);
    };

    const confirmDeleteAccount = async () => {
        setDeleting(true);
        try {
            await authService.deleteUser();
            logout();
            alert("Your account has been deleted.");
            navigate("/login"); // redirect to login page
        } catch (err) {
            console.error("Failed to delete account:", err);
            alert("Failed to delete your account. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

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
                </CardHeader>
                <CardContent className="flex-col">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold text-sm text-muted-foreground">Program:</p>
                            <p className="text-base">{user.program || "N/A"}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-muted-foreground">Year:</p>
                            <p className="text-base">{user.year || "N/A"}</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-sm transition-colors mt-5"
                    >
                        <Trash2 className="w-4 h-4" />
                        {deleting ? "Deleting..." : "Delete Account"}
                    </Button>
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
            {/* Confirmation Dialog (Rendered once at the top level) */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center text-foreground">
                            <Trash2 className="w-5 h-5 mr-2"/> 
                            <span>Confirm Deletion</span>
                        </DialogTitle>
                        <DialogDescription className="mt-2">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex justify-end gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            <span className="text-foreground">Cancel</span>
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={confirmDeleteAccount}
                        >
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserProfile;
