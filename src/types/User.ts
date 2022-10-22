export interface User {
    name: string,
    email: string,
    role: string, // User, Registered, Freshmen, Current, Graduated, Admin
    enrolledYear?: string | undefined,
    major?: string | undefined,
    faculty?: string | undefined,
    profileImageUrl?: string | undefined,
    gender?: string | undefined,
    yearOfBirth: string,
    kakaoTalkId?: string | undefined,
}