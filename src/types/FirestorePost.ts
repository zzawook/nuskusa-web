import firebase from 'firebase'

export interface FirestorePost {
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    lastModified: firebase.firestore.Timestamp,
    upvotes: number,
    numComments: number,
    permissions: string[],
    author: string,
    authorId: string,

    parentBoardId: string,
    parentBoardTitle: string,
    parentColor: string,
    parentTextColor: string
}