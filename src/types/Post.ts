import firebase from 'firebase'
import { Board } from './Board'
import { User } from './User'

export interface Post {
    postId: string,
    title: string,
    content: string,
    isAnnouncement: boolean,
    isAnonymous: boolean,
    isPinned: boolean,
    isHidden: boolean,
    isEvent?: boolean | undefined,
    lastModified: Date,
    upvoteCount: number,
    upvoted: boolean,
    commentCount: number,
    author: User,
    board: Board,
    hasRoot: boolean,
}