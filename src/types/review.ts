export interface Review {
    id: string;
    content: string;
    rating: number;
    difficulty: number;
    workload: number;
    datePosted: string;
    lastEdited: string | null;
    writtenBy: {
        id: string;
        email: string | null;
        name: string;
        program: string;
        year: number;
        role: string | null;
        createdAt: string | null;
    };
    courseId: string;
    anonymous: boolean;
}