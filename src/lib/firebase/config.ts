import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// IMPORTANT: Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNceENludogP8jNyslmpsMGgUjSXNhCyM",
  authDomain: "number-guru-backend.firebaseapp.com",
  projectId: "number-guru-backend",
  storageBucket: "number-guru-backend.firebasestorage.app",
  messagingSenderId: "637453549935",
  appId: "1:637453549935:web:0b3f7122ef75f93f68a89a",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);

export { app, auth };
