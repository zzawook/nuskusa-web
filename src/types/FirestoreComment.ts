export interface FirestoreComment {
    author: string,
    userId: string,
    content: string,
    isReply: boolean,
    lastModified: Date,
    likes: [],
    replies: [],
}