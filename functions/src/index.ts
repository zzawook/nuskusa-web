import * as admin from "firebase-admin";

import {createNotificationForBoard, createNotificationOnPostComment, createNotificationOnPostLike} from "./notification/createNotification";

admin.initializeApp();
export const db = admin.firestore();

exports.createNotificationOnPostLike = createNotificationOnPostLike;

exports.createNotificationForBoard = createNotificationForBoard;

exports.createNotificationOnPostComment = createNotificationOnPostComment;
