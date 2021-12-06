import { FirebaseUser } from "../types/FirebaseUser";

export const SampleUser: FirebaseUser = {
    username: "",
    userId: '',
    verificationFile: undefined,
    isVerified: false,
    role: "User", // User, Undergraduate, Graduate, Admin
    enrolledYear: undefined,
    major: undefined,
    faculty: undefined
}