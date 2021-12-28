import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
// The Firebase Admin SDK to access Firestore.
admin.initializeApp();

const db = admin.firestore();

export {
    db
}