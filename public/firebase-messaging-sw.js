// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCPK87P5eQiTtW-ahWrbvJ-v4CGv8GQGC0",
    authDomain: "chat--fcm.firebaseapp.com",
    projectId: "chat--fcm",
    storageBucket: "chat--fcm.appspot.com",
    messagingSenderId: "357707655777",
    appId: "1:357707655777:web:d1dbe82281aa6deaa99820",
    measurementId: "G-XRWGXVCRV5"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
