import firebase from 'firebase'

export interface FirestoreComment {
    content: string,
    lastModified: firebase.firestore.Timestamp,
    upvoteArray: firebase.firestore.DocumentReference[],
    author: string,
    authorId: string,
    postId: string,
    parentBoardId: string,
    parentBoardTitle: string,
    parentColor: string,
    parentTextColor: string
}