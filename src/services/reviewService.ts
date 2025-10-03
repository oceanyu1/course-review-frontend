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
        return api.post<Review>(`/courses/${courseId}/reviews`, reviewData);
    },

    deleteReview: (courseId: string, reviewId: string) => {
        return api.delete(`/courses/${courseId}/reviews/${reviewId}`);
    },

    updateReview: (courseId: string, reviewId: string, reviewData: { content?: string; rating?: number; difficulty?: number; workload?: number; anonymous?: boolean }) => {
        return api.put<Review>(`/courses/${courseId}/reviews/${reviewId}`, reviewData);
    },

    partialUpdateReview: (courseId: string, reviewId: string, reviewData: Partial<{ content: string; rating: number; difficulty: number; workload: number; anonymous: boolean }>) => {
        return api.patch<Review>(`/courses/${courseId}/reviews/${reviewId}`, reviewData);
    },

    hasUserReviewed: (courseId: string) => {
        return api.get<Boolean>(`/courses/${courseId}/reviews/has-reviewed`);
    }
};

export type { Course, Department };