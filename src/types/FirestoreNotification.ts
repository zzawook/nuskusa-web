import firebase from 'firebase'

export interface FirestoreNotification {
    isRead: Boolean,
    source: firebase.firestore.DocumentReference,
    message: string, 
    link: string,
    data: FirestoreNotificationData,
}

interface FirestoreNotificationData {
    title: string,
    content: string,
    images: string, // empty string for comments
}