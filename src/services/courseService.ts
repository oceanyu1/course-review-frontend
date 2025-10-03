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

export const courseService = {
    // Get courses by department with optional sorting
    getCoursesByDepartment: (departmentCode: string, sortBy: string = 'courseNumber_asc') => {
        return api.get<Course[]>(`/courses/department/${departmentCode}`, {
            params: { sortBy }
        });
    },

    // Search courses with query, optional sorting, and department filter
    searchCourses: (query: string, sortBy: string = 'courseNumber_asc', departmentCode: string) => {
        return api.get<Course[]>(`/courses/search`, {
            params: { query, departmentCode, sortBy }
        });
    },

    // Get a single course by UUID
    getCourse: (courseId: string) => {
        return api.get<Course>(`/courses/${courseId}`);
    },

    getCourseReviews: (courseId: string, sortBy: string = 'rating_asc') => {
        return api.get<Review[]>(`/courses/${courseId}/reviews`, {
            params: { sortBy }
        });
    }
};

export type { Course, Department };