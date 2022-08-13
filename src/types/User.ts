export interface User {
    name: string,
    email: string,
    verified: boolean,
    role: string, // User, Registered, Offered, Current, Graduated, Admin
    enrolledYear?: string | undefined,
    major?: string | undefined,
    faculty?: string | undefined,
    profileImageUrl?: string | undefined,
    gender?: string | undefined,
    yearOfBirth: string,
    kakaoTalkId?: string | undefined,
}