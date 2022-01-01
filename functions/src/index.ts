import * as functions from "firebase-functions";
import { FirestorePost } from "../../src/types/FirestorePost";
import { FirestoreBoard } from "../../src/types/FirestoreBoard";
import { FirestoreComment } from "../../src/types/FirestoreComment";
import { FirestoreNotification } from "../../src/types/FirestoreNotification"
import { dbService } from "../../src/utils/firebaseFunctions"

import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

exports.createNotificationForPost = functions.firestore
  .document("/boards/{boardId}/posts/{postId}")
  .onUpdate((change, context) => {
    const previous = change.before.data() as FirestorePost;
    const after = change.after.data() as FirestorePost;
    const boardId = context.params.boardId;
    const postId = context.params.postId;
    if (previous.upvoteArray.length !== after.upvoteArray.length) {

      const postReference = dbService
        .collection("boards").doc(boardId)
        .collection("posts").doc(postId);
      const component: FirestoreNotification = {
        isRead: false,
        source: postReference,
        message: "Someone liked your post!",
        link: `/boards/${boardId}/posts/${postId}`,
        data: {
          title: "",
          description: "",
        }
      };
      db.doc(`/users/${after.authorId}`).update({
        notificationArray: admin.firestore.FieldValue.arrayUnion(component),
      });
    }
  });

exports.createNotificationForBoard = functions.firestore
  .document("/boards/{boardId}")
  .onCreate((change, context) => {
    const after = change.data() as FirestoreBoard;
    const boardId = context.params.boardId;
    const title = after.title;
    const description = after.description;

    const boardReference = dbService
      .collection("boards").doc(boardId);

    const component: FirestoreNotification = {
      isRead: false,
      source: boardReference,
      message: `새 게시판이 생겼어요! ${title}, ${description}`,
      link: `/boards/${boardId}`,
      data: {
        title: "",
        description: "",
      }
    }
    db.collection("users").get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.ref.update({
            notificationArray: admin.firestore.FieldValue.arrayUnion(component),
          });
        });
      });
  });


exports.createNotificationOnCommentReply = functions.firestore
  .document("/boards/{boardId}/posts/{postId}/comments/{commentId}")
  .onCreate((change, context) => {
    const data = change.data() as FirestoreComment;
    const boardId = context.params.boardId;
    const postId = context.params.postId;
    const commentId = context.params.commentId;

    const commentReference = dbService
      .collection("boards").doc(boardId)
      .collection("posts").doc(postId)
      .collection("comments").doc(commentId);

    const component: FirestoreNotification = {
      isRead: false,
      source: commentReference,
      message: "Someone replied to your comment!",
      link: `/boards/${boardId}/posts/${postId}/comments/${commentId}`,
      data: {
        title: "",
        description: "",
      }
    }
    db.doc(`/users/${data.authorId}`).update({
      notificationArray: admin.firestore.FieldValue.arrayUnion(component),
    });
  });