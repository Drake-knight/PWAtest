/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDEpJJhB2E-UCyZDIySAEkFXpO1177-g2s",
    authDomain: "pwareact-9a061.firebaseapp.com",
    projectId: "pwareact-9a061",
    storageBucket: "pwareact-9a061.appspot.com",
    messagingSenderId: "363555629016",
    appId: "1:363555629016:web:afee6ea2b13205bf90f4ad",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});
