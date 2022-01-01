import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDNpBLpxoOABN9RZUCZ1r6tPwkreTKIGEA",
  authDomain: "wavy-cd33d.firebaseapp.com",
  projectId: "wavy-cd33d",
  storageBucket: "wavy-cd33d.appspot.com",
  messagingSenderId: "284240411627",
  appId: "1:284240411627:web:baf81ee6f84a190a3eb7ae",
  measurementId: "G-W8DHJP2MWZ",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, analytics };
