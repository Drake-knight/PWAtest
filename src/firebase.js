import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDEpJJhB2E-UCyZDIySAEkFXpO1177-g2s",
    authDomain: "pwareact-9a061.firebaseapp.com",
    projectId: "pwareact-9a061",
    storageBucket: "pwareact-9a061.appspot.com",
    messagingSenderId: "363555629016",
    appId: "1:363555629016:web:afee6ea2b13205bf90f4ad",
};


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        return window.navigator.serviceWorker
            .getRegistration('/firebase-push-notification-scope')
            .then((serviceWorker) => {
                if (serviceWorker) return serviceWorker;
                return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
                    scope: '/firebase-push-notification-scope',
                });
            });
    }
    throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
    getOrRegisterServiceWorker()
        .then((serviceWorkerRegistration) =>
            getToken(messaging, { vapidKey: "BNIHOhW2cU_k1RyuWA2TF-ZC9rpdWvM6OlQq1N10qmFHYhes6OLS62HjFulYh8-gCGcYAakEzREc-Ea8zOHuwSQ", serviceWorkerRegistration }));

export const onForegroundMessage = () =>
    new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
