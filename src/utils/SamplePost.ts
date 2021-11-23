import firebase from "firebase";
import { FirestorePost } from "../types/FirestorePost";
import { generateSlug } from "random-word-slugs";
import { dbService } from "./firebaseFunctions";



export const generateSamplePost = (isPinned=false, parentBoardId="general", parentBoardTitle="자유게시판", parentColor="#C4F2EF", parentTextColor="#3B8A85") => {
    const title = generateSlug(2);
    const content = generateSlug(5);
    const author = generateSlug(1);

    const SamplePost: FirestorePost = {
        title: title,
        content: content,
        isAnnouncement: false,
        isAnonymous: false,
        isPinned: isPinned,
        isHidden: false,
        lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
        upvoteArray: [],
        numComments: 0,
        permissions: ["Admin"],
        author: author,
        authorId: 'id',
        parentBoardId: parentBoardId,
        parentBoardTitle: parentBoardTitle,
        parentColor: parentColor,
        parentTextColor: parentTextColor
    }
    dbService.collection("boards").doc(parentBoardId).collection("posts").add(SamplePost)
    return SamplePost;
}
