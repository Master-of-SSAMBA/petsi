import { initializeApp, FirebaseApp } from "firebase/app";
import {
    getMessaging,
    getToken,
    onMessage,
    Messaging,
    MessagePayload,
} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBxh5mpYapNZ63UOkZAgk1m5LO3sdhoQlA",
    authDomain: "petsi-f6ce4.firebaseapp.com",
    projectId: "petsi-f6ce4",
    storageBucket: "petsi-f6ce4.appspot.com",
    messagingSenderId: "302228198395",
    appId: "1:302228198395:web:6a4314051355429624f15e",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);

export const requestForToken = async (): Promise<string | undefined> => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey:
                "BMkqmjgRhHOKewtK3VodKDROTF6eNu_m_xKuL-uORYXf_PnwA1BNYitzYDTcB76l00kB8qR5JQaT-y9tQ3t1iDM",
        });
        if (currentToken) {
            // Perform any other necessary logic here
            return currentToken;
        }
    } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
    }
};

export const onMessageListener = (): Promise<MessagePayload> =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
