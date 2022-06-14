import { FirebaseUser } from "../types/FirebaseUser";

export const SampleUser: FirebaseUser = {
    username: "",
    email: '',
    verificationFile: undefined,
    isVerified: false,
    role: "User", // User, Registered, Offered, Current, Graduated, Admin
    enrolledYear: "",
    major: "",
    faculty: "",
    profilePictureURL: "",
    userId: "userId",
}