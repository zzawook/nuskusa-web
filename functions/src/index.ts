import * as functions from "firebase-functions";
import {FirestorePost} from "../../src/types/FirestorePost";
import {FirestoreBoard} from "../../src/types/FirestoreBoard";
import {FirestoreComment} from "../../src/types/FirestoreComment";
import {FirestoreNotification} from "../../src/types/FirestoreNotification";

import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

exports.createNotificationOnPostLike = functions.firestore
    .document("/boards/{boardId}/posts/{postId}")
    .onUpdate(async (change, context) => {
      const previous = change.before.data() as FirestorePost;
      const after = change.after.data() as FirestorePost;
      const boardId = context.params.boardId;
      const postId = context.params.postId;
      if (previous.upvoteArray.length !== after.upvoteArray.length) {
        const component: FirestoreNotification = {
          type: "new/like",
          isRead: false,
          source: db
              .collection("boards").doc(boardId)
              .collection("posts").doc(postId),
          message: "Someone likedyour post!",
          link: `/boards/${boardId}/posts/${postId}`,
          data: after,
        };
        db.doc(`/users/${after.authorId}`).update({
          notificationArray: admin.firestore.FieldValue.arrayUnion(component),
        });
      }
    });

exports.createNotificationForBoard = functions.firestore
    .document("/boards/{boardId}")
    .onCreate(async (change, context) => {
      const data = change.data() as FirestoreBoard;
      const boardId = context.params.boardId;
      const title = data.title;
      const description = data.description;
      const component: FirestoreNotification = {
        type: "new/board",
        isRead: false,
        source: db
            .collection("boards").doc(boardId),
        message: `A new board has been created! ${title}, ${description}`,
        link: `/boards/${boardId}`,
        data: data,
      };
      db.collection("users").get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              doc.ref.update({
                notificationArray: admin.firestore.FieldValue.arrayUnion(component),
              });
            });
          });
    });

exports.createNotificationOnPostComment = functions.firestore
    .document("/boards/{boardId}/posts/{postId}/comments/{commentId}")
    .onCreate(async (change, context) => {
      const data = change.data() as FirestoreComment;
      const boardId = context.params.boardId;
      const postId = context.params.postId;
      const commentId = context.params.commentId;
      if (!data.isReply) {
        const component: FirestoreNotification = {
          type: "new/comment",
          isRead: false,
          source: db
              .collection("boards").doc(boardId)
              .collection("posts").doc(postId)
              .collection("comments").doc(commentId),
          message: "Someone posted a comment on your post!",
          link: `/boards/${boardId}/posts/${postId}/comments/${commentId}`,
          data: data,
        };
        const postData = (await db.collection("boards").doc(boardId).collection("posts").doc(postId).get()).data() as FirestorePost;
        db.doc(`/users/${postData.authorId}`).update({
          notificationArray: admin.firestore.FieldValue.arrayUnion(component),
        });
      }
    });


// exports.createNotificationOnCommentReply = functions.firestore
//   .document("/boards/{boardId}/posts/{postId}/comments/{commentId}")
//   .onCreate(async (change, context) => {
//     const data = change.data() as FirestoreComment;
//     const boardId = context.params.boardId;
//     const postId = context.params.postId;
//     const commentId = context.params.commentId;
//     if (data.isReply) {
//       const component: FirestoreNotification = {
//         type: "update/comment",
//         isRead: false,
//         source: db
//           .collection("boards").doc(boardId)
//           .collection("posts").doc(postId)
//           .collection("comments").doc(commentId),
//         message: "Someone replied to your comment!",
//         link: `/boards/${boardId}/posts/${postId}/comments/${commentId}`,
//         data: data,
//       };
//       db.doc(`/users/${data.postId}`).update({
//         notificationArray: admin.firestore.FieldValue.arrayUnion(component),
//       });
//     }
//   });
