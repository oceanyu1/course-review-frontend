import api from "./api";
import type { Review } from "@/types/review";

interface Department {
    id: string;
    departmentCode: string;
    name: string;
}

interface Course {
    id: string;
    department: Department;
    courseNumber: number;
    name: string;
    averageRating: number;
    description: string;
}

export const reviewService = {
    createReview: (courseId: string, reviewData: { content: string; rating: number; difficulty: number; workload: number; anonymous?: boolean }) => {
        return api.post<Review>(`/reviews/${courseId}`, reviewData);
    },

    getReviews: (courseId: string, sortBy: string = 'rating_asc') => {
        return api.get<Review[]>(`/reviews/${courseId}`, {
            params: { sortBy }
        });
    },

    getReviewsByUser: () => {
        return api.get<Review[]>(`/reviews/me`);
    },

    deleteReview: (courseId: string, reviewId: string) => {
        return api.delete(`/reviews/${courseId}/${reviewId}`);
    },

    updateReview: (courseId: string, reviewId: string, reviewData: { content?: string; rating?: number; difficulty?: number; workload?: number; anonymous?: boolean }) => {
        return api.put<Review>(`/reviews/${courseId}/${reviewId}`, reviewData);
    },

    partialUpdateReview: (courseId: string, reviewId: string, reviewData: Partial<{ content: string; rating: number; difficulty: number; workload: number; anonymous: boolean }>) => {
        return api.patch<Review>(`/reviews/${courseId}/${reviewId}`, reviewData);
    },

    hasUserReviewed: (courseId: string) => {
        return api.get<Boolean>(`/reviews/${courseId}/has-reviewed`);
    }
};

export type { Course, Department };