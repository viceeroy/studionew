
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
// To enable Firestore or Storage, uncomment the lines below and ensure you've set them up in your Firebase project.
// import { getFirestore, type Firestore } from 'firebase/firestore';
// import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional: for Firebase Analytics
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn('Firebase config is missing. Authentication and other Firebase services will not work.');
    // Provide a dummy app if config is missing to prevent hard crashes on getAuth, etc.
    // However, Firebase services will not function.
    app = {} as FirebaseApp; 
  } else {
    app = initializeApp(firebaseConfig);
  }
} else {
  app = getApp();
}

let authInstance: Auth;
// let firestoreInstance: Firestore;
// let storageInstance: FirebaseStorage;

try {
  authInstance = getAuth(app);
  // firestoreInstance = getFirestore(app);
  // storageInstance = getStorage(app);
} catch (e) {
  console.error("Error initializing Firebase services. Ensure Firebase config is correct and project is set up:", e);
  // Provide dummy instances if initialization fails after config check
  authInstance = {} as Auth;
  // firestoreInstance = {} as Firestore;
  // storageInstance = {} as FirebaseStorage;
}


export { app, authInstance as auth /*, firestoreInstance as firestore, storageInstance as storage */ };
