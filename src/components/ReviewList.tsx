import { formatDate, wasEdited } from "../utils/dateUtils";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trash2, Pencil } from 'lucide-react';
import type { Course } from '../services/courseService';
import { courseService } from "../services/courseService";
import type { Review } from "../types/review";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { reviewService } from "@/services/reviewService";
import EditReviewDialog from "./EditReviewDialog";

const EDIT_WINDOW_MS = 24 * 60 * 60 * 1000 * 2;

interface ReviewListProps {
    course: Course;
    onReviewChanged: () => void;
}

function ReviewList({ course, onReviewChanged } : ReviewListProps) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSortOption, setSelectedSortOption] = useState("rating_asc");

    // State for delete review
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [reviewToDeleteId, setReviewToDeleteId] = useState<string | null>(null);

    // State for edit review
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null); 

    const handleSortChange = (value: string) => {
        setSelectedSortOption(value);
    }

    const handleDeleteReview = (reviewId: string) => {
        setReviewToDeleteId(reviewId);
        setIsDeleteDialogOpen(true);
    };

    const handleEditReview = (review: Review) => {
        // Placeholder for now: Set the review to be edited.
        // In the next step, we will open an EditReviewDialog here.
        // TODO: Open the editing dialog here
        setReviewToEdit(review);
        setIsEditDialogOpen(true);
    };
    
    // 2. Function to perform the actual deletion after confirmation
    const confirmDelete = async () => {
        if (!reviewToDeleteId) return;
        console.log(`Deleting review: ${reviewToDeleteId}`);
        await reviewService.deleteReview(course.id, reviewToDeleteId);
        
        // Optimistically update the UI (or refresh data)
        setReviews(reviews.filter(r => r.id !== reviewToDeleteId));

        onReviewChanged();

        // Close dialog and reset ID
        setIsDeleteDialogOpen(false);
        setReviewToDeleteId(null);
    };

    useEffect(() => {
        const loadReviews = async () => {
            setLoading(true);
            try {
                const response = await reviewService.getReviews(course.id, selectedSortOption);
                setReviews(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load courses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadReviews();
    }, [course, selectedSortOption])

    if (loading) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                Loading reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-destructive p-4 border border-destructive/50 rounded-lg">
                Error: {error}
            </div>
        );
    }

    return ( 
        <div>
            {reviews.length === 1 ? (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{reviews.length} Review</h2>
                </div>
            ) : (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{reviews.length} Reviews</h2>
                </div>
            )}
            
            <div className="w-full md:w-64 mb-6">
                <Select onValueChange={handleSortChange} value={selectedSortOption}>
                    <SelectTrigger id="sort" className="w-full">
                        <SelectValue placeholder="Sort Options" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating_asc">Average Rating (Asc)</SelectItem>
                        <SelectItem value="rating_desc">Average Rating (Desc)</SelectItem>
                        <SelectItem value="difficulty_asc">Difficulty (Asc)</SelectItem>
                        <SelectItem value="difficulty_desc">Difficulty (Desc)</SelectItem>
                        <SelectItem value="workload_asc">Workload (Asc)</SelectItem>
                        <SelectItem value="workload_desc">Workload (Desc)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {reviews.length === 0 ? (
                <Card className="border-gray-200">
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                            No reviews yet. Be the first to review this course!
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {reviews.map(review => {
                        const isUserAuthor = review.writtenBy.id === user?.id;
                        
                        // Check if the current time is within the edit window
                        const reviewTimestamp = new Date(review.datePosted).getTime();
                        const timeSincePosted = Date.now() - reviewTimestamp;
                        const canEdit = timeSincePosted >= 0 && timeSincePosted < EDIT_WINDOW_MS;
                        return (
                            <Card key={review.id} className="border-gray-200">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">
                                                {review.anonymous ? 'Anonymous' : review.writtenBy.name}
                                            </CardTitle>
                                            {!review.anonymous && (
                                                <CardDescription>
                                                    {review.writtenBy.program} • Year {review.writtenBy.year}
                                                </CardDescription>
                                            )}
                                        </div>
                                        <div className="flex items-center font-semibold">
                                            {isUserAuthor && (
                                                <div className="flex items-center mr-3">
                                                    {/* Edit Button - only visible if author and within the time window */}
                                                    {canEdit && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="p-1 h-8 w-8 mr-1" 
                                                            onClick={() => handleEditReview(review)}
                                                            title="Edit Review"
                                                        >
                                                            <Pencil className="w-4 h-4 cursor-pointer hover:opacity-70" />
                                                        </Button>
                                                    )}
                                                    {/* Delete Button */}
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="p-1 h-8 w-8 mr-2" 
                                                        onClick={() => handleDeleteReview(review.id)}
                                                        title="Delete Review"
                                                    >
                                                        <Trash2 className="w-4 h-4 cursor-pointer hover:opacity-70" />
                                                    </Button>
                                                </div>
                                            )}
                                            {review.rating.toFixed(1)}
                                            <Star className="w-5 h-5 ml-1 fill-amber-500 stroke-none" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-3">
                                        {review.content}
                                    </p>
                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                        <span>Difficulty: {review.difficulty}/5</span>
                                        <span>Workload: {review.workload}/5</span>
                                        <span>
                                            {formatDate(review.datePosted)}
                                            {wasEdited(review.datePosted, review.lastEdited) && (
                                                <span className="text-xs ml-1">(edited)</span>
                                            )}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {reviewToEdit && (
                <EditReviewDialog
                    course={course}
                    initialReviewData={reviewToEdit} // Pass the data to pre-fill the form
                    open={isEditDialogOpen}
                    onOpenChange={(open) => { // Controls the dialog's open/close state
                        setIsEditDialogOpen(open);
                        if (!open) {
                            // Clear the review to edit when the dialog closes
                            setReviewToEdit(null); 
                        }
                    }}
                    onReviewUpdated={() => {
                        // This function should close the dialog and refresh the list
                        setIsEditDialogOpen(false);
                        setReviewToEdit(null);
                        onReviewChanged();
                    }}
                />
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
                            Are you sure you want to delete this review? This action cannot be undone.
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
                            onClick={confirmDelete}
                        >
                            Delete Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ReviewList;