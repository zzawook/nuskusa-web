export interface PostSummary {
    postId: string,
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    isEvent?: boolean | undefined,
    lastModified: Date,
    author: string,
}