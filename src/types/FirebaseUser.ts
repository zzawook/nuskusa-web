export interface FirebaseUser {
    username: string,
    userId: string,
    email: string,
    verificationFile?: File | undefined,
    isVerified: boolean,
    role: string, // User, Undergraduate, Graduate, Admin
    enrolledYear?: string | undefined,
    major?: string | undefined,
    faculty?: string | undefined,
    profilePictureURL?: string | undefined
}