export interface User {
    username: string,
    userId: string,
    email: string,
    verificationFile?: File | undefined,
    isVerified: boolean,
    role: string, // User, Registered, Offered, Current, Graduated, Admin
    enrolledYear?: string | undefined,
    major?: string | undefined,
    faculty?: string | undefined,
    profilePictureURL?: string | undefined,
    gender?: string | undefined,
    yob: string,
    KTId?: string | undefined,
}