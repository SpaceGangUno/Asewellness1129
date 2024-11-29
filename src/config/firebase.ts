import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if config is valid
const isConfigValid = Object.values(firebaseConfig).every(value => value !== undefined && value !== '');

let app;
let auth;
let db;
let analytics = null;
let googleProvider;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();

    // Initialize Analytics only if supported
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(error => {
      console.warn('Firebase Analytics not supported:', error);
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('Firebase configuration is incomplete. Please check your environment variables.');
}

export { auth, db, googleProvider, analytics };