
// firebase-push.js
// basic Firebase push notification setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function initPush(){

    try{

        const token = await getToken(messaging, {
            vapidKey: "YOUR_VAPID_KEY"
        });

        console.log("Push token:", token);

    }catch(e){
        console.log("Push error", e);
    }

    onMessage(messaging,(payload)=>{
        alert("Bildiriş: " + payload.notification.title);
    });

}
