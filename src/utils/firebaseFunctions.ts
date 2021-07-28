import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    
})

const authService = firebase.auth();
const dbService = firebase.firestore();