import { FirestoreComment } from "../types/FirestoreComment";
import firebase from "firebase";
import { FirestorePost } from "../types/FirestorePost";
import { generateSlug } from "random-word-slugs";
import { dbService } from "./firebaseFunctions";



export const generateSampleComment = (postId: string, boardId="general") => {
    const content = generateSlug(5);
    const author = generateSlug(1);
    const authorId = 'id'
    const SampleComment: FirestoreComment = {
        content: content,
        lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
        upvoteArray: [],
        author: author,
        authorId: authorId,
        postId: postId,
        replies: [],
        replyTo: undefined,
        boardId: boardId,
        isReply: false,
    }
    dbService.collection("boards").doc(boardId).collection("posts").doc(postId).collection('comments').add(SampleComment)
    return SampleComment;
}

export {

}