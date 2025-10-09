import api from "./api";

interface Department {
    id: string;
    departmentCode: string;
    name: string;
}

interface PagedResponse<T> {
    content: T[];           // The actual data array
    totalElements: number;  // Total number of items across all pages
    totalPages: number;     // Total number of pages
    size: number;          // Page size (items per page)
    number: number;        // Current page number (0-based)
    numberOfElements: number; // Number of elements in current page
    first: boolean;        // Is this the first page?
    last: boolean;         // Is this the last page?
    empty: boolean;        // Is the page empty?
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
    // Search courses with query, optional sorting, and department filter
    searchCourses: (query: string | undefined, 
                    sortBy: string = 'courseNumber_asc', 
                    departmentCode: string | undefined,
                    page: number = 0,
                    size: number = 60) => {
        const params: any = { page, size, sortBy };
        
        // Only add query param if it has a value
        if (query && query.trim() !== '') {
            params.query = query;
        }
        
        // Only add departmentCode param if it has a value (and isn't "empty")
        if (departmentCode && departmentCode !== 'empty') {
            params.departmentCode = departmentCode;
        }

        return api.get<PagedResponse<Course>>(`/courses/search`, { params });
    },

    // Get a single course by UUID
    getCourse: (courseId: string) => {
        return api.get<Course>(`/courses/${courseId}`);
    },
};

export type { Course, Department, PagedResponse };