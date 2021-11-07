import { FirestoreComment } from "../types/FirestoreComment";
import firebase from "firebase";
import { FirestorePost } from "../types/FirestorePost";
import { generateSlug } from "random-word-slugs";
import { dbService } from "./firebaseFunctions";



export const generateSampleComment = (postId: string, parentBoardId="general", parentBoardTitle="자유게시판", parentColor="#C4F2EF", parentTextColor="#3B8A85") => {
    const content = generateSlug(5);
    const author = generateSlug(1);

    const SampleComment: FirestoreComment = {
        content: content,
        lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
        upvoteArray: [],
        author: author,
        postId: postId,
        parentBoardId: parentBoardId,
        parentBoardTitle: parentBoardTitle,
        parentColor: parentColor,
        parentTextColor: parentTextColor
    }
    dbService.collection("boards").doc(parentBoardId).collection("posts").doc(postId).collection('comments').add(SampleComment)
    return SampleComment;
}

export {

}