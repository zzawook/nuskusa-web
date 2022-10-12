import firebase from "firebase";

/**
 * notificationType is string: new, update.
 * contentType is string: like, post, comment, reject, approve, and perhaps more to be added.
 * notificationType determines whether the notification is about something new or something updated.
 * contentType determines what the notification is about, could be new posts, new likes, post updates, etc.
 */
export interface Notification {
    type: string,
    from: any,
    to: any,
    post: any,
    id: number
}