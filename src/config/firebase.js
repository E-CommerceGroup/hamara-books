// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnN8asIFwJeCi5MJqe-X5S0vgKIvTEOp8",
  authDomain: "hamara-books.firebaseapp.com",
  projectId: "hamara-books",
  storageBucket: "hamara-books.firebasestorage.app",
  messagingSenderId: "136739400341",
  appId: "1:136739400341:web:29d716d76687f1f6a7899c",
  measurementId: "G-82TLN3JWTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Set auth language to user's preferred language
auth.languageCode = 'en';

export default app;