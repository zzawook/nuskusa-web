import firebase from 'firebase'

export interface Comment {
    content: string,
    lastModified: firebase.firestore.Timestamp,
    upvoteCount: number,
    upvoted: boolean,
    replyTo: firebase.firestore.DocumentReference | undefined,
    author: number,
    postId: number,
}