import * as functions from "firebase-functions";
import { FirestorePost } from "../../src/types/FirestorePost";
import { FirestoreBoard } from "../../src/types/FirestoreBoard";
import { FirestoreComment } from "../../src/types/FirestoreComment";
import { FirestoreNotification } from "../../src/types/FirestoreNotification";

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
    if (previous.upvoteArray.length < after.upvoteArray.length) {
      // The below finds the newly added element in after's upvoteArray.
      // This can cause some delay when the upvoteArray is big,
      // because it is an O(n^2) function.
      const userLiked = after.upvoteArray.filter((user) => !previous.upvoteArray.includes(user));
      if (userLiked[0].id == after.authorId) {
        const component: FirestoreNotification = {
          type: "new/like",
          isRead: false,
          source: db
            .collection("boards").doc(boardId)
            .collection("posts").doc(postId),
          message: "Someone liked your post!",
          link: `/boards/${boardId}/${postId}`,
          data: after,
        };
        db.doc(`/users/${after.authorId}`).update({
          notificationArray: admin.firestore.FieldValue.arrayUnion(component),
        });
      } else {
        // user liked his own post!
      }
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
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.update(doc.ref, {
            notificationArray: admin.firestore.FieldValue.arrayUnion(component),
          });
        });
        batch.commit()
          .catch((error) => {
            console.error(error);
            throw new Error("User update failed");
          });
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Error occured while creating notification for new board");
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
        link: `/boards/${boardId}/${postId}`,
        data: data,
      };
      db.runTransaction(async (transaction) => {
        const postRef = db.collection("boards").doc(boardId).collection("posts").doc(postId);
        const postData = (await transaction.get(postRef)).data() as FirestoreComment;
        db.doc(`/users/${postData.authorId}`).update({
          notificationArray: admin.firestore.FieldValue.arrayUnion(component),
        });
      });
    } else {
      const component: FirestoreNotification = {
        type: "new/comment",
        isRead: false,
        source: db
          .collection("boards").doc(boardId)
          .collection("posts").doc(postId)
          .collection("comments").doc(commentId),
        message: "Someone posted a comment on your post!",
        link: `/boards/${boardId}/${postId}`,
        data: data,
      };
      db.runTransaction(async (transaction) => {
        if (data.replyTo) {
          const replyReference = db.doc(data.replyTo.path);
          const replyTargetData = (await transaction.get(replyReference)).data() as FirestoreComment;
          const targetId = replyTargetData.authorId;
          db.doc(`/users/${targetId}`).update({
            notificationArray: admin.firestore.FieldValue.arrayUnion(component),
          });
        }
      });
    }
  });
