export interface FirestorePost {
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    lastModified: Date,
    upvotes: number,
    numComments: number,
    permissions: string[],
    author: string,

    parentBoardId: string,
    parentBoardTitle: string,
    parentColor: string,
    parentTextColor: string
}