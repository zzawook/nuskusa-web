import * as admin from "firebase-admin";

const { createNotificationForBoard, createNotificationOnPostComment, createNotificationOnPostLike } = require("./notification/createNotification");

admin.initializeApp();

exports.createNotificationOnPostLike = createNotificationOnPostLike;

exports.createNotificationForBoard = createNotificationForBoard;

exports.createNotificationOnPostComment = createNotificationOnPostComment;