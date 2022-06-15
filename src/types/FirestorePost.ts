import firebase from 'firebase'
import { getSystemErrorMap } from 'util'

export interface FirestorePost {
    postId: string,
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    lastModified: firebase.firestore.Timestamp,
    upvoteArray: firebase.firestore.DocumentReference[],
    numComments: number,
    permissions: string[],
    author: string,
    authorId: string,

    parentBoardId: string,
    parentBoardTitle: string,
    parentColor: string,
    parentTextColor: string
}