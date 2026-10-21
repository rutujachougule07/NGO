// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_rhwHfAXRZq95Ls1yF56_5WpAVjliSOo",
  authDomain: "ngo-1-adb62.firebaseapp.com",
  projectId: "ngo-1-adb62",
  storageBucket: "ngo-1-adb62.firebasestorage.app",
  messagingSenderId: "967390813174",
  appId: "1:967390813174:web:b029e0a20b879e9c2685d7",
  measurementId: "G-4CK50L5ZT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
export default app;
