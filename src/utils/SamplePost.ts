import firebase from "firebase";
import { FirestorePost } from "../types/FirestorePost";
import { generateSlug } from "random-word-slugs";
import { dbService } from "./firebaseFunctions";



export const generateSamplePost = (postId: string, isPinned=false, parentBoardId="general", parentBoardTitle="자유게시판", parentColor="#C4F2EF", parentTextColor="#3B8A85") => {
    const title = generateSlug(2);
    const content = generateSlug(5);

    const SamplePost: FirestorePost = {
        postId: postId,
        title: title,
        content: content,
        isAnnouncement: false,
        isAnonymous: false,
        isPinned: isPinned,
        isHidden: true,
        lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
        upvoteArray: [],
        numComments: 0,
        permissions: ["Admin"],
        author: "Roh Yong Gi",
        authorId: 'X0xnw1p7iahO75DUpnWcYCmAdzY2',
        parentBoardId: parentBoardId,
        parentBoardTitle: parentBoardTitle,
        parentColor: parentColor,
        parentTextColor: parentTextColor
    }
    dbService.collection("boards").doc(parentBoardId).collection("posts").doc(postId).set(SamplePost)
    return SamplePost;
}
