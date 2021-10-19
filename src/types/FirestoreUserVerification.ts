export interface FirestoreUserVerification {
    owner: string,
    ownerUID: string,
    downloadURL: string,
    fullname: string,
    schoolEmail: string,
    major: string,
    faculty: string,
    enrolledYear: string,
    verificationFile: File | undefined,
}