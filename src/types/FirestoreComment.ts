import firebase from 'firebase'

export interface FirestoreComment {
    content: string,
    lastModified: firebase.firestore.Timestamp,
    upvoteArray: firebase.firestore.DocumentReference[],
    isReply: boolean,
    replyTo: firebase.firestore.DocumentReference,
    replies: [],
    author: string,
    authorId: string,
    postId: string,
    boardId: string,
    // boardTitle: string,
    // boardColor: string,
    // boardTextColor: string
}