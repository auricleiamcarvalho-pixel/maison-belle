import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyCFTWHEQQ7NBqTXZgui69rFsQMdKwox9-Q",

    authDomain: "maison-belle-11c9c.firebaseapp.com",

    projectId: "maison-belle-11c9c",

    storageBucket: "maison-belle-11c9c.firebasestorage.app",

    messagingSenderId: "731425646527",

    appId: "1:731425646527:web:2b2a0a3c8e9ffa7795a30a"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };