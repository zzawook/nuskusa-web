import * as functions from "firebase-functions";
import { Post } from "../../../src/types/Post";
import { Board } from "../../../src/types/Board";
import { Comment } from "../../../src/types/Comment";
import { Notification } from "../../../src/types/Notification";
import { db } from "../index";

import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";


export const createNotificationOnPostLike = functions.firestore
    .document("/boards/{boardId}/posts/{postId}")
    .onUpdate(async (change: any, context: any) => {
        const previous = change.before.data() as Post;
        const after = change.after.data() as Post;
        const boardId = context.params.boardId;
        const postId = context.params.postId;
        if (previous.upvoteArray.length < after.upvoteArray.length) {
            // The below finds the newly added element in after's upvoteArray.
            // This can cause some delay when the upvoteArray is big,
            // because it is an O(n^2) function.
            const userLiked = after.upvoteArray.filter((user) => !previous.upvoteArray.includes(user));
            if (userLiked[0].id !== after.authorId) {
                const component: Notification = {
                    notificationType: "new",
                    contentType: "like",
                    isRead: false,
                    source: db
                        .collection("boards").doc(boardId)
                        .collection("posts").doc(postId),
                    message: "Someone liked your post!",
                    link: `/boards/${boardId}/${postId}`,
                    data: after,
                    timestamp: firestore.Timestamp.now(),
                };
                db.doc(`/users/${after.authorId}`).update({
                    notificationArray: admin.firestore.FieldValue.arrayUnion(component),
                });
            } else {
                // user liked his own post!
            }
        }
    });

export const createNotificationForBoard = functions.firestore
    .document("/boards/{boardId}")
    .onCreate(async (change: any, context: any) => {
        const data = change.data() as Board;
        const boardId = context.params.boardId;
        const title = data.title;
        const description = data.description;
        const component: Notification = {
            notificationType: "new",
            contentType: "board",
            isRead: false,
            source: db
                .collection("boards").doc(boardId),
            message: `A new board has been created! ${title}, ${description}`,
            link: `/boards/${boardId}`,
            data: data,
            timestamp: firestore.Timestamp.now(),
        };
        db.collection("users").get()
            .then((snapshot: any) => {
                const batch = db.batch();
                snapshot.docs.forEach((doc: any) => {
                    batch.update(doc.ref, {
                        notificationArray: admin.firestore.FieldValue.arrayUnion(component),
                    });
                });
                batch.commit()
                    .catch((error: any) => {
                        console.error(error);
                        throw new Error("User update failed");
                    });
            })
            .catch((error: any) => {
                console.error(error);
                throw new Error("Error occured while creating notification for new board");
            });
    });

export const createNotificationOnPostComment = functions.firestore
    .document("/boards/{boardId}/posts/{postId}/comments/{commentId}")
    .onCreate(async (change: any, context: any) => {
        const data = change.data() as Comment;
        const boardId = context.params.boardId;
        const postId = context.params.postId;
        const commentId = context.params.commentId;
        if (!data.isReply) {
            const component: Notification = {
                notificationType: "new",
                contentType: "comment",
                isRead: false,
                source: db
                    .collection("boards").doc(boardId)
                    .collection("posts").doc(postId)
                    .collection("comments").doc(commentId),
                message: "Someone posted a comment on your post!",
                link: `/boards/${boardId}/${postId}`,
                data: data,
                timestamp: firestore.Timestamp.now(),
            };
            db.runTransaction(async (transaction: any) => {
                const postRef = db.collection("boards").doc(boardId).collection("posts").doc(postId);
                const postData = (await transaction.get(postRef)).data() as Comment;
                if (data.authorId !== postData.authorId) {
                    component.message = `${data.author} posted a comment on your post!`;
                    db.doc(`/users/${postData.authorId}`).update({
                        notificationArray: admin.firestore.FieldValue.arrayUnion(component),
                    });
                }
            });
        } else {
            const component: Notification = {
                notificationType: "new",
                contentType: "comment",
                isRead: false,
                source: db
                    .collection("boards").doc(boardId)
                    .collection("posts").doc(postId)
                    .collection("comments").doc(commentId),
                message: "Someone posted a comment on your post!",
                link: `/boards/${boardId}/${postId}`,
                data: data,
                timestamp: firestore.Timestamp.now(),
            };
            await db.runTransaction(async (transaction: any) => {
                if (data.replyTo) {
                    const replyReference = db.doc(data.replyTo.path);
                    const replyTargetData = (await transaction.get(replyReference)).data() as Comment;
                    const targetId = replyTargetData.authorId;
                    if (replyTargetData.authorId !== data.authorId) {
                        db.doc(`/users/${targetId}`).update({
                            notificationArray: admin.firestore.FieldValue.arrayUnion(component),
                        });
                    }
                }
            });
        }
    });
