// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBxh5mpYapNZ63UOkZAgk1m5LO3sdhoQlA",
  authDomain: "petsi-f6ce4.firebaseapp.com",
  projectId: "petsi-f6ce4",
  storageBucket: "petsi-f6ce4.appspot.com",
  messagingSenderId: "302228198395",
  appId: "1:302228198395:web:6a4314051355429624f15e"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log("[firebase-messaging-sw.js] Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/pwa-512x512.png",
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
