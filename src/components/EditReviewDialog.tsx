import { useEffect, useState } from 'react';
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Course } from '../services/courseService';
import { Button } from "@/components/ui/button";
import { Star} from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { reviewService } from '@/services/reviewService';
import { Textarea } from '@/components/ui/textarea';
import { FormDescription } from '@/components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import type { Review } from '@/types/review';

interface AxiosErrorLike {
    response?: {
        data?: {
            message?: string;
        } | string; // data might be a JSON object or just a string
    };
    message?: string;
}

// Type guard function to narrow down the 'unknown' error type
function isAxiosError(error: any): error is AxiosErrorLike {
    return error && typeof error === 'object' && 'response' in error;
}

const reviewFormSchema = z.object({
    content: z.string().min(10, { message: "Review must be at least 10 characters long." }).max(500),
    rating: z.number().min(1, { message: "Rating must be between 1 and 5." }).max(5),
    difficulty: z.number().min(1, { message: "Difficulty must be between 1 and 5." }).max(5),
    workload: z.number().min(1, { message: "Difficulty must be between 1 and 5." }).max(5),
    anonymous: z.boolean().optional()
});

interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className="flex space-x-1">
            {stars.map((starValue) => (
                <Star
                    key={starValue}
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                        starValue <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => onChange(starValue)}
                />
            ))}
        </div>
    );
};

interface EditReviewDialogProps {
    course: Course;
    initialReviewData: Review;
    open: boolean;
    onOpenChange: (open: boolean) => void; 
    onReviewUpdated: () => void;
}

function EditReviewDialog({ course, initialReviewData, open, onOpenChange, onReviewUpdated }: EditReviewDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            content: initialReviewData.content,
            rating: initialReviewData.rating,
            difficulty: initialReviewData.difficulty,
            workload: initialReviewData.workload,
            anonymous: initialReviewData.anonymous,
        },
    });

    useEffect(() => {
        form.reset({
            rating: initialReviewData.rating,
            difficulty: initialReviewData.difficulty,
            workload: initialReviewData.workload,
            content: initialReviewData.content,
            anonymous: initialReviewData.anonymous,
        });
    }, [initialReviewData, form.reset]);


    const onSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const updatedReviewData = {
                rating: values.rating,
                difficulty: values.difficulty,
                workload: values.workload,
                content: values.content,
                anonymous: values.anonymous,
            };

            await reviewService.updateReview(
                course.id, 
                initialReviewData.id, // Pass the existing review's ID
                updatedReviewData     // Pass the full updated data object
            );

            onReviewUpdated();
        } catch (err: any) {
            console.error('Failed to update review:', err);
            const errorMessage = err.response?.data?.message || "Failed to update review. Please try again.";
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] text-foreground border-gray-400">
                <DialogHeader>
                    <DialogTitle className="text-foreground">Edit Review for {course.department.departmentCode} {course.courseNumber}</DialogTitle>
                    <DialogDescription>
                        Make changes to your review below. You have 48 hours from posting to edit.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Rating Field */}
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Rating (1-5)</FormLabel>
                                    <FormControl>
                                        {/* The StarRating component handles setting the value via onChange */}
                                        <div className="mt-0.5">
                                            <StarRating 
                                                value={field.value} 
                                                onChange={field.onChange} 
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Difficulty (1-5)</FormLabel>
                                    <FormControl>
                                        {/* The StarRating component handles setting the value via onChange */}
                                        <div className="mt-0.5">
                                            <StarRating 
                                                value={field.value} 
                                                onChange={field.onChange} 
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workload"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Workload (1-5)</FormLabel>
                                    <FormControl>
                                        {/* The StarRating component handles setting the value via onChange */}
                                        <div className="mt-0.5">
                                            <StarRating 
                                                value={field.value} 
                                                onChange={field.onChange} 
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Comment Field */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-foreground">Review Content</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            className='mt-1'
                                            placeholder="Share your experience with the course (e.g., difficulty, workload, enjoyment)..." 
                                            {...field} 
                                            rows={5}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Anonymous Checkbox */}
                        <FormField
                            control={form.control}
                            name="anonymous"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-foreground">Anonymous Review</FormLabel>
                                        <FormDescription className='mt-2'>
                                            Your name will not be displayed with the review
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        
                        {/* Submission Status Alerts */}
                        {submitError && (
                            <div className="text-red-500 text-sm">
                                {submitError}
                            </div>
                        )}
                        
                        {/* Dialog Footer with Submit/Cancel Buttons */}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" disabled={isSubmitting} className="text-foreground">
                                    Cancel
                                </Button>
                            </DialogClose>
                            {/* Submit button tied to the form */}
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditReviewDialog;