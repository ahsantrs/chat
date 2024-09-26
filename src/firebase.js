// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCPK87P5eQiTtW-ahWrbvJ-v4CGv8GQGC0",
    authDomain: "chat--fcm.firebaseapp.com",
    projectId: "chat--fcm",
    storageBucket: "chat--fcm.appspot.com",
    messagingSenderId: "357707655777",
    appId: "1:357707655777:web:d1dbe82281aa6deaa99820",
    measurementId: "G-XRWGXVCRV5"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, onMessage, getToken };
