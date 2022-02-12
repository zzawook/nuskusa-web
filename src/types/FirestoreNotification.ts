import firebase from "firebase";
/**
 * type field is in the format of a/b
 * a can be the following:
 * new
 * update (cannot use update yet. most likely will add new features on this later)
 * 
 * b can be the following:
 * board
 * post
 * comment
 * like
 * reject
 * approve
 * 
 */
export interface FirestoreNotification {
    isRead: Boolean,
    type: string,
    source: any,
    message: string, 
    link: string,
    data: any,
    timestamp: firebase.firestore.Timestamp,
}