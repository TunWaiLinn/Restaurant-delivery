// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBi9BZdlRuQwJK06UA7K0diEXukLTZTUkQ",
  authDomain: "restaurantapp-44e5c.firebaseapp.com",
  databaseURL:
    "https://restaurantapp-44e5c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurantapp-44e5c",
  storageBucket: "restaurantapp-44e5c.appspot.com",
  messagingSenderId: "671941487369",
  appId: "1:671941487369:web:35f16482356a16e8b481d8",
  measurementId: "G-PR1GX6DYD7",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
