import * as functions from "firebase-functions";
import firebase from "firebase";
import { FirestorePost } from "../../src/types/FirestorePost";
import { db } from "../src/index";

exports.createNotificationForBoard = functions.firestore
    .document('/boards/{boardId}')
    .onCreate((change, context) => {

    })

exports.createNotificationForPost = functions.firestore
    .document('/boards/{boardId}/posts/{postId}')
    .onUpdate((change, context) => {
        const previous = change.before.data() as FirestorePost;
        const after = change.after.data() as FirestorePost;
        const boardId = context.params.boardId;
        const postId = context.params.postId;

        if (previous.upvoteArray.length !== after.upvoteArray.length) {
            const postReference = db.collection("boards").doc(boardId).collection("posts").doc(postId);
            db.doc(`/users/${after.authorId}`).update({
                notificationArray: firebase.firestore.FieldValue.arrayUnion({
                    isRead: false,
                    source: postReference,
                    message: "Someone liked your post!",
                })
            })
        }
    })